# PNPM

## Knowledge
- Alternative to npm/yarn
- Faster, more efficient on disk usage
- Downloads a single copy of each dependency version, saving it on a global store, usually `~/.pnpm-store` (root of the os, not of the project)
- Instead of saving complete copies on `node_modules` of each project
- Then, at `node_modules` there will be only symbolic links that point to this store
- Eg: 
```
~/.pnpm-store/v3/
   react@18.3.0/
   lodash@4.17.21/

meu-projeto/
   node_modules/
      react -> link para ~/.pnpm-store/v3/react@18.3.0
      lodash -> link para ~/.pnpm-store/v3/lodash@4.17.21
```
- Then, at the build nothing changes, as the bundler sees `node_modules` the same way, resolving it's imports
- So in Yarn/NPM if i have 10 projects using react, 10 times react will be downloaded, where as in PNPM it will only be downloaded one time, saved in `~/.pnpm/store` and then on each project they will link it to the reacy file on the store

## Install
- Using NPM: `npm install -g pnpm`
- Using corepack
  - node 16.13+ already have corepack installed 
  - corepack is an official node utilitary to manage yarn and pnpm
  - `corepack enable` then `corepack prepare pnpm@latest --activate`
- Check installation with `pnpm -v`

## Starting on the project
- Commands
   `pnpm init -y`
   `pnpm add <package_name>`
   `pnpm add -D <package_name>` to add as dev dependency


## File system
- How PNPM works
```less
~/.pnpm-store/               (store global)
 ├─ react@18.3.0/            (pacote real)
 ├─ react-dom@18.3.0/
 └─ lodash@4.17.21/

meu-projeto/
 ├─ node_modules/
 │   ├─ .pnpm/
 │   │    ├─ react@18.3.0/ ──┐
 │   │    └─ lodash@4.17.21/ │   (HARDLINKS → apontam pros arquivos reais no store)
 │   │                       │
 │   ├─ react  ──────────────┘   (SYMLINK → aponta para .pnpm/react@18.3.0)
 │   ├─ lodash ───────────────── (SYMLINK → aponta para .pnpm/lodash@4.17.21)
 │   └─ react-dom ...
 └─ package.json
```

- Just to compare, how NPM / Yarn works
```less
meu-projeto/
 ├─ node_modules/
 │   ├─ react/          (cópia completa)
 │   ├─ react-dom/      (cópia completa)
 │   └─ lodash/         (cópia completa)
 └─ package.json
```

## Commands
- `pnpx` or `pnpm dlx`: searches a package from the registry withotu installing it as a dependency, npx stands for "node package eXecutor", allowing packages to ben run without having to permanently install them globally