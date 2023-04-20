import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path from 'path';
import genDiff from '../src/index.js';

let __filename;
let __dirname;
let getFixturePath;

beforeAll(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
  getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
});

test('JSON files', () => {
  expect(genDiff('stylish', getFixturePath('testfile1.json'), getFixturePath('testfile2.json'))).toMatch(`{
    key1: value1
  - key2: true
  + key2: false
    key3: {
      + lol: {
        }
      - wow: null
    }
}`);
});

test('YAML files', () => {
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

test('Empty file', () => {
  expect(genDiff('stylish', getFixturePath('emptyfile.json'), getFixturePath('testfile2.yml'))).toBeUndefined();
});

test('Invalid Format', () => {
  expect(genDiff('stylish', getFixturePath('random.ini'), getFixturePath('testfile2.yml'))).toBeUndefined();
});
