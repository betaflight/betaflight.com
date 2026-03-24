import fs from 'fs';
import path from 'path';
import { titleCase } from 'title-case';
import chalk from 'chalk';

function reportHeaderError(headerText, filePath, lineNumber, hasError) {
  if (titleCase(headerText) === headerText) {
    return hasError;
  }
  if (!hasError) {
    console.log("This commit would fail because some headings were not properly capitalized following the title case format. Use the proposed changes or make your own, and then try again. Or, commit with the --no-verify flag to bypass this check entirely:\n");
  }
  console.log(
    `${chalk.red(headerText)
    } -> ${
      chalk.green(titleCase(headerText))
    }\n${
      chalk.white(`${filePath}:${lineNumber}`)}\n`,
  );
  return true;
}

function checkTitleCase(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let hasError = false;
  let inCodeBlock = false;
  let fenceChar = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Track fenced code blocks (``` or ~~~) to skip their contents.
    // Only match at the start of the line; track the opening delimiter so that
    // a ~~~ fence cannot accidentally close a ``` block (and vice-versa).
    const fenceMatch = line.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      const delimiter = fenceMatch[1][0];
      if (!inCodeBlock) {
        inCodeBlock = true;
        fenceChar = delimiter;
      } else if (delimiter === fenceChar) {
        inCodeBlock = false;
        fenceChar = '';
      }
      continue;
    }

    if (inCodeBlock) { continue; }

    // Check if the line is a first level header (starts with '#' followed by a space)
    if (line.match(/^#\s/)) {
      hasError = reportHeaderError(line.replace(/^#\s/, ''), filePath, i + 1, hasError);
    }
  }

  if (hasError) {
    process.exit(1);
  }
}

function processFiles(filePath) {
  if (fs.statSync(filePath).isDirectory()) {
    const files = fs.readdirSync(filePath);

    files.forEach(file => {
      const nestedFilePath = path.join(filePath, file);
      processFiles(nestedFilePath);
    });
  } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
    checkTitleCase(filePath);
  }
}

// Process files passed as arguments
process.argv.slice(2).forEach(processFiles);

const directoryPath = 'docs/';
processFiles(directoryPath);
