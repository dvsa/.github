# Gatling Job Summary
Action to provide ability to provide build summary for Gatling

####  Prerequisites
Gatling Performance Test Suite

####  Context
This action allows the workflow report Gatling result to GitHub Job Summary

####  Inputs
gatling_report_path (required): Path of Gatling Reports

####  Outputs
N/A

####  Usage     
```yaml
- name: Generate Job Summary 
  uses: dvsa/.github/.github/actions/gatling-job-summary@v4.0.2
  with:
    gatling_report_path: .target/gatling/
```