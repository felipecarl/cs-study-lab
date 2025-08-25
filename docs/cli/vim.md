# VIM (text editor)

**Important**: cursor in this scope is the **text cursor**, the pipe bar that blinks whilw writing a text

## Knowledge
- vim is a text editor based on **modes**
- By default opens in command mode

## Modes
- Normal mode: browsing and running commands (default mode)
- Insert mode: edits text
- Visual mode: select text
- Command-line mode: runs commands starting with `:`

## Editing
- `i` -> switches to insert mode before the cursor
- `a` -> same, after the cursor
- `o` -> new line and switches to insert mode
- `Esc` -> go backto normal model

## Save / Exit
- `:w` -> save (write)
- `:q` -> exit (quit)
- `:wq` or `ZZ` -> save + quit
- `:q!` -> force exit (quit w/ saving)

## Browsing
- `h` -> left
- `l` -> right
- `j` -> down
- `k` -> up
- `0` -> line start
- `$` -> line end
- `gg` -> file beginning
- `G` -> file ending

## Searching
- `/text` -> search "text" forward
- `?text` -> search "text" backwards
- `n`-> repeat search forward (goes to next ocurrence after a search has been done)
- `N` -> repeat search backwards (goes to the last -backwards- occurence after a search has been done)

## Fast edit
- `x` → erases char under the cursor
- `dd` → erases the whole line
- `yy` → copies (yank) the whole line
- `p` → paste after the cursor/line
- `u` → undo last action
- `Ctrl + r` → redo last action

## Useful tips
- `Esc` always returns to normal mode
- If locked, use `:qa!` to close everything without saving!