# AWS Auth
Action to provide ability to authenticate against AWS account

####  Prerequisites
Set up Identity Provider and create IAM roles - https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services

####  Context
This action allows the workflow to interact with AWS by authenticating against a AWS role. This removes the need for access keys to be stored in github secrets.

####  Inputs  
  
- aws_role (required): Role name used by Github in AWS Account
- aws_region (required): AWS Region
- aws_account_id (required): Account ID for AWS Account

####  Outputs
N/A

####  Usage     
```yaml
- name: AWS Authentication
  uses: dvsa/.github/.github/actions/aws-auth@v4.0.2
  with:
    aws_role: dvsa-infra-github
    aws_region: eu-west-1
    aws_account_id: 123456789101
```
