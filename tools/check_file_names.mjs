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

/**
 * 
 * @param {string} dir 
 * @param {number} depth
 */
function processDir(dir, depth = 1) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let error = false;
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
  return error;
}

function runFull() {
  const rootDir = fs.readdirSync('./docs', { withFileTypes: true });

  return rootDir.map(file => {
    log(chalk.white.bgBlackBright(`./docs:`));
    return processDir(`./docs/${  file.name}`);
  });
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
    return runFull().includes(false) ? 1 : 0;
  }
  const [,, ...args] = process.argv;
  return args.map(arg => runSingle(arg)).includes(false) ? 1 : 0;
}

const exitCode = run();

process.exit(exitCode);