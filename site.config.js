const pilots = require('./data/pilots')
const members = require('./data/members')
const moment = require('moment')
const srcPath = './src';
const util = require(`${srcPath}/js/util`)

const pagesPath = `${srcPath}/pages`;

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
    news: util.getPageData(pagesPath, 'article').sort(function(a, b) { return a.date > b.date ? -1 : 1; })
  }
}
