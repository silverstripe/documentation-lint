# Documentation lint

An abstraction around various documentation linters to make linting markdown documentation easy.

> [!WARNING]
> This repository is intended for use by commercially supported Silverstripe CMS modules. Its linting rules are opinionated and may include rules which are specific to the documentation style and syntax used by those modules.

## Installation

Add this package as a dev dependency

```bash
composer require --dev silverstripe/documentation-lint
```

You'll also need to allow the `dealerdirect/phpcodesniffer-composer-installer` plugin in the repository (this won't affect downstream users) so that the slevomat PHP linting rules are pulled in correctly.

```json
{
    // ...
    "config": {
        "allow-plugins": {
            "dealerdirect/phpcodesniffer-composer-installer": true
        }
    }
}
```

## Setup

### Required software

You need `nvm` (or `node` installed with the right version - see `.nvmrc`) and `yarn` installed.

> [!WARNING]
> If you're using a shell other than bash (e.g. zsh) you'll need to set your node version before running the linting script, since your `nvm` installation is probably not set up in a way that it can be used in bash.

You also need `getopt` (enhanced) installed - which you probably do but the script will let you know if you don't.

### Setup in the repository

You must add a `.doclintrc` file to the root of the repository which has markdown documentation you want linted. This file must contain a relative path to the directory which holds your documentation, and that path must end with a `/`.

For example:
```text
docs/en/
```

> [!WARNING]
> Only the first line of the file will be used.

## Usage

Simply run the command. By default it will assume you're running it from the directory that holds the `.doclintrc` file and that you want to lint markdown, php, and javascript within `.md` files.

```bash
vendor/bin/doclint
```

To lint for a specific module (e.g. if you have multiple modules installed) you can pass the relative path to the folder containing the `.doclintrc` file.

```bash
vendor/bin/doclint vendor/silverstripe/developer-docs
```

If you want to specifically only lint one of markdown syntax, PHP codeblocks, or JavaScript codeblocks, use the [appropriate flag(s)](#flags).

```bash
vendor/bin/doclint -jp
# or
vendor/bin/doclint --with-js --with-php
```

To automatically fix any problems that can be automatically fixed, pass the `--fix` flag.

```bash
vendor/bin/doclint -f
# or
vendor/bin/doclint --fix
```

### Flags

The following flags can be used with the `doclint` script:

|long name|short name|description|
|---|---|---|
|`--fix`|`-f`|Fix any automatically fixable problems|
|`--with-md`|`-m`|Lint markdown syntax|
|`--with-js`|`-j`|Lint JavaScript code blocks|
|`--with-php`|`-p`|Lint PHP code blocks|

If any language flag is passed, only the languages that are passed will be linted (or fixed if `--fix` is passed). If no language flags are passed, all languages will be linted.
