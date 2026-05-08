# Git and GitHub

Contributing to Betaflight involves preparing your development environment and making a fork of the repository and working with Git. This document gives some instructions on how to handle Git.

Look in [development/building](/docs/category/building) for installation notes for your environment.

## Getting Started

### Clone your fork to your development machine

First make a fork of the repository you want to work on from the GitHub website.

```bash
git clone https://github.com/<your-username>/betaflight.git
```

To clone a specific branch:

```bash
git clone -b <branch-name> https://github.com/<your-username>/betaflight.git
```

### SSH vs HTTPS

The examples in this guide use HTTPS URLs. If you prefer SSH (avoids entering credentials on each push), set up an SSH key by following [GitHub's SSH guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh), then use SSH URLs instead:

```bash
git clone git@github.com:<your-username>/betaflight.git
```

To switch an existing remote from HTTPS to SSH:

```bash
git remote set-url origin git@github.com:<your-username>/betaflight.git
```

### Configure your identity

Configure this to have the correct author in your commits:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.domain"
```

If you omit to configure this you get a warning and have to use the following commands to rectify:

```bash
git config --global --edit
git commit --amend --reset-author
```

### Recommended global configuration

#### Windows

```bash
git config --global core.autocrlf true
```

#### Linux/macOS

```bash
git config --global core.autocrlf input
```

#### Cross-platform

```bash
git config --global core.safecrlf warn
git config --global core.whitespace cr-at-eol
git config --global core.filemode false
```

### Set up remotes

```bash
git remote add upstream https://github.com/betaflight/betaflight.git
git remote -v
```

## Daily Workflow

### Create a branch and start making changes

Always create feature branches from upstream master, not your local master:

```bash
git fetch upstream
git checkout -b <branch-name> upstream/master
```

### Stage files and commit

```bash
git add .
git commit -m "message"
git push origin <branch-name>
```

Note: `git commit -am` stages and commits tracked files in one step, or you can specify individual files.

### Write good commit messages

A clear commit message helps reviewers and makes the project history useful. Follow these guidelines:

- Use the imperative mood in the subject line: "Add gyro filter" not "Added gyro filter"
- Keep the subject line under 72 characters
- Separate the subject from the body with a blank line
- Use the body to explain **what** and **why**, not how

Example:

```text
Add deadband support for RC channels

Without a deadband, small stick noise causes unnecessary PID updates.
This adds a configurable deadband threshold per channel.
```

### Amend your last commit

If you need to update your most recent commit (fix a typo, add a missed file), amend it instead of creating a new commit. Only do this before the PR is merged — amending rewrites the commit and requires a force push:

```bash
git commit --amend
git push origin <branch-name> --force-with-lease
```

`--force-with-lease` is a safer alternative to `--force`. It refuses to push if someone else has pushed to the branch since your last fetch, preventing you from accidentally overwriting their work.

### Stash work in progress

If you need to switch branches but aren't ready to commit:

```bash
git stash
```

To restore your stashed changes:

```bash
git stash pop
```

To see all stashes:

```bash
git stash list
```

## Building and Testing Before You Push

Always build and run unit tests locally before pushing your changes. This catches issues before CI does.

```bash
make TARGET=BETAFLIGHTF4  # Build for a specific target
make test                  # Run all unit tests
make junittest             # Run unit tests with JUnit output
```

After pulling upstream changes or switching branches, always clean before building to avoid stale object files:

```bash
make clean
make TARGET=BETAFLIGHTF4
```

See [Test Coverage](/docs/development/TestCoverage) for details on generating coverage reports.

## Keeping Up to Date

### Update master branch with upstream and sync your fork

```bash
git checkout master
git fetch upstream
git merge --ff-only upstream/master
git push origin master
```

If the merge fails because you have local commits on master, you can reset to match upstream exactly. **This will discard any local commits on master:**

```bash
git reset --hard upstream/master
git push origin master --force-with-lease
```

### Update your local branch with upstream changes

```bash
git checkout <branch-name>
git pull --rebase upstream master
```

### Update submodules (config)

When working on firmware sometimes we need to reset the config submodule to match the master branch as it should not be included in any PR.

```bash
git fetch upstream
git checkout upstream/master -- src/config
git submodule update src/config
git commit -m "Reset src/config submodule pointer"
```

### Working with the config repository

Board configurations live in a separate repository. If you're adding or updating a target, you'll need to work with both repos:

```bash
git clone https://github.com/<your-username>/config.git
cd config
git remote add upstream https://github.com/betaflight/config.git
```

Submit config changes as a separate PR to the config repo. Do not include config submodule changes in firmware PRs. See [Manufacturer Requirements](/docs/development/manufacturer/requirements-for-submission-of-targets) for full submission guidelines.

### Resolve merge conflicts

When rebasing or merging, you may encounter conflicts. Git adds conflict markers to the affected files — `<<<<<<< HEAD`, `=======`, and `>>>>>>> upstream/master` — separating your changes from the incoming changes.

To resolve:

1. Open the conflicting files and edit them to keep the correct code
2. Remove the conflict markers
3. Stage the resolved files:

```bash
git add <resolved-file>
```

4. Continue the rebase or merge:

```bash
git rebase --continue   # if rebasing
git merge --continue    # if merging
```

To abort and start over:

```bash
git rebase --abort
```

## Undoing Changes

### Unstage a file

```bash
git restore --staged <file>
```

### Discard changes to a specific file

This permanently discards uncommitted changes to a file:

```bash
git restore <file>
```

### Undo an unpushed commit (keep changes)

```bash
git reset HEAD^
```

### Discard all uncommitted changes to tracked files

```bash
git reset --hard HEAD
```

To also remove untracked files and directories (e.g., build artifacts). **This cannot be undone:**

```bash
git clean -fd
```

### Revert a commit

To undo a commit that has already been pushed by creating a new commit that reverses the changes:

```bash
git revert <commit-sha>
git push origin <branch-name>
```

This is safer than rewriting history on shared branches because it preserves the commit log.

### Remove unwanted commits from a pushed branch

Use interactive rebase to remove or edit specific commits:

```bash
git checkout <branch-name>
git rebase -i origin/<branch-name>~2
git push origin <branch-name> --force-with-lease
```

If this fails, back up your changed files (or use `git stash`), then reset and recommit:

```bash
git reset --hard HEAD~
git stash pop
git add .
git commit -m "Make new commit"
git push origin <branch-name> --force-with-lease
```

## Inspecting Changes

### See uncommitted changes

```bash
git diff              # Unstaged changes
git diff --staged     # Staged changes (ready to commit)
```

### See commit history for a file

```bash
git log -- src/main/cms/cms.c
```

### View a compact commit history

```bash
git log --oneline --graph --decorate
```

### See what changed in a specific commit

```bash
git show <commit-sha>
```

### Compare two branches

```bash
git diff master..<branch-name>
```

### Working with release tags

Betaflight uses version tags (e.g., `4.1.1`, `2025.12.0`) to mark releases. To list available tags:

```bash
git tag
```

To checkout a specific release (this puts you in detached HEAD state — safe for inspecting or building, but not for committing):

```bash
git checkout 2025.12.0
```

To create a branch from a tag if you intend to make changes:

```bash
git checkout -b <branch-name> 2025.12.0
```

To see which tag you're closest to:

```bash
git describe --tags
```

Tags are used with [bisection](#bisection) to narrow down which release introduced a bug.

## Working with Pull Requests

### Creating a pull request

Before creating a PR:

- **Never create a PR from your `master` branch** — PRs from master are automatically closed. Always use a feature branch.
- **Keep PRs focused** — each PR should address one thing only. Smaller PRs are easier to review and merge.
- **Rebase onto latest upstream** before opening the PR to avoid conflicts.
- **Run `make test`** to ensure unit tests pass.

Once your branch is pushed:

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Write a clear description of what the PR does and why
4. Reference any related issues (e.g., "Fixes #1234")

After the PR is created, GitHub Actions will automatically build your changes and report any errors. See [Development](/docs/development/development) for more details on the review process.

### Quickly testing a PR

To fetch and test someone else's PR locally:

```bash
git fetch upstream pull/<pr-number>/head:<pr-number>
git checkout <pr-number>
```

### Squash your commits

Note the number of commits in your PR, then run an interactive rebase:

```bash
git rebase -i HEAD~<number-of-commits>
```

- You should see a list of commits, each commit starting with the word "pick".
- Make sure the topmost, first commit says "pick" and change the rest below from "pick" to "squash". This will squash each commit into the previous commit, which will continue until every commit is squashed into the first commit.
- Save and close the editor.
- It will give you the opportunity to change the commit message. What you see is a single message containing all of the commit messages. Edit these as you wish.
- Save and close the editor again.
- Important: If you've already pushed commits to origin, and then squash them locally, you will have to force the push to your branch.

Finally update with:

```bash
git push origin <branch-name> --force-with-lease
```

### Commit to a PR from another contributor

Sometimes you want to make changes to an existing PR. Before doing so, ask permission from the contributor. The contributor must also have "Allow edits from maintainers" enabled on their PR.

In the example, substitute the contributor name, project, and branch:

```bash
git remote add <contributor> https://github.com/<contributor>/betaflight.git
git fetch <contributor>
git checkout -b <branch-name> <contributor>/<branch-name>
```

Make your changes, commit, and push back to their fork:

```bash
git push <contributor> <branch-name>
```

The original author can then pull the changes to their local branch with:

```bash
git pull origin <branch-name>
```

### Checkout work on another machine

If you have pushed a branch from one machine and want to continue working on it from a different clone:

```bash
git fetch origin
git checkout -b <branch-name> origin/<branch-name>
```

## Managing Development Branches

When working on multiple development branches, if your local repo is ahead of master, a new PR will include these commits. To resolve this issue:

### Fix an existing branch

```bash
git fetch upstream
git checkout <branch-name>
git rebase -i upstream/master
```

In the editor, delete all commits not part of the PR and save the file.

```bash
git push origin <branch-name> --force-with-lease
```

## Advanced

### Cherry-pick a commit

To apply a specific commit from another branch onto your current branch:

```bash
git cherry-pick <commit-sha>
```

This is useful when you need a specific bug fix from another branch without merging everything.

### Sign your commits with GPG

See [Managing commit signature verification](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/generating-a-new-gpg-key) on GitHub.

When using commit, add the `-S` flag to sign the commit and enter the passphrase you have chosen before.

### Bisection

Use `git bisect` to find the commit that introduced a bug:

```bash
git bisect start
git bisect bad 4.1.2
git bisect good 4.1.1
```

Git will automatically check out a commit halfway between the two versions. Build and test it, then tell git the result:

```bash
git bisect good  # if the bug is not present
git bisect bad   # if the bug is present
```

Repeat until git identifies the offending commit. When finished:

```bash
git bisect reset
```

### Useful Git aliases

Add these to your `~/.gitconfig` to speed up common operations:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    lg = log --oneline --graph --decorate --all
    unstage = restore --staged
    last = log -1 HEAD
    amend = commit --amend --no-edit
```

## See Also

- [Development Guide](/docs/development/development) — general contribution guidelines, PR process, and coding principles
- [Coding Style](/docs/development/CodingStyle) — code formatting requirements
- [Test Coverage](/docs/development/TestCoverage) — unit test and coverage details
- [Building](/docs/category/building) — setting up your build environment
