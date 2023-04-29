import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatedData = (mainData, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(mainData);
    case 'json':
      return json(mainData);
    default:
      return stylish(mainData);
  }
};
export default formatedData;
