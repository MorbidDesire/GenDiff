// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parser = (data, extname) => {
  if (extname === '.yml' || extname === '.yaml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};
export default parser;
