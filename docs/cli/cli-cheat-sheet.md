# CLI Cheatsheet

## mkdir
- `mkdir folder` -> creates folder
- `mkdir -p folder ` -> `-p` (means parents) flag will create folders recursively, and won't throw errors if already existant, if not present will throw error `mkdir: cannot create directory ‘projeto’: File exists`
- Linux/macOS -> works the same
- Windows CMD -> `mkdir` works, and is already recursive, does not needs `-p` flag
- PowerSheel -> `mkdir` is alias for `New-Item -ItemType Directory`

## echo
- Prints text on terminal
- `echo $VARIABLE` will print