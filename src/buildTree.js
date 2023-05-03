import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const commonKeys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.orderBy(commonKeys, [], ['asc']);
  const filteredData = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', value: buildTree(obj1[key], obj2[key]) };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
  return filteredData;
};
export default buildTree;
