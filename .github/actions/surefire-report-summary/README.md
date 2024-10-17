# Surefire Report Summary
Action to extract a summary from a Surefire report and optionally fail the action based on test results.

#### Prerequisites
N/A

#### Context
This action reads a Surefire report, extracts a summary of the test results, and writes the summary to a specified file. It can optionally fail the action if there are test failures or errors.

#### Inputs
| Name                    | Description                                                        | Required | Default |
|-------------------------|--------------------------------------------------------------------|----------|---------|
| `file-path`              | Path to the file containing the Surefire report                    | `true`   | N/A     |
| `report-path`            | Path to the file where the summary will be written                 | `true`   | N/A     |
| `fail-on-test-failures`  | If `true`, the action will fail if there are test failures         | `false`  | `false` |
| `fail-on-test-errors`    | If `true`, the action will fail if there are test errors           | `false`  | `false` |

#### Outputs
N/A

#### Usage
```yaml
- name: Surefire Report Summary
  uses: your-org/.github/actions/surefire-report-summary@version
  with:
    file-path: './path-to-surefire-report.xml'
    report-path: './path-to-summary-output.txt'
    fail-on-test-failures: true
    fail-on-test-errors: false