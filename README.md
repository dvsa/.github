# .github
Driver and Vehicle Standards Agency  Shared resources for all teams.

## NodeJS Workflows

The following workflows for NodeJS are in the `workflows` directory:

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

## Coming soon

- Upload to s3
- Starter workflows
