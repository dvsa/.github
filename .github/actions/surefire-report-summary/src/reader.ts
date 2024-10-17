import { DOMParser } from '@xmldom/xmldom'
import { readFileSync } from 'fs';
import { Results } from './types';


export const parse = async (xml:string): Promise<Results> => {
  const doc = new DOMParser().parseFromString(xml, 'text/xml')
  const tests = doc.documentElement.getAttribute('tests')
  const failures = doc.documentElement.getAttribute('failures')
  const errors = doc.documentElement.getAttribute('errors')
  const skipped = doc.documentElement.getAttribute('skipped')
  if (!tests || !failures || !errors || !skipped) throw new Error('Invalid XML format')
  return {
    tests: tests ? parseInt(tests) : 0,
    failures: failures ? parseInt(failures) : 0,
    errors: errors ? parseInt(errors) : 0,
    skipped: skipped ? parseInt(skipped) : 0
  }
};

export const read = (path: string): string => { 
    return readFileSync(path, 'utf8');
}

