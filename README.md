# .github
Driver and Vehicle Standards Agency  Shared resources for all teams.

## Starter Workflow

Starter workflows are in the [workflow-templates](workflow-templates/ci.yaml) directory.

The workflow expects a Snyk token to be available. You may need to contact the organisation administrators to enable this.

Uploading to an s3 bucket requires AWS permissions and the relevant token to be stored in the repository environment secrets. See [here](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) for creating environments and adding secrets.

## The NodeJS `ci.yaml` workflow has the following steps:

1. Lint
    - optional argument:
        - `max-warnings`: Sets how many warnings are allowed. Default is `0`.
1. Test
    - optional argument:
        - `test_command`: Sets the command used during the Test step. Default is `npm run test`.
1. Security

    The default behaviour of this step is to scan all projects and all dev dependencies. If you do not want to test all dev dependencies pass in args: `--all-projects` to override the default settings.
    - required secret:
        - `SNYK_TOKEN`: The token used during Snyk scanning. This requires access to the organization or repo snyk token secret.
    - optional argument:
        - `args`: Additional arguments to pass into the snyk command.
1. Build
    - required arguments:
        - `artifact-name`: The name of the archive to store.
    - optional arguments:
        - `upload-artifact`: If true the build archive will be stored in github. Defaults to `false` if the archive doesn't need to be saved.
        - `dist-folder`: The location of the build file. This is usually configured in the package.json
        - `retention-days`: How many days to save the archive for if it's stored (upload-artifact: `true`). Default is `7` days.
        - `build-command`: The npm command to run to build the project. Defaults to `package`.
1. Upload to s3

    Workflow downloads the archive created from the build workflow and pushes it to s3 with the commit id as a tag. Default only running on master branch. If you want to include other branches, here's an example:
    ```
    if: startsWith( github.ref, 'refs/heads/feature/') || startsWith( github.ref, 'refs/heads/fix/') || ${{ github.ref_name == 'main' }}
    ```
    - required arguments:
        - `environment`: This is used for ensuring the correct secrets are being used
        - `short_commit`: This is to tag the object with
        - `artifact-name`: The name of the archive to store. For example `<branch-name>-<lambda-name>.zip`
        - `dist_folder`: The location and name of the archive from the build step. For example, `package.zip`
    - required secrets:
        - `aws_account`: The account number of the AWS account containing the s3 bucket to upload the archive to.
        - `aws_region`: The AWS region containing the s3 bucket to upload the archive to. It's easier to maintain if this is only set in one place.
        - `bucket_name`: The name of the s3 bucket the archive is being uploaded to.
        - `bucket_path`: The s3 bucket path or key of where the archive is being uploaded. Example: `lambda-archives/<lambda-name>`

To read more about sharing workflows within the organization, see the [GitHub docs](https://docs.github.com/en/actions/using-workflows/sharing-workflows-secrets-and-runners-with-your-organization).

To read about using Starter Workflows, see [here](https://docs.github.com/en/actions/using-workflows/using-starter-workflows).
