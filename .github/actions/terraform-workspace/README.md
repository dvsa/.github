# Terraform Workspace
Action to create Terraform Namespace

####  Prerequisites
The Terraform configuration must already be initialized and its backend accessible.
The checkout step preserves untracked files, including `.terraform`, from earlier steps.

####  Context
Creates TF workspace with either github actor name or if provided a unique name e.g uat1

Each Terraform configuration has an associated backend that defines how Terraform executes operations and where Terraform stores persistent data, like state.

The persistent data stored in the backend belongs to a workspace. The backend initially has only one workspace containing one Terraform state associated with that configuration. Some backends support multiple named workspaces, allowing multiple states to be associated with a single configuration. The configuration still has only one backend, but you can deploy multiple distinct instances of that configuration without configuring a new backend or changing authentication credentials.

####  Inputs
- terraform_version (optional): Terraform version to install (default `1.9.8`).
- terraform_workspace_name (optional): Workspace name, defaulting to the GitHub actor when empty.
- terraform_directory (optional): Directory containing the initialized configuration (default `.`).

####  Outputs
The selected workspace name is exported as `WORKSPACE` for subsequent steps.

####  Usage     
```yaml
- name: TF workspace
  uses: dvsa/.github/.github/actions/terraform-workspace@v7
  with:
    terraform_workspace_name: ${{ inputs.terraform_workspace_name }}
    terraform_version: '1.9.8'

- name: TF workspace
  uses: dvsa/.github/.github/actions/terraform-workspace@v7
  with:
    terraform_workspace_name: test01         
```
