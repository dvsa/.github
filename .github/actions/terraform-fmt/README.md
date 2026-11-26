# Terraform fmt
Action to run Terraform fmt command

####  Prerequisites
N/A

####  Context
The terraform fmt command is used to rewrite Terraform configuration files to a canonical format and style. This command applies a subset of the Terraform language style conventions, along with other minor adjustments for readability.

####  Inputs
- `terraform_version` (optional): Terraform version to install (default `1.9.8`).
- `check` (optional): Report formatting errors without changing files (`'true'` by default).
- `recursive` (optional): Check subdirectories (`'true'` by default).
- `path` (optional): File or directory to format (default current directory).

####  Outputs
N/A

####  Usage     
```yaml
- name: terraform fmt
  uses: dvsa/.github/.github/actions/terraform-fmt@v7
```
