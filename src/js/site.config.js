const moment = require('moment')

module.exports = {
  build: {
    srcPath: '',
    outputPath: './public'
  },
  site: {
    baseUrl: "https://betaflight.com",
    title: 'betaflight.com',
    description: 'Home of the famous betaflight flight controller firmware, and associated tools.',
    staticContent: [
      "content/images",
      "js",
      "css",
      "img"
    ],
    pilots: [],
    members: [],
    moment,
    news: []
  }
}
