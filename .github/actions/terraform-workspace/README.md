# Terraform Workspace
Action to create Terraform Namespace

####  Prerequisites
N/A

####  Context
Creates TF workspace with either github actor name or if provided a unique name e.g uat1

Each Terraform configuration has an associated backend that defines how Terraform executes operations and where Terraform stores persistent data, like state.

The persistent data stored in the backend belongs to a workspace. The backend initially has only one workspace containing one Terraform state associated with that configuration. Some backends support multiple named workspaces, allowing multiple states to be associated with a single configuration. The configuration still has only one backend, but you can deploy multiple distinct instances of that configuration without configuring a new backend or changing authentication credentials.

####  Inputs
- terraform_version (optional): Terraform Version to install on runner.
- terraform_workspace_name (optional): Name for Terraform Workspace e.g dev01 or uat01.

####  Outputs
N/A

####  Usage     
```yaml
- name: TF workspace
  uses: dvsa/.github/.github/actions/terraform-workspace@v4.0.1
  with:
    terraform_workspace_name: ${{ inputs.terraform_workspace_name }}
    terraform_version: 1.3.7

- name: TF workspace
  uses: dvsa/.github/.github/actions/terraform-workspace@v4.0.1
  with:
    terraform_workspace_name: test01         
```
