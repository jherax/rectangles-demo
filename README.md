# Demo Analyzing Rectangles

## Environment

This aplication is created using Node.js v18. It is recommended using
**[nvm](https://github.com/creationix/nvm)** (Node Version Manager) to manage
Node.js versions. Go to https://github.com/creationix/nvm and check the
installation process for your OS.

Make sure to set the env variables. For local environment you can create a
`.env` file with the following environment variables:

```bash
APP_HOST=localhost
APP_PORT=3004
```

After cloning the repository
[rectangles-demo](https://github.com/jherax/rectangles-demo.git) you must
install the dependencies by running in the terminal:

```bash
npm install
```

### VS Code Extensions

It is recommended to install de suggested VS Code extensions suggested in the
file `.vscode/extensions.json`.

To test the API, you can use the
[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
extension, which allows you to send HTTP request and view the response in VS
Code.

Files with the extension `".http"` are recognized by REST Client. In roder to
send a HTTP request, just select the query, then press `F1`, and select:

- **Rest Client: Send Request**

## Running the server

After all dependencies are installed, just run the command:

```bash
npm run dev-server
```

## Testing

To run all unit tests, just run the following command:

```bash
npm run test
```

## Build

To build in production mode, just run the following command:

```bash
npm run build-all
```

---

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
