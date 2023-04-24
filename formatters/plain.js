import _ from 'lodash';
/* eslint-disable max-len */
const plain = (obj) => {
  const iterFunction = (data, path) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const slicedKeys = Object.keys(data).map((key) => key.slice(2));
    const duplicates = slicedKeys.filter((key, index, newKeys) => newKeys.indexOf(key) !== index);

    const changedKeys = Object.keys(data).filter((key) => !(key.startsWith('+') && duplicates.includes(key.slice(2))) && !(key.startsWith(' ') && !_.isObject(data[key])));

    const result = changedKeys.map((key) => {
      let currentValue = _.get(data, key);
      if (_.isObject(data[key])) {
        currentValue = '[complex value]';
      } else if (_.isString(data[key])) {
        currentValue = `'${currentValue}'`;
      }
      let nextValue = _.get(data, `+ ${key.slice(2)}`);
      if (_.isObject(data[`+ ${key.slice(2)}`])) {
        nextValue = '[complex value]';
      } else if (_.isString(data[`+ ${key.slice(2)}`])) {
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

// const plain = (obj) => {
//   const currentPath = [];
//   const iterFunction = (data, path) => {
//     const keys = Object.keys(data);
//     const slicedKeys = keys.map((key) => key.slice(2));
//     const duplicates = slicedKeys.filter((key, index, newKeys) => newKeys.indexOf(key) !== index);

//     const changedKeys = keys.filter((key) => !(key.startsWith('+') && duplicates.includes(key.slice(2))) && !(key.startsWith(' ') && !_.isObject(data[key])));
//     console.log(obj['  common']['+ follow']);
//     const result = changedKeys.map((key) => {
//       let currentValue = `${data[key]}`;
//       if (_.isObject(data[key])) {
//         currentValue = '[complex value]';
//       } else if (_.isString(data[key])) {
//         currentValue = `'${data[key]}'`;
//       }
//       const changedValue = `Property '${key.slice(2)}' was updated. From ${currentValue} to ${data[`+ ${key.slice(2)}`]}`;
//       const removedValue = `Property '${key.slice(2)}' was removed`;
//       const addedValue = `Property '${key.slice(2)}' was added with value: ${currentValue}`;
//       const firstElement = key[0];

//       switch (firstElement) {
//         case '-':
//           return duplicates.includes(key.slice(2)) ? changedValue : removedValue;
//         case '+':
//           return addedValue;
//         default:
//           return iterFunction(data[key], path);
//       }
//     });
//     return result.join('\n');
//   };
//   return iterFunction(obj, currentPath);
// };
// export default plain;

// switch (firstElement) {
//   case '-':
//     return duplicates.includes(key.slice(2)) ? changedValue : removedValue;
//   case '+':
//     return addedValue;
//   default:
//     break;
// }
// if (_.isObject(data[key])) {
//   const newPath = path.concat(`${key.slice(2)}.`);
//   return iterFunction(data[key], newPath);
// }
