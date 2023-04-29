import _ from 'lodash';

const json = (obj) => {
  const iterFunction = (data) => Object.entries(data)
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
          commonScheme.variability = 'added';
          break;
        case ('-'):
          commonScheme.variability = 'removed';
          break;
        case (' ') && (_.isObject(value)):
          commonScheme.variability = 'changed';
          break;
        default:
          commonScheme.variability = 'unchanged';
          break;
      }
      if (_.isObject(value) && key.startsWith(' ')) {
        commonScheme.children = iterFunction(value);
      } else {
        commonScheme.value = value;
      }
      return commonScheme;
    });
  return JSON.stringify(iterFunction(obj));
};
export default json;
