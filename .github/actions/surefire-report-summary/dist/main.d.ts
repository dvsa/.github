import { Results } from './types';
export declare function run(): Promise<void>;
export declare const calculatePassPercentage: (results: Results) => number;
export declare const failOnTestFailures: (results: Results) => Promise<boolean>;
export declare const failOnTestErrors: (results: Results) => Promise<boolean>;
