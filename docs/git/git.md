# git

## Knowledge
- git is a DVCS built by Linus Torvalds in 2005
- VCS stands for Version Control System
- And the "D" stands for Distribuited
- VCS Benefits
  - Keeps track of changes (commits)
  - Allows teams to cooperate without overwriting files
  - Allows going back in time, by checking out older commits
  - Allows branches to develop new features and later integrate
- Distribuited VCS Benefits over Centralized
  - Each one has the full repository
  - Works offline 
- Github, Gitlab, Bitbucket are examples of Git Hosts

## What is a remote
- Each repository can have 0 or more remotes
- They are basically a URL pointing to another git repository
- That are usually pointing to a "central/master" repository
- They can be pointing to a host like github, or maybe a private server, or even a local folder
- Example of command line: `git remote add origin git@gitlab.com:user/projeto.git`
  - `git remote add <alias> <url>`
  - in this case, `origin` will be an alias to the URL
  - the first remote is usually called `origin`

## Fetch vs Push (Remotes)
- Fetch is where the code is downloaded from, `git fetch` or `git pull`
- Push is where the code is sent to/uploaded, `git push`

## Origin vs Upstream
- origin by convention is the default name for the original remote
- but when a repo is forked, origin becames your fork remote, and the original creator remote is set as upstream