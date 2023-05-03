import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('Json files', () => {
  test('stylish for json files', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFixture('result-stylish.txt'));
  });
  test('plain for json files', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFixture('result-plain.txt'));
  });
  test('json for json files', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFixture('result-json.json'));
  });
  test('default formatter', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFixture('result-stylish.txt'));
  });
});

describe('Yml files', () => {
  test('stylish for yml files', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFixture('result-stylish.txt'));
  });
  test('plain for yml files', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(readFixture('result-plain.txt'));
  });
  test('json for yml files', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(readFixture('result-json.json'));
  });
  test('default formatter', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(readFixture('result-stylish.txt'));
  });
});
