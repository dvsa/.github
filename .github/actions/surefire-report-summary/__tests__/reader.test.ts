import { parse } from '../src/reader';
import { readFileSync } from 'fs';
import {expect, test, jest, beforeEach, describe} from '@jest/globals'
beforeEach(() => {
  jest.resetModules();
});

describe('parse', () => {
  test('parse surefire report', async () => {
    const xml = readFileSync('__tests__/resources/surefire-report.xml', 'utf8');
    const result = await parse(xml);
    expect(result).toEqual({
      tests: 2,
      failures: 1,
      errors: 1,
      skipped: 0
    });
  });
  test('error when invalid xml', async () => {
    const xml = '<invalid xml?';
    await expect(parse(xml)).rejects.toThrow('Invalid XML');
  });
  test('error when no testsuite or attributes', async () => {
    const xml = '<root></root>';
    await expect(parse(xml)).rejects.toThrow('Invalid XML format');
  });
});