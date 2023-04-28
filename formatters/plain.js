import _ from 'lodash';

const plain = (obj) => {
  const iterFunction = (data, path) => {
    if (!_.isObject(data)) {
      return undefined;
    }
    const slicedKeys = Object.keys(data).map((key) => key.slice(2));
    const duplicates = slicedKeys.filter((key, index, newKeys) => newKeys.indexOf(key) !== index);

    const changedKeys = Object.keys(data).filter((key) => !(key.startsWith('+') && duplicates.includes(key.slice(2))) && !(key.startsWith(' ') && !_.isObject(data[key])));

    const result = changedKeys.map((key) => {
      let currentValue = _.get(data, key);
      if (_.isObject(currentValue)) {
        currentValue = '[complex value]';
      } else if (_.isString(currentValue)) {
        currentValue = `'${currentValue}'`;
      }
      let nextValue = _.get(data, `+ ${key.slice(2)}`);
      if (_.isObject(nextValue)) {
        nextValue = '[complex value]';
      } else if (_.isString(nextValue)) {
        nextValue = `'${nextValue}'`;
      }
      const changedValue = `Property '${path}${key.slice(2)}' was updated. From ${currentValue} to ${nextValue}`;
      const removedValue = `Property '${path}${key.slice(2)}' was removed`;
      const addedValue = `Property '${path}${key.slice(2)}' was added with value: ${currentValue}`;

      if (key[0] === '-') {
        return duplicates.includes(key.slice(2)) ? changedValue : removedValue;
      } if (key[0] === '+') {
        return addedValue;
      }
      const newPath = path.concat(`${key.slice(2)}.`);
      return iterFunction(data[key], newPath);
    });
    return result.join('\n');
  };
  return iterFunction(obj, '');
};
export default plain;
