import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual('{"- follow":false,"  host":"hexlet.io","- proxy":"123.234.53.22","- timeout":50,"+ timeout":20,"+ verbose":true}');

  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'))).toEqual(undefined);

  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual('{"- follow":false,"  host":"hexlet.io","- proxy":"123.234.53.22","- timeout":50,"+ timeout":20,"+ verbose":true}');
});
