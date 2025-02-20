import * as core from '@actions/core'
import {parse, read} from './reader'
import { Results } from './types';



export async function run(): Promise<void> {
  try {
    const filePath:string = core.getInput('file-path', {required: true});
    const reportPath:string = core.getInput('report-path', {required: true});
    core.debug(`file-path: ${filePath}`);
    core.debug(`report-path: ${filePath}`);
    const results = await parse( read(filePath) );

    const passPercentage = calculatePassPercentage(results);
    
    await core.summary.addHeading('Test Results')
    .addTable([
      [{data: 'Tests', header: true}, {data: 'Failures', header: true}, {data: 'Errors', header: true}, {data: 'Skipped', header: true}, {data: 'Pass Rate', header: true}],
      [results.tests.toString(), results.failures.toString(), results.errors.toString(), results.skipped.toString(), `${passPercentage.toFixed(2)}%`]
    ])
    .addLink('View Test Results report', reportPath)
    .write();
    core.debug(`Results: ${JSON.stringify(results)}`);
    
    const passThreshold = parseFloat(core.getInput('pass-percentage'));
    
    // If pass-percentage is set, use only that criteria
    if (passThreshold > 0) {
      if (passPercentage < passThreshold) {
        core.setFailed(`Pass percentage ${passPercentage.toFixed(2)}% is below threshold of ${passThreshold}%`);
      } else {
        core.info(`Pass percentage ${passPercentage.toFixed(2)}% meets or exceeds threshold of ${passThreshold}%`);
      }
    } else {
      // Only check individual failure conditions if pass-percentage is not set
      if (await failOnTestFailures(results)) {
        core.setFailed('Test failures found');
      } else if (await failOnTestErrors(results)) {
        core.setFailed('Test errors found');
      } else {
        core.info('All checks passed successfully');
      }
    }
  } catch (error) {
    core.setFailed(`${(error as Error)?.message ?? error}`)
  }
}

export const calculatePassPercentage = (results: Results): number => {
  const totalRun = results.tests - results.skipped;
  if (totalRun === 0) return 0;
  const passed = totalRun - (results.failures + results.errors);
  return (passed / totalRun) * 100;
}

export const failOnTestFailures = async (results: Results): Promise<boolean> => {
  const fail_on_test_failures:boolean = core.getInput('fail-on-test-failures') === 'true';
   if (!fail_on_test_failures) {
       return false;
   }
  return results.failures > 0;
}

export const failOnTestErrors = async (results: Results): Promise<boolean> => {
  const fail_on_test_errors:boolean = core.getInput('fail-on-test-errors') === 'true';
   if (!fail_on_test_errors) {
       return false;
   }
  return results.errors > 0;
}