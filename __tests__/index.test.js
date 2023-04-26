import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path from 'path';
import genDiff from '../formatters/index.js';

let __filename;
let __dirname;
let getFixturePath;

beforeAll(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
  getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
});

describe('Json files', () => {
  test('stylish for json files', () => {
    expect(genDiff('stylish', getFixturePath('testfile1.json'), getFixturePath('testfile2.json'))).toMatch(`{
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
    expect(genDiff('plain', getFixturePath('testfile1.json'), getFixturePath('testfile2.json'))).toMatch(`Property 'key2' was removed
Property 'key3.lol' was added with value: [complex value]
Property 'key3.wow' was removed
Property 'key4' was added with value: 'hex'`);
  });
  test('json for json files', () => {
    // eslint-disable-next-line quotes
    expect(genDiff('json', getFixturePath('testfile1.json'), getFixturePath('testfile2.json'))).toMatch(`[{"key1":{"typeOfValue":"string","value":"value1","variability":"unchanged"}},{"key2":{"typeOfValue":"boolean","value":"true","variability":"removed"}},{"key3":{"typeOfValue":"object","value":"[object Object]","variability":"unchanged","children":"{"lol":{"typeOfValue":"object","value":"[object Object]","variability":"added","children":""}},{"wow":{"typeOfValue":"object","value":"null","variability":"removed"}}"}},{"key4":{"typeOfValue":"string","value":"hex","variability":"added"}}]`);
  });
});

describe('Yaml files', () => {
  test('stylish for yaml files', () => {
    expect(genDiff('stylish', getFixturePath('testfile1.yml'), getFixturePath('testfile2.yml'))).toMatch(`{
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
    expect(genDiff('plain', getFixturePath('testfile1.yml'), getFixturePath('testfile2.yml'))).toMatch(`Property 'key2' was updated. From true to [complex value]
Property 'where.object' was added with value: 'test'`);
  });
  test('json for yaml files', () => {
    // eslint-disable-next-line quotes
    expect(genDiff('json', getFixturePath('testfile1.yml'), getFixturePath('testfile2.yml'))).toMatch(`[{"fishnews":{"typeOfValue":"string","value":"mac","variability":"unchanged"}},{"key2":{"typeOfValue":"boolean","value":"true","variability":"removed"}},{"key2":{"typeOfValue":"object","value":"[object Object]","variability":"added","children":""}},{"where":{"typeOfValue":"object","value":"[object Object]","variability":"unchanged","children":"{"object":{"typeOfValue":"string","value":"test","variability":"added"}},{"pop":{"typeOfValue":"object","value":"null","variability":"unchanged"}}"}}]`);
  });
});

test('Empty file', () => {
  expect(genDiff('stylish', getFixturePath('emptyfile.json'), getFixturePath('testfile2.yml'))).toEqual('undefined');
});

test('Invalid Format', () => {
  expect(genDiff('stylish', getFixturePath('random.ini'), getFixturePath('testfile2.yml'))).toEqual('undefined');
});
