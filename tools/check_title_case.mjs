import fs from 'fs';
import path from 'path';
import { titleCase } from 'title-case';
import chalk from 'chalk';

function checkTitleCase(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let hasError = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if the line is a header (starts with '#' followed by a space)
    if (line.match(/^#+\s/)) {
      const headerText = line.replace(/^#+\s/, '');

      // Check if the header is in title case
      if (titleCase(headerText) !== headerText) {
        console.log(
          `${chalk.red(headerText) 
          } -> ${ 
            chalk.green(titleCase(headerText)) 
          }\n${ 
            chalk.white(`${filePath  }:${  i + 1}`)}\n`,
        );
        hasError = true;
      }
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
  } else if (filePath.endsWith('.mdx')) {
    checkTitleCase(filePath);
  }
}

// Process files passed as arguments
process.argv.slice(2).forEach(processFiles);

const directoryPath = 'docs/';
processFiles(directoryPath);
