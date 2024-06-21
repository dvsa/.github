# Java Configuration
Action to install java in workflow

####  Prerequisites
N/A

####  Context
This action allows the workflow to install Java.

####  Inputs
java-version (optional, Default:17): Version of Java to install.

####  Outputs
N/A

####  Usage     
```yaml
- name: Java Setup
  uses: dvsa/.github/.github/actions/java-config@v4.0.2
  with:
    java-version: 17
```