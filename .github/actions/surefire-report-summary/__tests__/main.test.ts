import {expect, test, jest, beforeEach, describe} from '@jest/globals'
import * as core from '@actions/core'
import { run, calculatePassPercentage } from '../src/main';
import { parse } from '../src/reader';


jest.mock('../src/reader');
jest.mock('@actions/core');

beforeEach(() => {
    jest.clearAllMocks();
    (core.summary.addHeading as jest.Mock).mockReturnValue(core.summary);
    (core.summary.addTable as jest.Mock).mockReturnValue(core.summary);
    (core.summary.addLink as jest.Mock).mockReturnValue(core.summary);
    (core.summary.write as jest.Mock).mockReturnValue(Promise.resolve());
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
        await run();
        expect(core.summary.addLink).toHaveBeenCalledWith('View Test Results report', reportPath);
    })
    test('should call parse and add table to summary with pass rate', async () => {
        const filePath = 'path/to/file.xml';
        const results = {
            tests: 2,
            failures: 1,
            errors: 1,
            skipped: 0
        };
        (parse as jest.Mock).mockReturnValue(new Promise((resolve) => resolve(results)));   
        (core.getInput as jest.Mock).mockReturnValueOnce(filePath).mockReturnValueOnce('report');
        await run();
        expect(core.summary.addHeading).toHaveBeenLastCalledWith('Test Results');
        expect(core.summary.addTable).toHaveBeenLastCalledWith([
            [
                { data: 'Tests', header: true },
                { data: 'Failures', header: true },
                { data: 'Errors', header: true },
                { data: 'Skipped', header: true },
                { data: 'Pass Rate', header: true }
            ],
            [
                "2",
                "1",
                "1",
                "0",
                "0.00%"
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
    
    test('should fail when pass percentage is below threshold', async () => {
        const filePath = 'path/to/file.xml';
        const results = {
            tests: 10,
            failures: 2,
            errors: 0,
            skipped: 0
        };
        (parse as jest.Mock).mockReturnValue(new Promise((resolve) => resolve(results)));
        (core.getInput as jest.Mock)
            .mockReturnValueOnce(filePath)
            .mockReturnValueOnce('report')
            .mockReturnValueOnce('95');
        await run();
        expect(core.setFailed).toHaveBeenCalledWith('Pass percentage 80.00% is below threshold of 95%');
    })
    
    test('should pass when pass percentage meets threshold', async () => {
        const filePath = 'path/to/file.xml';
        const results = {
            tests: 10,
            failures: 0,
            errors: 0,
            skipped: 0
        };
        (parse as jest.Mock).mockReturnValue(new Promise((resolve) => resolve(results)));
        (core.getInput as jest.Mock)
            .mockReturnValueOnce(filePath)
            .mockReturnValueOnce('report')
            .mockReturnValueOnce('95');
        await run();
        expect(core.setFailed).not.toHaveBeenCalled();
        expect(core.info).toHaveBeenCalledWith('Pass percentage 100.00% meets or exceeds threshold of 95%');
    })
})

describe('calculatePassPercentage', () => {
    test('should calculate pass percentage correctly', () => {
        const results = {
            tests: 10,
            failures: 1,
            errors: 1,
            skipped: 2
        };
        expect(calculatePassPercentage(results)).toBe(75);
    });

    test('should handle all skipped tests', () => {
        const results = {
            tests: 10,
            failures: 0,
            errors: 0,
            skipped: 10
        };
        expect(calculatePassPercentage(results)).toBe(0);
    });

    test('should handle all passing tests', () => {
        const results = {
            tests: 10,
            failures: 0,
            errors: 0,
            skipped: 0
        };
        expect(calculatePassPercentage(results)).toBe(100);
    });
});



