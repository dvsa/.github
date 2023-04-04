# Java Configuration
Action to install dependencies in workflow

####  Prerequisites
N/A

####  Context
This action allows the workflow to install dependencies like npm

####  Inputs
node-version (optional, Default:18): Version of Node to install.

####  Outputs
N/A

####  Usage     
```yaml
- name: Install Dependencies
  uses: dvsa/.github/.github/actions/install-deps@main
  with:
    node-version: 18
    npm-version: 7
```