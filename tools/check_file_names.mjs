import fs from 'fs';
import chalk from 'chalk';

const skipDirs = [
  'docs/development',
  'docs/wiki',
];

const log = console.log;

/**
 * 
 * @param {string} fileName 
 */
function checkFileName(fileName) {
  // Regular expression to match whitespaces and special characters
  let pattern = /[\s~`!@#$%^&*()+=[\]\\';,/{}|\\":<>?]/;

  // Check if the file name matches the pattern
  return pattern.test(fileName);
}

/**
 * 
 * @param {string} dir 
 * @param {number} depth
 */
function processDir(dir, depth = 1) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let hasError = false;
  files.forEach((file) => {
    if (file.isDirectory()) {
      if (skipDirs.some(skipDir => `${dir}/${file.name}`.includes(skipDir))) {
        return false;
      }
      return processDir(`${dir}/${file.name}`, depth + 1);
    }

    if (checkFileName(file.name)) {
      log(`${chalk.red(`${dir}/${file.name}`)}: contains invalid characters`);
      hasError = true;
    }
  });
  return hasError;
}

function runFull() {
  const rootDir = fs.readdirSync('./docs', { withFileTypes: true });

  return rootDir.map(file => {
    return processDir(`./docs/${file.name}`);
  });
}

/**
 * 
 * @param {string} fileName 
 */
function runSingle(fileName) {
  if (checkFileName(fileName) && !skipDirs.some(skipDir => fileName.includes(skipDir))) {
    log(`${chalk.red(`${fileName}`)}: contains invalid characters`);
    return true;
  }
  return false;
}

function run() {

  const hasArgs = process.argv.length > 2;

  if (!hasArgs) {
    return runFull().includes(true) ? 1 : 0;
  }
  const [,, ...args] = process.argv;
  return args.map(arg => runSingle(arg)).includes(true) ? 1 : 0;
}

const exitCode = run();

// Exit with a non-zero code if there are errors
if (exitCode !== 0) {
  process.exit(exitCode);
}
