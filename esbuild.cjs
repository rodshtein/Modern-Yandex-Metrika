const esbuild = require('esbuild');
const config = require('./package.json');

(async () => {
  await esbuild.build({
    entryPoints: ['src/index.js'],
    outfile: config.module,
    format: 'esm',
    bundle: true,
    minify: true,
    logLevel: 'debug',
  });


  await esbuild.build({
    entryPoints: ['src/index.js'],
    outfile: config.main,
    format: 'cjs',
    bundle: true,
    minify: true,
    logLevel: 'debug',
  });
})()