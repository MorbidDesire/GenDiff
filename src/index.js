import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  const extname1 = path.extname(filepath1);
  const extname2 = path.extname(filepath2);

  const data1 = readFileSync(getFixturePath(filepath1), 'utf-8');
  const data2 = readFileSync(getFixturePath(filepath2), 'utf-8');

  if (data1.length === 0 || data2.length === 0) {
    return undefined;
  }

  const dataParsed1 = parser(data1, extname1);
  const dataParsed2 = parser(data2, extname2);

  if (dataParsed1 === undefined || dataParsed2 === undefined) {
    return undefined;
  }

  const iterFunction = (obj1, obj2) => {
    const sortedKeys = Object.keys({ ...obj1, ...obj2 }).sort();
    const filteredData = sortedKeys.reduce((acc, key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        acc[`  ${key}`] = iterFunction(obj1[key], obj2[key]);
        return acc;
      }
      if (obj1[key] === obj2[key]) {
        acc[`  ${key}`] = obj2[key];
        return acc;
      }
      if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
        acc[`- ${key}`] = obj1[key];
        return acc;
      }
      if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        acc[`+ ${key}`] = obj2[key];
        return acc;
      }
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
      return acc;
    }, {});
    return filteredData;
  };
  return iterFunction(dataParsed1, dataParsed2);
};

export default genDiff;
