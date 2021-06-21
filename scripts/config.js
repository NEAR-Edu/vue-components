const path = require('path');
const typescript = require('rollup-plugin-typescript2');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');

const formatNameMap = {
  'vue-near-api-js': 'NearApiJs',
  // 'near-api-rpc': 'NearApiRpc',
};

const pkgNameMap = {
  'vue-near-api-js': 'vue-near-api-js',
  // 'near-api-rpc': 'near-api-rpc',
};

const formatMap = {
  es: 'esm',
  umd: '',
};

function createConfig(pkg, format) {
  const tsPlugin = typescript({
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    cacheRoot: path.resolve(__dirname, '../node_modules/.rts2_cache'),
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      exclude: ['**/tests'],
    },
  });

  const version = require(path.resolve(__dirname, `../packages/${pkg}/package.json`)).version;

  const config = {
    input: {
      input: path.resolve(__dirname, `../packages/${pkg}/src/index.ts`),
      external: ['vue', 'near-api-js'],
      plugins: [
        tsPlugin,
        resolve({
          dedupe: ['fast-deep-equal/es6', 'fast-deep-equal', 'klona', 'klona/lite'],
        }),
        commonjs(),
        json(),
        replace({ __VERSION__: version }),
      ],
    },
    output: {
      banner: `/**
  * near-api v${version}
  * (c) ${new Date().getFullYear()} Yegor Loginov
  * @license MIT
  */`,
      format,
      name: format === 'umd' ? formatNameMap[pkg] : undefined,
      globals: {
        vue: 'Vue',
      },
    },
  };

  config.bundleName = `${pkgNameMap[pkg]}${formatMap[format] ? '.' + formatMap[format] : ''}.js`;

  // if (options.env) {
  //   config.input.plugins.unshift(
  //     replace({
  //       'process.env.NODE_ENV': JSON.stringify(options.env)
  //     })
  //   );
  // }

  return config;
}

module.exports = {
  formatNameMap,
  pkgNameMap,
  formatMap,
  createConfig,
};
