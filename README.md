# .github
Driver and Vehicle Standards Agency  Shared resources for all teams.

## Starter Workflow

Starter workflows are in the [workflow-templates](workflow-templates/ci.yaml) directory.

The workflow expects a Snyk token to be available. You may need to contact the organisation administrators to enable this.

Uploading to an s3 bucket requires AWS permissions and the relevant token to be stored in the repository environment secrets. See [here](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) for creating environments and adding secrets.

## The NodeJS `ci.yaml` workflow has the following steps:

1. Lint
    - optional argument `max-warnings` sets how many warnings are allowed. Default is 0.
1. Test
    - optional argument `test_command` if the command to run isn't the default `npm run test`
1. Security
    - required secret `SNYK_TOKEN` requires the organization or repo snyk token secret
    - optional argument `args` allows passing in any extra args to the snyk command
1. Build
    - required arguments:
        - artifact-name. The name of the archive to store.
    - optional arguments:
        - upload-artifact. Defaults to false if the archive doesn't need to be saved
        - dist-folder. The location of the build file. This is usually configured in the package.json
        - retention-days. How many days to save the archive for if it's stored. Default 7 days.
        - build-command. The npm command to run to build the project. Defaults to `package`.
1. Upload to s3
    Workflow downloads the archive created from the build workflow and pushes it to s3 with the commit id as a tag. Default only running on master branch. If you want to include other branches, here's an example:
    ```
    if: startsWith( github.ref, 'refs/heads/feature/') || startsWith( github.ref, 'refs/heads/fix/') || ${{ github.ref_name == 'main' }}
    ```
    - required arguments:
        - environment. This is used for ensuring the correct secrets are being used
        - short_commit. This is to tag the object with
        - artifact-name. The name of the archive to store. For example `<branch-name>-<lambda-name>.zip`
        - dist_folder. The location and name of the archive from the build step. For example, `package.zip`
    - secrets:
        - aws_account: the account number for the aws environment the archive is to be uploaded to.
        - aws_region: the account region for the aws environment the archive is to be upgraded to. It's easier to maintain if this is only set in one place
        - bucket_name: The name of the bucket the archive is being uploaded to
        - bucket_path: The bucket path or key of where the archive is being uploaded. Example: `lambda-archives/<lambda-name>`

To read more about sharing workflows within the organization, see the [GitHub docs](https://docs.github.com/en/actions/using-workflows/sharing-workflows-secrets-and-runners-with-your-organization).

To read about using Starter Workflows, see [here](https://docs.github.com/en/actions/using-workflows/using-starter-workflows).
