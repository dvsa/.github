# .github
Driver and Vehicle Standards Agency  Shared resources for all teams.

## NodeJS Workflows

The following workflows for NodeJS are in the `workflows` directory

## Starter Workflow

Starter workflows are in the [workflow-templates](workflow-templates/ci.yaml) directory.

The `ci.yaml` workflow has the following steps:

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
        - build-command. What npm command is ran to build the project. Defaults to `package`.
1. Upload to s3
    Workflow downloads the archive created from the build workflow and pushes it to s3 with the commit id as a tag
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
