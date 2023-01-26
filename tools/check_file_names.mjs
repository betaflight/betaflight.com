import fs from 'fs';
import chalk from 'chalk';
import { exit } from 'process';

const log = console.log;

/**
 * 
 * @param {string} fileName 
 */
function checkFileName(fileName) {
  // Regular expression to match whitespaces and special characters
  let pattern = /[\s~`!@#$%^&*()+=[\]\\';,/{}|\\":<>?]/;

  // Check if the file name matches the pattern
  if (pattern.test(fileName)) {
    return true;
  } else {
    return false;
  }
}

let error = false;

/**
 * 
 * @param {string} dir 
 * @param {number} depth
 */
function processDir(dir, depth = 1) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach((file) => {
    if (file.isDirectory()) {
      log(chalk.white.bgBlackBright(`${'\t'.repeat(depth)}${dir}/${file.name}:`));
      return processDir(`${dir}/${file.name}`, depth + 1);
    }

    if (checkFileName(file.name)) {
      log(`${chalk.red(`${'\t'.repeat(depth)}${file.name}`)}: contains invalid characters`);
      error = true;
    }
  });
}

function runFull() {
  const rootDir = fs.readdirSync('./docs', { withFileTypes: true });

  rootDir.forEach(file => {
    log(chalk.white.bgBlackBright(`./docs:`));
    processDir(`./docs/${  file.name}`);
  });

  if (error) {
    throw new Error('Invalid file name(s) found.');
  }
}

/**
 * 
 * @param {string} fileName 
 */
function runSingle(fileName) {
  if (checkFileName(fileName)) {
    log(`${chalk.red(`${fileName}`)}: contains invalid characters`);
  }
}

function run() {

  const hasArgs = process.argv.length > 2;

  if (!hasArgs) {
    return runFull();
  }
  const [,, ...args] = process.argv;
  args.forEach(arg => {
    runSingle(arg);
  });
}

run();