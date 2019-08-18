#!/usr/bin/env node

const nanogen = require('nanogen');
const config = require('./site.config');

const srcPath = './src';
const pagesPath = `${srcPath}/pages`;

const util = require(`${srcPath}/js/util`);
const gh = require(`${srcPath}/js/github`);

const prepare = async () => {
    config.build.srcPath = srcPath;

    config.site.members = await gh.getMembers('betaflight');

    const pageData = util.getPageData(pagesPath, 'article').sort((a, b) => a.date > b.date ? -1 : 1);
    config.site.news = pageData;
};

prepare().then(() => {
    nanogen.build(config);
});
