#!/usr/bin/env node

const logger = require('./logger');
const nanogen = require('nanogen');
const config = require('./site.config');
const path = require('path');

const srcPath = path.resolve('./src');
const pagesPath = `${srcPath}/pages`;

const pageUtil = require(`${srcPath}/js/pagedata`);
const gh = require(`${srcPath}/js/github`);

const prepare = async () => {
    logger.success(`Using path: ${srcPath}`);
    config.build.srcPath = srcPath;

    logger.info('*** Getting member data ***');
    config.site.members = await gh.getMembers('betaflight');
    logger.info('----');

    logger.info('*** Getting page data ***');
    config.site.news = pageUtil.getPageData(pagesPath, 'article').sort((a, b) => a.date > b.date ? -1 : 1);;
    logger.info('----');
};

prepare().then(() => {
    nanogen.build(config);
});
