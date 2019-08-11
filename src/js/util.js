const glob = require('glob');
const fse = require('fs-extra');
const frontMatter = require('front-matter');
const path = require('path');

const getLink = (file) => {
    fileData = path.parse(file);
    return `${fileData.dir}/${fileData.name}/`;
  }

const getPageData = (srcDirectory, layout) => {

    var pages = [];
  
    const files = glob.sync('**/*.@(md|ejs|html)', { cwd: `${srcDirectory}` });

    files.forEach((file) => {
  
      const data = fse.readFileSync(`${srcDirectory}/${file}`, 'utf-8');
    
      const pageData = frontMatter(data);
      const page = pageData.attributes;
      
      if (page.layout !== layout) {
        return;
      }
  
      if (!page.link) {
        page.link = getLink(file);
      }
  
      pages.push(page);
    });
    
    return pages;
  }

  module.exports = {
    getPageData,
    frontMatter,
    fse,
    glob
  }
