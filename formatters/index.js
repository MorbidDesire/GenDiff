import stylish from './stylish.js';
import genDiff from '../src/index.js';
import plain from './plain.js';
import json from './json.js';

const gendiff = (formatter, filepath1, filepath2) => {
  switch (formatter) {
    case 'plain':
      return plain(genDiff(filepath1, filepath2));
    case 'json':
      return json(genDiff(filepath1, filepath2));
    default:
      return stylish(genDiff(filepath1, filepath2));
  }
};
export default gendiff;
