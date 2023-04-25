import _ from 'lodash';

const json = (obj) => {
  const iterFunction = (data) => {
    const result = Object.entries(data)
      .map(([key, value]) => {
        let newkey = key;
        const typeOfValue = typeof value;
        let variability = 'unchanged';
        if (key[0] === '+') {
          newkey = key.slice(2);
          variability = 'added';
        }
        if (key[0] === '-') {
          newkey = key.slice(2);
          variability = 'removed';
        }
        if (key[0] === ' ') {
          newkey = key.slice(2);
        }
        if (!_.isObject(value)) {
          return `{"${newkey}":{"typeOfValue":"${typeOfValue}","value":"${value}","variability":"${variability}"}}`;
        }
        return `{"${newkey}":{"typeOfValue":"${typeOfValue}","value":"${value}","variability":"${variability}","children":"${iterFunction(value)}"}}`;
      });
    return result;
  };
  return `[${iterFunction(obj).join(',')}]`;
};
export default json;
