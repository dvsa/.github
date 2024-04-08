# markdown-linter

Action to provide ability to scan markdown files to conform to layout rules

#### Prerequisites

json format file of the required markdown layout. [Configuration](https://github.com/igorshubovych/markdownlint-cli#configuration).
.markdownlintignore file so that files can be ignored. [markdownlintignore](https://github.com/igorshubovych/markdownlint-cli#ignoring-files)

#### Context

This action allows the workflow to scan all the .md files in the repo and check them against the defined layout rules.

#### Inputs

- file: provide the ability to scan one specific file (including path)
- rules: path and file name of the layout rules
- hidden-file: provides the ability to scan hidden files and folder e.g. .github

#### Outputs

N/A

#### Usage

```yaml
  - name: mdlint
    uses: dvsa/mot-trade-api-terraform/.github/workflows/markdown-linter.yml@feature/bl-15189-markdown-linter
    with:
      rules: markdownlint-rules.json
      hidden-files: true
```
