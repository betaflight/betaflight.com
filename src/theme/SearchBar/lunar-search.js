import lunr from '@generated/lunr.client';
lunr.tokenizer.separator = /[\s\-/]+/;

class LunrSearchAdapter {
  constructor(searchDocs, searchIndex, baseUrl = '/') {
    this.searchDocs = searchDocs;
    this.lunrIndex = lunr.Index.load(searchIndex);
    LunrSearchAdapter.patchPhantomTerms(this.lunrIndex);
    this.baseUrl = baseUrl;
  }

  // lunr 2.3.9 rebuilds the index's token set on load, and its minimisation
  // can produce terms that are not in the inverted index (e.g. "tim9_ch1154").
  // A wildcard query that expands to one of these throws while reading
  // `posting._index`, which breaks any search containing a one-letter word.
  // Give each phantom term an empty posting so it simply matches nothing.
  static patchPhantomTerms(index) {
    const { invertedIndex, fields, tokenSet } = index;
    let nextTermIndex = Object.keys(invertedIndex).length;
    for (const term of tokenSet.toArray()) {
      if (!Object.hasOwn(invertedIndex, term)) {
        const posting = { _index: nextTermIndex++ };
        for (const field of fields) {
          posting[field] = {};
        }
        invertedIndex[term] = posting;
      }
    }
  }

  getLunrResult(input) {
    const { pipeline } = this.lunrIndex;
    return this.lunrIndex.query((query) => {
      for (const token of lunr.tokenizer(input)) {
        const word = token.toString();
        // Exact (stemmed) matches rank highest.
        query.term(word, { boost: 10 });
        // Every word must match as a prefix somewhere in the section, so
        // "osd s" means "osd AND s*" rather than "osd OR s*". The index holds
        // stemmed terms, so stem first ("rescue" -> "rescu") and skip the
        // pipeline. Stop words are not indexed, so they cannot be required.
        const isStopWord = lunr.stopWordFilter(word) === undefined;
        query.term(pipeline.runString(word)[0] || word, {
          usePipeline: false,
          wildcard: lunr.Query.wildcard.TRAILING,
          presence: isStopWord ? lunr.Query.presence.OPTIONAL : lunr.Query.presence.REQUIRED,
        });
      }
    });
  }

  getHit(doc, formattedTitle, formattedContent) {
    return {
      hierarchy: {
        lvl0: doc.pageTitle || doc.title,
        lvl1: doc.type === 0 ? null : doc.title,
      },
      url: doc.url,
      _snippetResult: formattedContent
        ? {
            content: {
              value: formattedContent,
              matchLevel: 'full',
            },
          }
        : null,
      _highlightResult: {
        hierarchy: {
          lvl0: {
            value: doc.type === 0 ? formattedTitle || doc.title : doc.pageTitle,
          },
          lvl1:
            doc.type === 0
              ? null
              : {
                  value: formattedTitle || doc.title,
                },
        },
      },
    };
  }
  getTitleHit(doc, position) {
    const [start, length] = position;
    const end = start + length;
    let formattedTitle = `${doc.title.substring(0, start)}<span class="algolia-docsearch-suggestion--highlight">${doc.title.substring(start, end)}</span>${doc.title.substring(end, doc.title.length)}`;
    return this.getHit(doc, formattedTitle);
  }

  getKeywordHit(doc, position) {
    const [start, length] = position;
    const end = start + length;
    let formattedTitle = `${doc.title}<br /><i>Keywords: ${doc.keywords.substring(0, start)}<span class="algolia-docsearch-suggestion--highlight">${doc.keywords.substring(
      start,
      end,
    )}</span>${doc.keywords.substring(end, doc.keywords.length)}</i>`;
    return this.getHit(doc, formattedTitle);
  }

  getContentHit(doc, position) {
    const start = position[0];
    const end = position[0] + position[1];
    let previewStart = start;
    let previewEnd = end;
    let ellipsesBefore = true;
    let ellipsesAfter = true;
    for (let k = 0; k < 3; k++) {
      const nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
      const nextDot = doc.content.lastIndexOf('.', previewStart - 2);
      if (nextDot > 0 && nextDot > nextSpace) {
        previewStart = nextDot + 1;
        ellipsesBefore = false;
        break;
      }
      if (nextSpace < 0) {
        previewStart = 0;
        ellipsesBefore = false;
        break;
      }
      previewStart = nextSpace + 1;
    }
    for (let k = 0; k < 10; k++) {
      const nextSpace = doc.content.indexOf(' ', previewEnd + 1);
      const nextDot = doc.content.indexOf('.', previewEnd + 1);
      if (nextDot > 0 && nextDot < nextSpace) {
        previewEnd = nextDot;
        ellipsesAfter = false;
        break;
      }
      if (nextSpace < 0) {
        previewEnd = doc.content.length;
        ellipsesAfter = false;
        break;
      }
      previewEnd = nextSpace;
    }
    let preview = doc.content.substring(previewStart, start);
    if (ellipsesBefore) {
      preview = `... ${preview}`;
    }
    preview += `<span class="algolia-docsearch-suggestion--highlight">${doc.content.substring(start, end)}</span>`;
    preview += doc.content.substring(end, previewEnd);
    if (ellipsesAfter) {
      preview += ' ...';
    }
    return this.getHit(doc, null, preview);
  }
  search(input, offset = 0, limit = 5) {
    return new Promise((resolve) => {
      const results = this.getLunrResult(input);
      const hits = [];
      this.totalResults = results.length;
      // One hit per matched section. A wildcard query (e.g. "osd*") can match
      // dozens of distinct terms in a single section; emitting a hit per term
      // would let one section fill every result slot.
      for (const result of results.slice(offset, offset + limit)) {
        const doc = this.searchDocs[result.ref];
        const fields = Object.values(result.matchData.metadata);
        const titleMatch = fields.find((field) => field.title);
        const keywordMatch = fields.find((field) => field.keywords);
        const contentMatch = fields.find((field) => field.content);
        if (titleMatch) {
          hits.push(this.getTitleHit(doc, titleMatch.title.position[0]));
        } else if (keywordMatch) {
          hits.push(this.getKeywordHit(doc, keywordMatch.keywords.position[0]));
        } else if (contentMatch) {
          hits.push(this.getContentHit(doc, contentMatch.content.position[0]));
        }
      }
      resolve(hits);
    });
  }
}

export default LunrSearchAdapter;
