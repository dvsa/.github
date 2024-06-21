# Terraform PR Update
Action to create Pull Request comment for Terraform Plans

####  Prerequisites
Requires TF action to produce terraform Plan.

####  Context
Creates Comment on an open Pull Request. Provides an audit trail for terraform changes from Pull Requests

####  Inputs
N/A

####  Outputs
N/A

####  Usage     
```yaml
pr-update:
  needs: tf-plan
  runs-on: ubuntu-latest
  steps:
  - uses: dvsa/.github/.github/actions/update-pr@v4.0.2
```
