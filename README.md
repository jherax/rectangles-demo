# Demo Analyzing Rectangles

## Environment

Make sure to set the env variables. For local environment you can create a
`.env` file with the following environment variables:

```bash
APP_HOST=localhost
APP_PORT=3004
```

## Running the server

Just run the command

```bash
npm run dev-server
```

## husky

Edit `package.json` > `prepare` script and run it once:

```bash
npm run prepare
```

See:
[conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint).

## standard-version

`standard-version` needs to have a starting point to append the CHANGELOG and
other versions to. Simply run:

```bash
npm run release -- --first-release
```

### Usage

For a new release, just run

```bash
npm run release
```

For more details, please visit the Github site
[standard-version](https://github.com/conventional-changelog/standard-version)
