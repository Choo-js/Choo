# Contributing

This project is under the MIT license, and we are always looking for collaborators! Please open a PR or an issue if you see something you want added.

## Package managers

We would prefer you use `pnpm` as a package manager, so we don't have to deal with `package-lock.json` or `yarn.lock` files.

## Workflows

If you want to submit a workflow, you may, but it will be inspected before it is run or merged, to make sure you don't leak any secure tokens or anything.

## Code style

Before you submit a PR for review, please run `pnpm fmt` to format code.

## Linting

Before a PR is submitted for review or merged, please run `pnpm lint` to check for errors, and if there are errors, please fix them.

## Commits

We really couldn't care less about squashing commits. If the file size in commits is large, however, (like over 20mb or if you have to use git LFS) please squash your commits before merging.
