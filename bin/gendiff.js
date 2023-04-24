#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../formatters/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .action((filepath1, filepath2) => {
    console.log(genDiff(program.opts().format, filepath1, filepath2));
  });

program.parse();
