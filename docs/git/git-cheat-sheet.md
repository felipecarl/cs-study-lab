# git Cheat Sheet

## remote
- `git remote -v`
  - Lists all remotes configured on local repository
  - `-v` stands for verbose, will show both fetch and push URL


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