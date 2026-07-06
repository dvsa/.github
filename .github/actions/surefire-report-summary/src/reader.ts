import { DOMParser } from '@xmldom/xmldom'
import { readFileSync } from 'fs';
import { Results } from './types';


export const parse = async (xml:string): Promise<Results> => {
  let doc
  try {
    doc = new DOMParser().parseFromString(xml, 'text/xml')
  } catch {
    throw new Error('Invalid XML')
  }
  const root = doc.documentElement
  if (!root) throw new Error('Invalid XML format')
  const tests = root.getAttribute('tests')
  const failures = root.getAttribute('failures')
  const errors = root.getAttribute('errors')
  const skipped = root.getAttribute('skipped')
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

