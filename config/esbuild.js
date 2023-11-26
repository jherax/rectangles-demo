const {build} = require('esbuild');
const {Generator} = require('npm-dts');
const {dependencies, devDependencies} = require('../package.json');

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate();

/**
 * esbuild
 * @see https://janessagarrow.com/blog/typescript-and-esbuild/
 * @see https://esbuild.github.io/content-types/#tsconfig-json
 *
 * tsconfig and node
 * @see https://stackoverflow.com/a/67371788/2247494
 */

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  drop: ['debugger'],
  tsconfig: 'config/tsconfig.build.json',
  external: Object.keys(dependencies).concat(Object.keys(devDependencies)),
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: 'dist/index.js',
});

build({
  ...sharedConfig,
  platform: 'node', // for ESM
  format: 'esm',
  outfile: 'dist/index.esm.mjs',
});
