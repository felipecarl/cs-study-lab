# CLI

## CLI vs Shell
### CLI
- CLI means `command-line-interface`, is a concept
- It's an interface, interaction is done using commands not buttons, opposite to a GUI (graphic user interface)

### Shell
- Shell is the program/interpreter itself, eg (exempli gratia): bash, zsh, sh, fish, powershell

## Natives vs Shell Built-In
- Some commands are OS natives and others are shell built-in
- `ls | mkdir | grep` are examples of native macOS/Linux commands, they are binaries (compiled executables), written in C and compiled to machine code, they are stored on /bin folder, hence bin = binary, when ls command is used, the shell looks for the binary on $PATH and executes it
- Not all commands are binaries, `cd | alias | echo` are shell built in


## MacOS Default
- Can check the current cli with `echo $SHELL`
- MacOS default since macOS Catalina (10.15, 2019) is `zsh`

## Zsh
### Why use it?
- More modern than Mac default Bash (3.2)



## Infos
### Globbing?
- Globing is the process of expanding on wildcard chars like `*, ? and [...]`
- When typed `ls *.txt`, the 



