import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { titleCase } from 'title-case';

const skipDirs = [
  'docs/development',
  'docs/wiki',
];

const log = console.log;

function checkTitleCase(filePath) {
  if (skipDirs.some(skipDir => filePath.includes(skipDir))) {
    return true;
  }
  // Read the contents of the file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // Split the file content into an array of lines
  const lines = fileContent.split('\n');

  const errorLines = [];

  // Iterate over each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!/^#+\s/.test(line)) {
      continue;
    }

    // Check if the line is in title-case
    if (line !== titleCase(line)) {
      errorLines.push([i+1, line]);
    }
  }

  if (errorLines.length > 0) {
    log(chalk.white.bgBlackBright(`${filePath}:`));
    errorLines.forEach(([lineNumber, line]) => {
      log(chalk.red(`\t${lineNumber}: ${line}`));
      log(chalk.green(`\t${lineNumber}: ${titleCase(line)}`));
    });
  }

  return errorLines.length === 0;
}

function readDir(dir) {
  const files = fs.readdirSync(dir);
  let hasError = false;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);
    if (fileStat.isDirectory() && !skipDirs.some(skipDir => filePath.includes(skipDir))) {
      // Recursively read the subdirectory
      hasError &= readDir(filePath);
    } else if (fileStat.isFile() && file.endsWith('.mdx')) {
      // Check the file for title case
      hasError &= checkTitleCase(filePath);
    }
  }
  return hasError;
}

function runFull() {
  // Example usage
  const directoryPath = './docs';
  return readDir(directoryPath);
}

function run() {

  const hasArgs = process.argv.length > 2;

  if (!hasArgs) {
    return runFull() ? 1 : 0;
  }
  const [,, ...args] = process.argv;

  return args.map(arg => {
    return checkTitleCase(arg);
  }).includes(true) ? 1 : 0;
}

const exitCode = run();

process.exit(exitCode);
