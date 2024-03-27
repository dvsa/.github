# Terraform Security Scan
Action to run Terraform tfsec Scan

####  Prerequisites
N/A

####  Context
Run tfsec on Terraform Code

####  Inputs
github_token (required): GitHub Token
terraform_version (optional): Terraform Version
path (required): Target directory to run tfsec


####  Outputs
N/A

####  Usage     
```yaml
- name: Terraform tfsec Scan
  uses: dvsa/.github/.github/actions/terraform-tfsec@main
  with:
    terraform_version: 1.5.5
    path: components/*
```