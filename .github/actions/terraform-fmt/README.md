# Terraform fmt
Action to run Terraform fmt command

####  Prerequisites
N/A

####  Context
The terraform fmt command is used to rewrite Terraform configuration files to a canonical format and style. This command applies a subset of the Terraform language style conventions, along with other minor adjustments for readability.

####  Inputs
N/A

####  Outputs
N/A

####  Usage     
```yaml
- name: terraform fmt
  uses: dvsa/.github/.github/actions/terraform-fmt@v4.1.1
```