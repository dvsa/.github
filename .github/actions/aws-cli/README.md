# AWS CLI
Action to provide ability to run AWS CLI command

####  Prerequisites
Authenticated with AWS Account

####  Context
This action allows the workflow to interact with AWS the CLI.

####  Inputs
command (required): Command to be invoked by AWS CLI.

####  Outputs
N/A

####  Usage     
```yaml
- name: List S3 Buckets
  uses: dvsa/.github/.github/actions/aws-cli@v4.0.2
  with:
    command: "s3 ls"
```