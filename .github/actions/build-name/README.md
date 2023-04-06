# Build Name
Action to provide naming convention for build artifacts

####  Prerequisites
N/A

####  Context
This action allows the workflow to dynamically create the correct build names for artifacts.

####  Inputs
N/A
####  Outputs
- short_sha: Short SHA returned from git codebase.
- pretty_branch_name: Pretty branch name returned from git codebase.
- artifact_prefix: Naming convention using short_sha and pretty_branch_name.

####  Usage     
```yaml
- name: Build Names
  uses: dvsa/.github/.github/actions/build-name@3.2.0
```