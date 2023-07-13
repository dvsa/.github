# Display Jest Test Summary
Action to output results of jest tests to Github summary

####  Prerequisites
Jest tests ran and HTML file generated via [jest-html-reporter](https://www.npmjs.com/package/jest-html-reporter)

[Cheerio installed](https://cheerio.js.org/)

[fs-extra installed](https://www.npmjs.com/package/fs-extra)

####  Context
This action allows the workflow to add a summary of jest test passes and failures to the GitHub summary
This does not display details of test failures, it can be used in addition to the 'github-actions' reporter as part of 
the jest config

####  Inputs
test_report_path (required): Path of test report HTML file

####  Outputs
Table of jest test results displayed on Github summary

![e2e test summary](https://github.com/alexisc-kainos/.github/assets/74315644/b9ee7058-0d2f-41d3-b045-d2a39a200010)

####  Usage
```yaml
- name: Display Jest Test Summary
  uses: dvsa/.github/.github/actions/display-jest-test-summary@main
  with:
    test_report_path: 'test-report.html'
```
