# Git and Github

Contributing to Betaflight involves preparing your development environment and making a fork of the repository and working with Git. This document gives some instructions how to handle Git.

Look in [development/building](/docs/category/building) for installation notes for your environment.

Please contribute to this article to help others make git easier to use.

## Clone your fork to your development machine.

First make a fork of the repository you want to work on from the github website.

```bash
git clone https://github.com/yourname/betaflight.git
```

## Global configuration

Please configure this to have the correct author in your commits

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.domain"
```

If you omit to configure this you get a warning and have to use the following commands to rectify:

```bash
git config --global --edit
git commit --amend --reset-author
```

## Recommended git global environment:

# Windows:

```bash
git config --global core.autocrlf true
```

# Linux/OSX:

```bash
git config --global core.autocrlf input
```

# Cross-platform:

```bash
git config --global core.safecrlf warn
git config --global core.whitespace cr-at-eol
git config --global core.filemode false
git config --global help.autocorrect true
```

## Setup remotes

```bash
git remote add upstream https://github.com/betaflight/betaflight.git
git remote -v
```

## Create a branch and start making changes

```bash
git checkout -b branch
```

## Stage files for commit

Commit your changes after making initial changes:

```bash
git add .
git commit -m "message"
git push origin branch
```

Note: `git commit -am` or specify the files.

## Make more changes and commit on top of last commit

```bash
git commit --amend
git push origin +branch
```

## Update master branch with upstream updates and update your fork

```bash
git checkout master
git pull --rebase upstream master
git push origin +master
```

## Update your local branch with upstream changes

```bash
git checkout branch
git branch --set-upstream-to=upstream/master branch
git pull --rebase
```

or

```bash
git pull upstream master
git rebase -i master
```

If you look at `git reflog --oneline` you will see these lines:

```bash
shacode HEAD@{0}: rebase (finish): returning to refs/head/branch
shacode HEAD@{1}: rebase (pick): your branch commit description
shacode (upstream/master, origin/master, origin/HEAD, master) HEAD@{2}: rebase (start): checkout longsha
```

## Unstage file from working area

```bash
git restore --staged \<file> to unstage a file from working area.
```

or

```bash
git checkout --\<filename>
```

## Recover from unwanted commit without push

```bash
git reset HEAD^
```

## If you want to completely remove the unstaged changes run

```bash
git reset --hard HEAD
```

## Unwanted commits in your latest push.

First try:

```bash
git rebase -i origin/branch~2 branch
git push origin +branch
```

If this fails, backup your changed files (maybe also could use git stash)

```bash
git reset HEAD~ --hard
git checkout branch
```

And restore your saved files (or use git stash pop)

```bash
git add .
git commit -m "Make new commit"
git push origin +branch
```

## Update submodules (config)

When working on firmware sometimes we need to reset the config submodule to match the master branch as it should not be included in any PR.

```bash
git checkout origin/master -- src/config
git submodule update src/config
git commit -m "Reset src/config submodule pointer"
```

## See general changes

```bash
git diff
```

## See changes in particular file

```bash
git log -- src/main/cms/cms` .c
```

## Checkout work on another machine

```bash
git checkout origin/branch
git switch -c branch
```

## Quickly testing a PR

```bash
git fetch upstream pull/2500/head:2500
git checkout 2500
```

## Squash your commits

From the project folder you can use something like: https://www.scraggo.com/how-to-squash-commits.
Note the number of commits in your PR.

```bash
git rebase -i HEAD~17
```

- You should see a list of commits, each commit starting with the word “pick”.
- Make sure the topmost, first commit says “pick” and change the rest below from “pick” to “squash”. This will squash each commit into the previous commit, which will continue until every commit is squashed into the first commit.
- Save and close the editor.
- It will give you the opportunity to change the commit message. What you see is a single message containing all of the commit messages. Edit these as you wish.
- Save and close the editor again.
- Important: If you’ve already pushed commits to origin, and then squash them locally, you will have to force the push to your branch.

Finally update with:

```bash
git push origin +branch
```

## Commit to a PR from another contributor

Sometimes you want to make changes to an existing PR.
Before doing so please ask permission from the contributor.
In the example please substitute the contributor, betaflight_project and branch:

```bash
git remote add contributor https://github.com/contributor/betaflight_project.git
git remote -v
git fetch contributor
git switch branch
```

The original author now can pull the changes to the local branch with:

```bash
git fetch origin branch:branch --update-head-ok
```

Now you can make more changes and commit again. (This should just work with git pull - have to check this)

# Advanced

## How to sign your commits with PGP

See https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/generating-a-new-gpg-key

When using commit just add the -S flag to verify the commit and enter the passphrase you have chosen before.

## Bisection

Do bisection:

```bash
git bisect reset
git bisect start
git checkout 4.1.1
```

Build and make sure it works

```bash
git bisect good
git checkout 4.1.2
```

Build and make sure it fails

```bash
git bisect bad
```

Then git will automatically bisects commits between the two versions, checks out a new bisecting commit.
You will build and test it, and tell git if the commit was good or bad.

# Development branches

When working on multiple development branches, if your local repo is ahead of master, a new PR will include these commits. To resolve this issue:

## Solution

```bash
git fetch upstream
git checkout branch
git rebase -i upstream/master
```

In the editor, delete all commits not part of the PR and save the file.

```bash
git push origin branch --force-with-lease
```

## Workflow for future PRs

To prevent this issue in future PRs:

```bash
# Always create new feature branches from upstream master, not your local master
git fetch upstream
git checkout -b new-feature-branch upstream/master

# Make your changes...
git add .
git commit -m "Your changes"

# Push to your fork
git push origin new-feature-branch
```

## Alternative approach if you want to keep your local master in sync:

```bash
# Update your local master to match upstream
git checkout master
git fetch upstream
git reset --hard upstream/master
git push origin master --force-with-lease

# Now create feature branches from your synced local master
git checkout -b new-feature master
```

## Links

[https://devconnected.com/how-to-remove-files-from-git-commit/](https://devconnected.com/how-to-remove-files-from-git-commit/)
