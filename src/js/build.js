#!/usr/bin/env node

const nanogen = require('nanogen');
const path = require('path');
const pageUtil = require('./pagedata');
const github = require('./github');
const config = require('./site.config');
const logger = require('./logger');

const srcPath = path.resolve('./src');
const pagesPath = `${srcPath}/pages`;

const prepare = async () => {
    logger.success(`Using path: ${srcPath}`);
    config.build.srcPath = srcPath;

    logger.info('*** Getting member data ***');
    config.site.members = await github.getMembers('betaflight');
    logger.info('----');

    logger.info('*** Getting page data ***');
    config.site.news = pageUtil.getPageData(pagesPath, 'article').sort((a, b) => a.date > b.date ? -1 : 1);;
    logger.info('----');
};

prepare().then(() => {
    nanogen.build(config);
});
