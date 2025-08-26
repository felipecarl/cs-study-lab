# File system

## Symlink
- Like a shortcut, points to the real path of a file/folder
- If the original file is removed or moved, symlink breaks
- Eg: `ln -s /usr/local/lib/react real-react` (real-react is a shortcut to `/usr/local/lib/react`)
- The symlink will be a file with it's own inode, with the content being a string that is the path to the reffered file
  ```less
  symlink.txt ──> inode 200 (type: symlink, destiny="/home/user/a.txt")
                                │
                                ▼
  a.txt ──────────> inode 123 (type: normal file) ──> real data on disk
  ```

## Hardlink
  - "Stronger", as if the file had two different names/access points
  - Both point to same disc content
  - If one is deleted, the other remains working, content only disappears when all hardlinks are deleted
  - Eg: `ln /usr/local/lib/react react-copy` (react-copy and the original file are equal and share same files)
  ```less
  b.txt ───────┐
               │
  a.txt ───────┼─> inode 123 (type: normal file) ──> real data on disk
               │
  c.txt ───────┘
  ```

## Inode
- In Unix systems, the data of a file are store disk blocks
- **Inode** is a structure that saves metadata (permissions, owner, size, pointers to the blocks)
- The filename (eg: a.txt) is just a directory entry that points to this inode
- What i see is just a name, no the file itself, the data are in the inode
- Then a hardlink points to this same inode, like creating a new name
- Both names `a.txt` and `b.txt` are equivalent, there is no "main" and "copy"
- inode also keeps a link count, of how many "name" points to it
- When the link counter reaches 0, the system removes the data block