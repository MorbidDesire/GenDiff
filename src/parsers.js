import yaml from 'js-yaml';

const parser = (data, extname) => {
  switch (extname) {
    case '.yml' || '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      return undefined;
  }
};
//   if (extname === '.yml' || extname === '.yaml') {
//     return yaml.load(data);
//   }
//   if (extname === '.json') {
//     return JSON.parse(data);
//   }
// };
export default parser;
