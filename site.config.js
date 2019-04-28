const pilots = require('./data/pilots')
const members = require('./data/members')
const moment = require('moment')
const glob = require('glob');
const fse = require('fs-extra');
const frontMatter = require('front-matter');

const srcPath = './src';

const files = glob.sync('news/*.@(md|ejs|html)', { cwd: `${srcPath}/pages` });

var news = [];

files.forEach(function(file) {

	const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8');

	const pageData = frontMatter(data);
	const page = pageData.attributes;

	if (page.layout != "article") {
		return;
	}

	news.push(page);
});

news.sort(function(a, b) {
    return a.date > b.date ? -1 : 1;
});

module.exports = {
  build: {
    srcPath,
    outputPath: './public'
  },
  site: {
    srcPath,
    baseUrl: "https://betaflight.com",
    title: 'betaflight.com',
    description: 'Home of the famous betaflight flight controller firmware, and associated tools.',
    staticContent: [
      "content/images",
      "js",
      "css",
      "img"
    ],
    pilots,
    members,
    moment,
    glob,
    fse,
    frontMatter,
    news
  }
}

