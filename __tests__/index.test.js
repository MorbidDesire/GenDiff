import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Json files', () => {
  test('stylish for json files', () => {
    expect(genDiff(getFixturePath('testfile1.json'), getFixturePath('testfile2.json'), 'stylish')).toEqual(`{
    key1: value1
  - key2: true
    key3: {
      + lol: {
        }
      - wow: null
    }
  + key4: hex
}`);
  });
  test('plain for json files', () => {
    expect(genDiff(getFixturePath('testfile1.json'), getFixturePath('testfile2.json'), 'plain')).toEqual(`Property 'key2' was removed
Property 'key3.lol' was added with value: [complex value]
Property 'key3.wow' was removed
Property 'key4' was added with value: 'hex'`);
  });
  test('json for json files', () => {
    // eslint-disable-next-line quotes
    expect(genDiff(getFixturePath('testfile1.json'), getFixturePath('testfile2.json'), 'json')).toEqual(`[{"name":"key1","typeOfValue":"string","variability":"unchanged","children":"none","value":"value1"},{"name":"key2","typeOfValue":"boolean","variability":"removed","children":"none"},{"name":"key3","typeOfValue":"object","variability":"unchanged","children":[{"name":"lol","typeOfValue":"object","variability":"added","children":"none"},{"name":"wow","typeOfValue":"object","variability":"removed","children":"none"}]},{"name":"key4","typeOfValue":"string","variability":"added","children":"none"}]`);
  });
});

describe('Yaml files', () => {
  test('stylish for yaml files', () => {
    expect(genDiff(getFixturePath('testfile1.yml'), getFixturePath('testfile2.yml'), 'stylish')).toEqual(`{
    fishnews: mac
  - key2: true
  + key2: {
    }
    where: {
      + object: test
        pop: null
    }
}`);
  });
  test('plain for yaml files', () => {
    expect(genDiff(getFixturePath('testfile1.yml'), getFixturePath('testfile2.yml'), 'plain')).toEqual(`Property 'key2' was updated. From true to [complex value]
Property 'where.object' was added with value: 'test'`);
  });
  test('json for yaml files', () => {
    // eslint-disable-next-line quotes
    expect(genDiff(getFixturePath('testfile1.yml'), getFixturePath('testfile2.yml'), 'json')).toEqual(`[{"name":"fishnews","typeOfValue":"string","variability":"unchanged","children":"none","value":"mac"},{"name":"key2","typeOfValue":"boolean","variability":"removed","children":"none"},{"name":"key2","typeOfValue":"object","variability":"added","children":"none"},{"name":"where","typeOfValue":"object","variability":"unchanged","children":[{"name":"object","typeOfValue":"string","variability":"added","children":"none"},{"name":"pop","typeOfValue":"object","variability":"unchanged","children":"none","value":null}]}]`);
  });
});

test('Invalid Format', () => {
  expect(genDiff(getFixturePath('random.ini'), getFixturePath('testfile2.yml'), 'stylish')).toBeUndefined();
});
