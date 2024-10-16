# Get app version
Action to retrieve the version of an app based on git commits and tags.

#### Prerequisites
N/A

#### Context
The action determines the version of the application by using git commit history and tags. It retrieves the latest commit in the project path, checks if there is a release tag associated with that commit, and formats the version string accordingly. If a tag exists, the version is based on the tag; otherwise, it uses the abbreviated commit hash.

#### Inputs
| Name          | Description                             | Required | Default |
|---------------|-----------------------------------------|----------|---------|
| `project-path`| The root path of the app project         | `true`   | N/A     |
| `ref`         | The commit reference to use as a starting point for the version | `true`   | `"HEAD"` |

#### Outputs
| Name     | Description          |
|----------|----------------------|
| `version`| The app version       |

#### Usage
```yaml
- name: Get app version
  uses: dvsa/.github/actions/get-vol-app-version@version
  with:
    project-path: './path-to-app'
    ref: 'main'
