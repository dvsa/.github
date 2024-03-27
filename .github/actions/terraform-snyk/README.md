# Terraform Synk Scan
Action to run Terraform Synk Scan

####  Prerequisites
N/A

####  Context
Run Snyk Scan on Terraform Code

####  Inputs
snyk_token (required): Snyk Token
terraform_version (optional): Terraform Version


####  Outputs
N/A

####  Usage     
```yaml
- name: Terraform Snyk Scan
  uses: dvsa/.github/.github/actions/terraform-snyk@main
  with:
    terraform_version: 1.5.5
    snyk_token: xyz123
```