import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs-extra';

const SERVE = process.env.SERVE === 'true';

const pkg = require('./package.json');

const libraryName = 'plugin';

export default {
  input: `src/${libraryName}.ts`,
  // Important! We need to have shared references to 'react' and '@khulnasoft.com/sdk'
  // for khulnasoft plugins to run properly
  // Do not change these! If you install new dependenies, that is ok, they should be
  // left out of this list
  external: [
    'react',
    '@khulnasoft.com/react',
    '@khulnasoft.com/app-context',
    '@material-ui/core',
    '@emotion/core',
    '@emotion/styled',
    'mobx',
    'react-dom',
    'mobx-react',
    'http',
  ],
  output: [{ file: pkg.unpkg, format: 'system', sourcemap: true }],
  watch: {
    include: 'src/**',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    json(),
    nodeResolve({ mainFields: ['module', 'browser'] }),
    commonjs(),
    esbuild(),

    ...(SERVE
      ? [
          serve({
            open: true,
            contentBase: 'dist',
            port: 1268,
            // https: {
            //   key: readFileSync('./cert/localhost.key'),
            //   cert: readFileSync('./cert/localhost.crt'),
            // },
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Private-Network': 'true',
            },
          }),
        ]
      : []),
  ],
};
