import Hogan from 'hogan.js';
import LunrSearchAdapter from './lunar-search';
import autocomplete from 'autocomplete.js';
import templates from './templates';
import utils from './utils';
import $ from 'autocomplete.js/zepto';

const RESULTS_PAGE_SIZE = 5;

class DocSearch {
  constructor({
    searchDocs,
    searchIndex,
    inputSelector,
    debug = false,
    baseUrl = '/',
    queryDataCallback = null,
    autocompleteOptions = {
      debug: false,
      hint: false,
      autoselect: true,
    },
    transformData = false,
    queryHook = false,
    handleSelected = false,
    enhancedSearchInput = false,
    layout = 'column',
  }) {
    this.input = DocSearch.getInputFromSelector(inputSelector);
    this.queryDataCallback = queryDataCallback || null;
    const autocompleteOptionsDebug = autocompleteOptions && autocompleteOptions.debug ? autocompleteOptions.debug : false;
    // eslint-disable-next-line no-param-reassign
    autocompleteOptions.debug = debug || autocompleteOptionsDebug;
    this.autocompleteOptions = autocompleteOptions;
    this.autocompleteOptions.cssClasses = this.autocompleteOptions.cssClasses || {};
    this.autocompleteOptions.cssClasses.prefix = this.autocompleteOptions.cssClasses.prefix || 'ds';
    const inputAriaLabel = this.input && typeof this.input.attr === 'function' && this.input.attr('aria-label');
    this.autocompleteOptions.ariaLabel = this.autocompleteOptions.ariaLabel || inputAriaLabel || 'search input';

    this.isSimpleLayout = layout === 'simple';

    this.client = new LunrSearchAdapter(searchDocs, searchIndex, baseUrl);
    this.page = 0;
    this.lastQuery = null;

    if (enhancedSearchInput) {
      this.input = DocSearch.injectSearchBox(this.input);
    }
    this.autocomplete = autocomplete(this.input, autocompleteOptions, [
      {
        source: this.getAutocompleteSource(transformData, queryHook),
        // Results depend on the page as well as the query, so the
        // per-query suggestion cache would serve the wrong page.
        cache: false,
        templates: {
          suggestion: DocSearch.getSuggestionTemplate(this.isSimpleLayout),
          footer: ({ isEmpty }) => (isEmpty ? templates.footer : templates.pagination(this.page, this.getPageCount())),
          empty: DocSearch.getEmptyTemplate(),
        },
      },
    ]);

    const customHandleSelected = handleSelected;
    this.handleSelected = customHandleSelected || this.handleSelected;

    // We prevent default link clicking if a custom handleSelected is defined
    if (customHandleSelected) {
      $('.algolia-autocomplete').on('click', '.ds-suggestions a', (event) => {
        event.preventDefault();
      });
    }

    // The dropdown cancels mousedown, so the input keeps focus and the
    // dropdown stays open while another page is loaded.
    $('.algolia-autocomplete').on('click', '.algolia-docsearch-pagination button', (event) => {
      event.preventDefault();
      this.goToPage(Number(event.currentTarget.dataset.page));
    });

    // Keyboard path to the pager: arrow keys only move between suggestions
    // and Tab closes the dropdown, so Page Up / Page Down change pages while
    // the input keeps focus. With Shift they jump to the first / last page.
    this.input.on('keydown', (event) => {
      if (event.key !== 'PageUp' && event.key !== 'PageDown') {
        return;
      }
      // Only page while the pager is showing (dropdown open, multiple pages).
      // Escape hides the dropdown but leaves its footer in the DOM, so ask
      // this instance's dropdown rather than querying for the pager markup.
      const typeahead = this.autocomplete.data('aaAutocomplete');
      if (!typeahead?.dropdown.isVisible() || this.getPageCount() <= 1) {
        return;
      }
      event.preventDefault();
      const lastPage = this.getPageCount() - 1;
      let target;
      if (event.shiftKey) {
        target = event.key === 'PageUp' ? 0 : lastPage;
      } else {
        target = event.key === 'PageUp' ? this.page - 1 : this.page + 1;
      }
      if (target >= 0 && target <= lastPage && target !== this.page) {
        this.goToPage(target);
      }
    });

    this.autocomplete.on('autocomplete:selected', this.handleSelected.bind(null, this.autocomplete.autocomplete));

    this.autocomplete.on('autocomplete:shown', this.handleShown.bind(null, this.input));

    if (enhancedSearchInput) {
      DocSearch.bindSearchBoxEvent();
    }

    // Ctrl/Cmd + K should focus the search bar, emulating the Algolia search UI
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        this.input.focus();

        // By default, using Ctrl + K in Chrome will open the location bar, so disable this
        e.preventDefault();
      }
    });
  }

  static injectSearchBox(input) {
    input.before(templates.searchBox);
    const newInput = input.prev().prev().find('input');
    input.remove();
    return newInput;
  }

  static bindSearchBoxEvent() {
    $('.searchbox [type="reset"]').on('click', function () {
      $('input#docsearch').focus();
      $(this).addClass('hide');
      autocomplete.autocomplete.setVal('');
    });

    $('input#docsearch').on('keyup', () => {
      const searchbox = document.querySelector('input#docsearch');
      const reset = document.querySelector('.searchbox [type="reset"]');
      reset.className = 'searchbox__reset';
      if (searchbox.value.length === 0) {
        reset.className += ' hide';
      }
    });
  }

  /**
   * Returns the matching input from a CSS selector, null if none matches
   * @function getInputFromSelector
   * @param  {string} selector CSS selector that matches the search
   * input of the page
   * @returns {void}
   */
  static getInputFromSelector(selector) {
    const input = $(selector).filter('input');
    return input.length ? $(input[0]) : null;
  }

  /**
   * Returns the `source` method to be passed to autocomplete.js. It will query
   * the Algolia index and call the callbacks with the formatted hits.
   * @function getAutocompleteSource
   * @param  {function} transformData An optional function to transform the hits
   * @param {function} queryHook An optional function to transform the query
   * @returns {function} Method to be passed as the `source` option of
   * autocomplete
   */
  getAutocompleteSource(transformData, queryHook) {
    return (query, callback) => {
      if (queryHook) {
        // eslint-disable-next-line no-param-reassign
        query = queryHook(query) || query;
      }
      if (query !== this.lastQuery) {
        this.lastQuery = query;
        this.page = 0;
      }
      this.client.search(query, this.page * RESULTS_PAGE_SIZE, RESULTS_PAGE_SIZE).then((hits) => {
        if (this.queryDataCallback && typeof this.queryDataCallback === 'function') {
          this.queryDataCallback(hits);
        }
        if (transformData) {
          hits = transformData(hits) || hits;
        }
        callback(DocSearch.formatHits(hits));
      });
    };
  }

  // Given a list of hits returned by the API, will reformat them to be used in
  // a Hogan template
  getPageCount() {
    return Math.ceil((this.client.totalResults || 0) / RESULTS_PAGE_SIZE);
  }

  goToPage(page) {
    if (!Number.isInteger(page) || page < 0) {
      return;
    }
    this.page = page;
    // autocomplete.js has no public "refresh" API; re-run the current query
    // through the typeahead's dropdown directly.
    const typeahead = this.input.data('aaAutocomplete');
    typeahead.dropdown.update(typeahead.getVal());
  }

  static formatHits(receivedHits) {
    const clonedHits = utils.deepClone(receivedHits);
    const hits = clonedHits.map((hit) => {
      if (hit._highlightResult) {
        // eslint-disable-next-line no-param-reassign
        hit._highlightResult = utils.mergeKeyWithParent(hit._highlightResult, 'hierarchy');
      }
      return utils.mergeKeyWithParent(hit, 'hierarchy');
    });

    // Group hits by category / subcategory
    let groupedHits = utils.groupBy(hits, 'lvl0');
    $.each(groupedHits, (level, collection) => {
      const groupedHitsByLvl1 = utils.groupBy(collection, 'lvl1');
      const flattenedHits = utils.flattenAndFlagFirst(groupedHitsByLvl1, 'isSubCategoryHeader');
      groupedHits[level] = flattenedHits;
    });
    groupedHits = utils.flattenAndFlagFirst(groupedHits, 'isCategoryHeader');

    // Translate hits into smaller objects to be send to the template
    return groupedHits.map((hit) => {
      const url = DocSearch.formatURL(hit);
      const category = utils.getHighlightedValue(hit, 'lvl0');
      const subcategory = utils.getHighlightedValue(hit, 'lvl1') || category;
      const displayTitle = utils
        .compact([
          utils.getHighlightedValue(hit, 'lvl2') || subcategory,
          utils.getHighlightedValue(hit, 'lvl3'),
          utils.getHighlightedValue(hit, 'lvl4'),
          utils.getHighlightedValue(hit, 'lvl5'),
          utils.getHighlightedValue(hit, 'lvl6'),
        ])
        .join('<span class="aa-suggestion-title-separator" aria-hidden="true"> › </span>');
      const text = utils.getSnippetedValue(hit, 'content');
      const isTextOrSubcategoryNonEmpty = (subcategory && subcategory !== '') || (displayTitle && displayTitle !== '');
      const isLvl1EmptyOrDuplicate = !subcategory || subcategory === '' || subcategory === category;
      const isLvl2 = displayTitle && displayTitle !== '' && displayTitle !== subcategory;
      const isLvl1 = !isLvl2 && subcategory && subcategory !== '' && subcategory !== category;
      const isLvl0 = !isLvl1 && !isLvl2;
      const version = hit.version;

      return {
        isLvl0,
        isLvl1,
        isLvl2,
        isLvl1EmptyOrDuplicate,
        isCategoryHeader: hit.isCategoryHeader,
        isSubCategoryHeader: hit.isSubCategoryHeader,
        isTextOrSubcategoryNonEmpty,
        category,
        subcategory,
        title: displayTitle,
        text,
        url,
        version,
      };
    });
  }

  static formatURL(hit) {
    const { url, anchor } = hit;
    if (url) {
      const containsAnchor = url.indexOf('#') !== -1;
      if (containsAnchor) return url;
      else if (anchor) return `${hit.url}#${hit.anchor}`;
      return url;
    } else if (anchor) return `#${hit.anchor}`;
    /* eslint-disable */
    console.warn('no anchor nor url for : ', JSON.stringify(hit));
    /* eslint-enable */
    return null;
  }

  static getEmptyTemplate() {
    return (args) => Hogan.compile(templates.empty).render(args);
  }

  static getSuggestionTemplate(isSimpleLayout) {
    const stringTemplate = isSimpleLayout ? templates.suggestionSimple : templates.suggestion;
    const template = Hogan.compile(stringTemplate);
    return (suggestion) => template.render(suggestion);
  }

  handleSelected(input, _event, suggestion, _datasetNumber, context = {}) {
    // Do nothing if click on the suggestion, as it's already a <a href>, the
    // browser will take care of it. This allow Ctrl-Clicking on results and not
    // having the main window being redirected as well
    if (context.selectionMethod === 'click') {
      return;
    }

    input.setVal('');
    window.location.assign(suggestion.url);
  }

  handleShown(input) {
    const middleOfInput = input.offset().left + input.width() / 2;
    let middleOfWindow = $(document).width() / 2;

    if (isNaN(middleOfWindow)) {
      middleOfWindow = 900;
    }

    const alignClass = middleOfInput - middleOfWindow >= 0 ? 'algolia-autocomplete-right' : 'algolia-autocomplete-left';
    const otherAlignClass = middleOfInput - middleOfWindow < 0 ? 'algolia-autocomplete-right' : 'algolia-autocomplete-left';
    const autocompleteWrapper = $('.algolia-autocomplete');
    if (!autocompleteWrapper.hasClass(alignClass)) {
      autocompleteWrapper.addClass(alignClass);
    }

    if (autocompleteWrapper.hasClass(otherAlignClass)) {
      autocompleteWrapper.removeClass(otherAlignClass);
    }
  }
}

export default DocSearch;
