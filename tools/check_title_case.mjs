import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { titleCase } from 'title-case';

const log = console.log;

function checkTitleCase(filePath) {
  // Read the contents of the file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // Split the file content into an array of lines
  const lines = fileContent.split('\n');

  const errorLines = [];

  // Iterate over each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('#')) {
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
  let error = false;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);
    if (fileStat.isDirectory()) {
      // Recursively read the subdirectory
      error &= readDir(filePath);
    } else if (fileStat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
      // Check the file for title case
      error &= checkTitleCase(filePath);
    }
  }
  return error;
}

function runFull() {
  // Example usage
  const directoryPath = './docs';
  return readDir(directoryPath);
}

function run() {

  const hasArgs = process.argv.length > 2;

  if (!hasArgs) {
    return runFull() ? 0 : 1;
  }
  const [,, ...args] = process.argv;
  
  return args.map(arg => {
    return checkTitleCase(arg);
  }).includes(false) ? 1 : 0;
}

const exitCode = run();

process.exit(exitCode);