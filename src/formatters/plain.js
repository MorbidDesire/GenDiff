import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } return typeof value === 'string' ? `'${value}'` : String(value);
};

const plain = (obj, key = '') => {
  const result = obj
    .filter((node) => node.type !== 'unchanged')
    .flatMap((node) => {
      const keys = [...key, node.key];
      const path = keys.join('.');
      switch (node.type) {
        case 'nested': {
          return plain(node.value, keys);
        }
        case 'removed': {
          return `Property '${path}' was removed`;
        }
        case 'added': {
          return `Property '${path}' was added with value: ${stringify(node.value)}`;
        }
        case 'changed': {
          return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        }
        default:
          return undefined;
      }
    });
  return result;
};
export default (diff) => plain(diff).join('\n');
