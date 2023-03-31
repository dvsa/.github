# AWS WAF Access
Action to provide ability access to WAF for performance tests

####  Prerequisites
Authenticated with AWS Account

####  Context
This action allows the workflow to update AWS WAF IP Set.

####  Inputs
ip_set_name: (required): Name of IP Set to be Updated.
rule_action (required): Action to Insert or Delete Action

####  Outputs
N/A

####  Usage     
```yaml
- name: Allow WAF Access
  uses: dvsa/.github/.github/actions/aws-waf-access@main
  with:
    ip_set_name: dev-mot-waf-ipset
    rule_action: INSERT
```