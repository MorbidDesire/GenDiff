/* eslint-disable no-unused-vars */
import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

const genDiff = (filepath1, filepath2, formatter) => {
  console.log(filepath1, filepath2, formatter);
  const extname1 = path.extname(filepath1);
  const extname2 = path.extname(filepath2);

  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');

  if (data1.length === 0 || data2.length === 0) {
    return undefined;
  }
  console.log(data1, data2);
  const dataParsed1 = parser(data1, extname1);
  const dataParsed2 = parser(data2, extname2);
  console.log(dataParsed1, dataParsed2);
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
  switch (formatter) {
    case 'plain':
      return plain(iterFunction(dataParsed1, dataParsed2));
    case 'json':
      return json(iterFunction(dataParsed1, dataParsed2));
    default:
      return stylish(iterFunction(dataParsed1, dataParsed2));
  }
};

export default genDiff;
