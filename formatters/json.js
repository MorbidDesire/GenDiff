import _ from 'lodash';

const json = (obj) => {
  const iterFunction = (data) => Object
    .entries(data)
    .map(([key, value]) => {
      const typeOfValue = typeof value;
      const commonScheme = {
        name: key.slice(2),
        typeOfValue,
        variability: 'unchanged',
        children: 'none',
      };
      switch (key[0]) {
        case ('+'):
          return { ...commonScheme, variability: 'added' };
        case ('-'):
          return { ...commonScheme, variability: 'removed' };
        case (' ') && (_.isObject(value)):
          return { ...commonScheme, variability: 'changed' };
        default:
          break;
      }
      return (_.isObject(value) && key.startsWith(' ')) ? { ...commonScheme, children: iterFunction(value) } : { ...commonScheme, value };
    });
  return JSON.stringify(iterFunction(obj));
};
export default json;

// if (_.isObject(value) && key.startsWith(' ')) {
//   commonScheme.children = iterFunction(value);
// } else {
//   commonScheme.value = value;
// }
// return commonScheme;
