import {expect, test, jest, beforeEach, describe} from '@jest/globals'
import * as core from '@actions/core'
import { run } from '../src/main';
import { parse } from '../src/reader';


jest.mock('../src/reader');
jest.mock('@actions/core');

    beforeEach(() => {
        jest.clearAllMocks();
      });
describe('main', () => {
    test('should call parse and set output', async () => {
        const filePath = 'path/to/file.xml';
        const results = {
            tests: 2,
            failures: 1,
            errors: 1,
            skipped: 0
        };
        (parse as jest.Mock).mockReturnValue(new Promise((resolve) => resolve(results)));   
        (core.getInput as jest.Mock).mockReturnValueOnce(filePath);
        await run();
        expect(core.summary.addHeading).toHaveBeenCalledWith('Test Results');
       
    })
    test('should add link to summary', async () => {
        const reportPath = 'link';
        const results = {
            tests: 2,
            failures: 1,
            errors: 1,
            skipped: 0
        };
        (parse as jest.Mock).mockReturnValue(new Promise((resolve) => resolve(results)));
        (core.getInput as jest.Mock).mockReturnValue(reportPath);
        (core.summary.addHeading as jest.Mock).mockReturnValueOnce(core.summary);
        (core.summary.addTable as jest.Mock).mockReturnValueOnce(core.summary);
        await run();
        expect(core.summary.addLink).toHaveBeenCalledWith('View Test Results report', reportPath);
    })
    test('should call parse and add table to summary', async () => {
        const filePath = 'path/to/file.xml';
        const results = {
            tests: 2,
            failures: 1,
            errors: 1,
            skipped: 0
        };
        (parse as jest.Mock).mockReturnValue(new Promise((resolve) => resolve(results)));   
        (core.getInput as jest.Mock).mockReturnValueOnce(filePath);
        (core.summary.addHeading as jest.Mock).mockReturnValueOnce(core.summary);
        await run();
        expect(core.summary.addHeading).toHaveBeenLastCalledWith('Test Results');
        expect(core.summary.addTable).toHaveBeenLastCalledWith([
            [
                { data: 'Tests', header: true },
                { data: 'Failures', header: true },
                { data: 'Errors', header: true },
                { data: 'Skipped', header: true }
            ],
            [
                "2",
                "1",
                "1",
                "0"
            ]
        ]);
    })
    test('should handle error', async () => {
        const filePath = 'path/to/file.xml';
        const error = new Error('Invalid XML format');
        (parse as jest.Mock).mockReturnValue(new Promise((_, reject) => reject(error)));
        (core.getInput as jest.Mock).mockReturnValueOnce(filePath);
        await run();
        expect(core.setFailed).toHaveBeenCalledWith(error.message);
    })
    
})



