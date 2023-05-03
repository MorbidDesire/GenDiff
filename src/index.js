import { readFileSync } from 'fs';
import path from 'path';
import parser from './parsers.js';
import buildTree from './buildTree.js';
import formatedData from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const typeOfFile = (filepath) => path.extname(filepath).slice(1);
  const getData = (filepath) => parser(readFileSync(filepath, 'utf-8'), typeOfFile(filepath));
  const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

  const dataFile1 = getData(buildFullPath(filepath1));
  const dataFile2 = getData(buildFullPath(filepath2));

  const diffTree = buildTree(dataFile1, dataFile2);
  return formatedData(diffTree, formatter);
};

export default genDiff;
