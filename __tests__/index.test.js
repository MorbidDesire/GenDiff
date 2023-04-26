import { test, expect, describe } from '@jest/globals';
import genDiff from '../formatters/index.js';

describe('Json files', () => {
  test('stylish for json files', () => {
    expect(genDiff('stylish', 'testfile1.json', 'testfile2.json')).toEqual(`{
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
    expect(genDiff('plain', 'testfile1.json', 'testfile2.json')).toEqual(`Property 'key2' was removed
Property 'key3.lol' was added with value: [complex value]
Property 'key3.wow' was removed
Property 'key4' was added with value: 'hex'`);
  });
  test('json for json files', () => {
    // eslint-disable-next-line quotes
    expect(genDiff('json', 'testfile1.json', 'testfile2.json')).toEqual(`[{"key1":{"typeOfValue":"string","value":"value1","variability":"unchanged"}},{"key2":{"typeOfValue":"boolean","value":"true","variability":"removed"}},{"key3":{"typeOfValue":"object","value":"[object Object]","variability":"unchanged","children":"{"lol":{"typeOfValue":"object","value":"[object Object]","variability":"added","children":""}},{"wow":{"typeOfValue":"object","value":"null","variability":"removed"}}"}},{"key4":{"typeOfValue":"string","value":"hex","variability":"added"}}]`);
  });
});

describe('Yaml files', () => {
  test('stylish for yaml files', () => {
    expect(genDiff('stylish', 'testfile1.yml', 'testfile2.yml')).toEqual(`{
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
    expect(genDiff('plain', 'testfile1.yml', 'testfile2.yml')).toEqual(`Property 'key2' was updated. From true to [complex value]
Property 'where.object' was added with value: 'test'`);
  });
  test('json for yaml files', () => {
    // eslint-disable-next-line quotes
    expect(genDiff('json', 'testfile1.yml', 'testfile2.yml')).toEqual(`[{"fishnews":{"typeOfValue":"string","value":"mac","variability":"unchanged"}},{"key2":{"typeOfValue":"boolean","value":"true","variability":"removed"}},{"key2":{"typeOfValue":"object","value":"[object Object]","variability":"added","children":""}},{"where":{"typeOfValue":"object","value":"[object Object]","variability":"unchanged","children":"{"object":{"typeOfValue":"string","value":"test","variability":"added"}},{"pop":{"typeOfValue":"object","value":"null","variability":"unchanged"}}"}}]`);
  });
});

test('Empty file', () => {
  expect(genDiff('stylish', 'emptyfile.json', 'testfile2.yml')).toEqual('undefined');
});

test('Invalid Format', () => {
  expect(genDiff('stylish', 'random.ini', 'testfile2.yml')).toEqual('undefined');
});
