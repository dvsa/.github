# .github

Driver and Vehicle Standards Agency - Shared resources for all teams.

## Versions

Currently on Version 3.1.0

```yaml
    uses: dvsa/.github/.github/workflows/nodejs-test.yaml@v3.1.0
```

If using the first version of the workflows, specify v1.0.0.

## Starter Workflow

Starter workflows are in the [workflow-templates](workflow-templates/ci.yaml) directory.

The workflow expects a Snyk token to be available. You may need to contact the organisation administrators to enable this.

Uploading to an s3 bucket requires AWS permissions and the relevant token to be stored in the repository environment secrets. See [here](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) for creating environments and adding secrets.

Publishing to NPM requires permissions and the relevant token to be stored in the repository environment secrets. See [here](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages) for more information about publishing Node.JS packages with Github Actions. When creating your token at npmjs.com, you must ensure it is created as an 'Automation' token - 'Publish' tokens require 2FA which is not suitable for automation.

## The NodeJS `ci.yaml` workflow has the following steps:

1. Lint
    - optional argument:
        - `max-warnings`: Sets how many warnings are allowed. Default is `0`.
        - `node-version`: Defines the version of NodeJS is used for actions/install-deps. Default is `18.x`.
        - `npm-version`: Defines the version of NPM that is used for actions/install-deps. Default is `latest`.
1. Test
    - optional argument:
        - `test-command`: Sets the command used during the Test step. Default is `npm run test`.
        - `node-version`: Defines the version of NodeJS is used for actions/install-deps. Default is `18.x`.
        - `npm-version`: Defines the version of NPM that is used for actions/install-deps. Default is `latest`.
1. Security
    - required secret `SNYK_TOKEN` requires the organization or repo Snyk token secret
    - optional argument `args` allows passing in any extra args to the Snyk command. Note, the default behavior is to test all projects including all dev dependencies. If you don't want to test dev dependencies, pass in args: `--all-projects` to override the default args.
1. Build
    - required arguments:
        - `artifact-name`: The name of the archive to store.
    - optional arguments:
        - `upload-artifact`: If true the build archive will be stored in github. Defaults to `false` if the archive doesn't need to be saved. Must be true if upload to s3 is required.
        - `build-folder`: The location of the build file. This is usually configured in the package.json or webpack config. Defaults to `dist`.
        - `build-folder-path`: If only a subset of directories want to be saved provide the path to those files. For example `dist/artifact`. Defaults to `dist`.
        - `retention-days`: How many days to save the archive for if it's stored. (upload-artifact: `true`). Default is `7` days.
        - `build-command`: The command to run to build the project. Defaults to `npm run package`.
        - `node-version`: Defines the version of NodeJS is used for actions/install-deps. Default is `18.x`.
        - `npm-version`: Defines the version of NPM that is used for actions/install-deps. Default is `latest`.
1. Upload to s3

    Workflow downloads the archive created from the build workflow and pushes it to s3 with the commit id as a tag. Default only running on master branch. See examples before for more information.

    - required arguments:
        - `environment`: This is used for ensuring the correct secrets are being used.
        - `short-commit`: The short commit ID of the related commit, which is tagged to the object in S3.
        - `artifact`: The name of the archive from the build step. For example, `package.zip`.
        - `bucket-key`: The file name and path in s3 where the object should be uploaded to. See [s3 docs](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object.html).
    - optional arguments:
        - `build-folder`: The name of the folder where the archive zip is located. For example `dist`. This is used to download the archive that was uploaded during the build step. Defaults to `dist`.
        - `optional-tags`: Additional tags to be applied to the object. These must be in URL query form, for example `Key1=Value1`. Multiple tags MUST be joined with an &, for example `Key1=Value1&Key2=Value2`. See put-object tagging [documentation](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object.html) for more information.
    - secrets:
        - `AWS_ACCOUNT`: the account number for the aws environment the archive is to be uploaded to.
        - `AWS_REGION`: the account region for the aws environment the archive is to be upgraded to. It's easier to maintain if this is only set in one place.
        - `BUCKET_NAME`: The name of the bucket the archive is being uploaded to.
        - `AWS_ROLE_TO_ASSUME_ARN`: The ARN for the role assume when uploading the archive to S3.
1. Update Lambda Function Code

    Workflow to update the Lambda on AWS to use the newly updated code from S3.

    - required arguments:
        - `environment`: This is used for ensuring the correct secrets are being used.
        - `lambda-function-name`: The name of the Lambda function to update.
        - `bucket-key`: The file name and path in s3 where the object should be uploaded to. See [s3 docs](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object.html).
    - secrets:
        - `AWS_ACCOUNT`: the account number for the aws environment the archive is to be uploaded to.
        - `AWS_REGION`: the account region for the aws environment the archive is to be upgraded to. It's easier to maintain if this is only set in one place.
        - `BUCKET_NAME`: The name of the bucket the archive is being uploaded to.

To read more about sharing workflows within the organization, see the [GitHub docs](https://docs.github.com/en/actions/using-workflows/sharing-workflows-secrets-and-runners-with-your-organization).

To read about using Starter Workflows, see [here](https://docs.github.com/en/actions/using-workflows/using-starter-workflows).

## The NodeJS `npm-publish.yaml` has the following steps:

1. Publish
    - optional arguments:
        - `node-version`: The version of Node the package is to be published with. This is defaulted to the latest version of NodeJS 18.
        - `download-artifact`: Optional boolean value, to be used when building package separately prior to publishing.
        - `build-folder`: The folder to download the built package from.
        - `build-folder-path`: The path of the folder to download the built package to.
        - `args`: optional arguments for the npm publish command, such as --dry-run or --access=public.
    - secrets:
        - `NPM_AUTH_TOKEN`: the authorisation token to be used to publish the package to the NPMJS site. 

## Examples

### Uploading to s3

If you want to include other branches, here's an example:

```YAML
if: startsWith( github.ref, 'refs/heads/feature/') || startsWith( github.ref, 'refs/heads/fix/') || ${{ github.ref_name == 'main' }}
```

### Uploading a single archive

On branch `feature/new-frontend`, the `dist.zip` is to be uploaded to the directory `backend` with the name `feature-new-frontend.zip` in the `nonprod` s3 bucket.

A folder structure that outputs the dist.zip built file:

```
project
|- src
|- test
|- dist
    |- dist.zip
```

The build and upload-to-s3 steps would look like the following:

```YAML
  build:
    uses: dvsa/.github/.github/workflows/nodejs-build.yaml@v2
    with:
      upload_artifact: true
      build_command: build:prod

  upload-to-s3:
    uses: dvsa/.github/.github/workflows/upload-to-s3.yaml@v2
    with:
      environment: nonprod
      short_commit: ${{  needs.build-names.outputs.short_sha }}
      artifact: dist.zip
      bucket_key: backend/functionName/${{ needs.build-names.outputs.pretty_branch_name }}.zip
    permissions:
      id-token: write
    secrets:
      AWS_ACCOUNT: ${{ secrets.AWS_ACCOUNT }}
      AWS_REGION: ${{ secrets.AWS_REGION }}
      BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
```

The output `build-names.outputs.pretty_branch_name` is resolved from the branch name, giving the output `feature-new-frontend`. In the s3 bucket, the object has been uploaded to the specified location: `backend/functionName/feature-new-frontend.zip`.

### With nested directories

On branch `feature/new-frontend`, the `dist.zip` is located within `build/artifacts/` and the contents of `dist` should not all be saved.

A folder structure that outputs the dist.zip built file:

```
project
|- src
|- test
|- build
|   |- artifacts
|       |- dist.zip
```

The build and upload-to-s3 steps would have the following inputs:

```YAML
  build:
    uses: dvsa/.github/.github/workflows/nodejs-build.yaml@v2.3
    with:
      upload_artifact: true
      build_folder: build
      build_folder_path: build/artifacts
      build_command: build:prod

  upload-to-s3:
    uses: dvsa/.github/.github/workflows/upload-to-s3.yaml@v2.3
    with:
      environment: dev
      short_commit: ${{ needs.build-names.outputs.short_sha }}
      artifact: dist.zip
      build_folder: build
      bucket_key: functionName/${{ needs.build-names.outputs.pretty_branch_name }}.zip
    permissions:
      id-token: write
    secrets:
      AWS_ACCOUNT: ${{ secrets.AWS_ACCOUNT }}
      AWS_REGION: ${{ secrets.AWS_REGION }}
      BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
```

In the s3 bucket, the file `build/artifacts/dist.zip` has been uploaded to the specified location: `backend/functionName/feature-new-frontend.zip`.

### Uploading a multiple archives using a matrix

On branch `feature/new-frontend`, multiple lambda archvies are generated from the build command and need to be uploaded to the directory `backend/<lambda-name>` with the name `feature-new-frontend.zip` in the `nonprod` s3 bucket.

A folder structure that outputs the following zip built files:

```
project
|- src
|- test
|- dist
    |- lambdaA.zip
    |- lambdaB.zip
```

The upload-to-s3 action with a matrix strategy defined:

```YAML
  upload-to-s3:
    uses: dvsa/.github/.github/workflows/upload-to-s3.yaml@v2.3
    strategy:
      matrix:
        buildName: [
            lambdaA,
            lambdaB
        ]
    with:
      environment: nonprod
      short_commit: ${{  needs.build-names.outputs.short_sha }}
      artifact: ${{ matrix.buildName }}.zip
      bucket_key: backend/${{ matrix.buildName }}/${{ needs.build-names.outputs.pretty_branch_name }}.zip
    permissions:
      id-token: write
    secrets:
      AWS_ACCOUNT: ${{ secrets.AWS_ACCOUNT }}
      AWS_REGION: ${{ secrets.AWS_REGION }}
      BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
```

In the s3 bucket, the objects have been uploaded to the specified location: `backend/lambdaA/feature-new-frontend.zip` and `backend/lambdaB/feature-new-frontend.zip`.
