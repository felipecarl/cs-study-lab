# git Cheat Sheet

## checking ssh key
- `ls -al ~/.ssh` checks if ssh folder has ssh keys
- `ssh-add -l` checks if ssh agent is active and knows the key
- `ssh -T git@github.com` checks if github knows the key

## creating a repo from the cli
- `brew install gh` installs git hub cli
- `gh auth login` logins onto github
- `gh repo create` starts repo creation process
- OR, use one liner `gh repo create felipe/my-node-app --public --source=. --remote=origin --push`


## rev-parse
- `git rev-parse --is-inside-work-tree`
  - if true, is a git repo

## status
- `git status`
  - if on a repo, shows current branch and changes

## remote
- `git remote -v`
  - Lists all remotes configured on local repository
  - `-v` stands for verbose, will show both fetch and push URL
  - If nothing is returned, repo is not attached to a remote
- `git remote add origin git@github.com:user/repo.git`
  - replace "user" and "repo"
  - sets the remote to the specified

## stash
- `git stash`
  -  will save all the current changes on a **stash stack**
- `git stash push -m "WIP: git study"`
  - `-m <message>` used to set a message for the stash
  - `push` git stash and git stash push are the same
- `git stash list`
  - will list all the stashes
- `git stash apply stash@{0}`
  - applies latest stash without erasing it
- `git stash pop stash@{0}`
  - applies latest stash and erases it
- `git stash drop stash@{0}`
  - erases stash without applying
- `git stash clear`
  - erases all stashes
- `stash@{N}` N is the index, where 0 is the latest, 1 is the second last and so on

## rebase
- 