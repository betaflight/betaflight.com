const chalk = require('chalk');

module.exports = {
  info(message) {
    console.log(chalk`{gray [build]} ${message}`);
  },

  success(message) {
    console.log(chalk`{gray [build]} {green ${message}}`);
  },

  warn(message) {
    console.log(chalk`{gray [build]} {yellow ${message}}`);
  },

  error(message) {
    console.log(chalk`{gray [build]} {red ${message}}`);
  }
};
