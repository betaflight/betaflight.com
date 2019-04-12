const pilots = require('./data/pilots')
const members = require('./data/members')
const moment = require('moment')
const glob = require('glob');
const fse = require('fs-extra');
const frontMatter = require('front-matter');

module.exports = {
  build: {
    srcPath: './src',
    outputPath: './public'
  },
  site: {
    srcPath: './src',
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
    frontMatter
  }
}

