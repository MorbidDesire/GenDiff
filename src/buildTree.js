import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const sortedKeys = Object.keys({ ...obj1, ...obj2 }).sort();
  const filteredData = sortedKeys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { ...acc, [`  ${key}`]: buildTree(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { ...acc, [`  ${key}`]: obj2[key] };
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return { ...acc, [`- ${key}`]: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return { ...acc, [`+ ${key}`]: obj2[key] };
    }
    return { ...acc, [`- ${key}`]: obj1[key], [`+ ${key}`]: obj2[key] };
  }, {});
  return filteredData;
};
export default buildTree;
