# Display Inputs to Workflow

Action to output the inputs to a workflow to the logs and (optionally) to display them on the GitHub summary

#### Prerequisites

N/A

#### Context

This action allows the workflow to output its inputs to logs and to the GitHub Summary

#### Inputs

display_on_github_summary (optional): Boolean. Whether to write inputs to GitHub Summary

#### Outputs

If display_on_github_summary is true, table of inputs displayed on GitHub summary

#### Usage

```yaml
- name: Display Inputs to Workflow
  uses: dvsa/.github/.github/actions/display-inputs@main
  with:
    display_on_github_summary: true
```
