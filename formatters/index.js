import stylish from './stylish.js';
import genDiff from '../src/index.js';
import plain from './plain.js';

const gendiff = (formatter, filepath1, filepath2) => {
  if (formatter === 'plain') {
    return plain(genDiff(filepath1, filepath2));
  }
  return stylish(genDiff(filepath1, filepath2));
};
export default gendiff;
