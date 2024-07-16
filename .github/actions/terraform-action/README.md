# Terraform Action (TF Scaffold)
Action to run TF Scaffold Terraform Action

####  Prerequisites
Authenticated with AWS Account

####  Context
This action allows the workflow to run terraform commands via TF Scaffold

####  Inputs
- action (required): Terraform action to run e.g plan.
- project (required): Terraform project e.g dvsa <project_name>.
- environment (required): Terraform environment e.g dev.
- component (required): Terraform component to deploy e.g db.
- group (required): Terraform group to reference e.g dev.
- bucket-prefix (required): AWS Terraform bucket used for TF state.
- region (required): AWS region used e.g eu-west-1.
- terraform_version (optional): Terraform Version to install on runner.
- terraform_args (optional): Additional Terraform arguments .

####  Outputs
N/A

####  Usage     
```yaml
- name: Terraform - db
  uses: dvsa/.github/.github/actions/terraform-action@v4.1.1
  with:
    action: plan
    environment: dev
    component: db
    group: dev
    bucket-prefix: mot-recalls-tfscaffold
    region: eu-west-1
    project: mot-project

- name: Terraform - app
  uses: dvsa/.github/.github/actions/terraform-action@v4.1.1
  with:
    action: plan
    environment: dev
    component: app
    group: dev
    bucket-prefix: mot-recalls-tfscaffold
    region: eu-west-1
    project: mot-project
    terraform_args: "-var lambda_version=1.x.x"          
```
