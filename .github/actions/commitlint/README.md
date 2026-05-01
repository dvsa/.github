# commitlint

Internal composite action that validates input against Conventional Commits.

## Inputs

- `input` (required): Input to validate.
- `node-version` (optional): Node.js version used for execution. Defaults to `latest`.

## Example

```yaml
jobs:
  check-pr-title:
    runs-on: ubuntu-latest
    steps:
      - uses: dvsa/.github/.github/actions/commitlint@v5
        with:
          input: ${{ github.event.pull_request.title }}
```

