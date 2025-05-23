import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import regexReplace from 'rollup-plugin-re';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';

const pkg = require('./package.json');

const libraryName = 'khulnasoft-widgets';

const resolvePlugin = resolve();

const SERVE = process.env.SERVE === 'true';

const externalDependencies = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.optionalDependencies || {}))
  .concat(Object.keys(pkg.peerDependencies || {}))
  .filter(name => !name.startsWith('lodash'));

const options = {
  input: `src/${libraryName}.ts`,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  watch: {
    include: 'src/**',
  },
  external: ['vm2'],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      // TODO: remove me!
      check: false,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      exclude: ['node_modules/vm2/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'createRef',
          'Component',
          'createElement',
          'forwardRef',
          'Fragment',
          'useContext',
          'useState',
          'useEffect',
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef'],
        '../react/node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'createRef',
          'Component',
          'createElement',
          'forwardRef',
          'Fragment',
        ],
        '../react/node_modules/react-dom/index.js': ['render', 'hydrate'],
        '../react/node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef',
        ],
      },
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolvePlugin,

    // Resolve source maps to the original source
    // sourceMaps(),
  ],
};

export default [
  {
    ...options,
    output: {
      format: 'umd',
      file: 'dist/khulnasoft-widgets.umd.js',
      name: 'KhulnasoftWidgets',
      sourcemap: true,
      amd: {
        id: '@khulnasoft.com/widgets',
      },
    },
  },
  {
    ...options,
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true },
    ],
    // Do not resolve for es module build
    // TODO: should really do a cjs build too (probably for the default build instead of umd...)
    external: externalDependencies,
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        resolve({
          only: [/^\.{0,2}\//, /lodash\-es/],
        }),
      ]),
  },
  {
    ...options,
    input: 'src/khulnasoft-widgets-async.tsx',
    output: [{ dir: 'dist/khulnasoft-widgets-async', format: 'es', sourcemap: true }],
    // Do not resolve for es module build
    // TODO: should really do a cjs build too (probably for the default build instead of umd...)
    external: externalDependencies,
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        resolve({
          only: [/^\.{0,2}\//, /lodash\-es/],
        }),
      ]),
  },
  // React 15
  {
    ...options,
    output: [
      { file: './dist/15.esm.js', format: 'es', sourcemap: true },
      { file: './dist/15.js', format: 'cjs', sourcemap: true },
    ],
    external: externalDependencies.filter(name => !name.startsWith('lodash')),
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        resolve({
          only: [/^\.{0,2}\//, /lodash\-es/],
        }),
        replace({
          'React.Fragment': '"span"',
        }),
        regexReplace({
          // ... do replace before commonjs
          patterns: [
            {
              test: /\/\/\/REACT15ONLY/g,
              replace: '',
            },
            {
              test: /\/\*\*\*REACT15ONLY([^\*]+)\*\//g,
              replace: '$1',
            },
          ],
        }),
      ]),
  },
  // Preact
  // TODO: may have to do react 15 modifications for support (no fragment/context?)
  {
    ...options,
    output: [
      { file: './dist/preact.esm.js', format: 'es', sourcemap: true },
      { file: './dist/preact.js', format: 'cjs', sourcemap: true },
    ],
    external: externalDependencies.filter(name => !name.startsWith('lodash')),
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        regexReplace({
          // ... do replace before commonjs
          patterns: [
            {
              // regexp match with resolved path
              // match: /formidable(\/|\\)lib/,
              // string or regexp
              test: /require\(['"]react(-dom)?['"]\)/g,
              replace: 'require("preact/compat")',
            },
            {
              // regexp match with resolved path
              // match: /formidable(\/|\\)lib/,
              // string or regexp
              test: /from ['"]react(-dom)?['"]/g,
              replace: 'from "preact/compat"',
            },
          ],
        }),
        resolve({
          only: [/^\.{0,2}\//, /lodash\-es/],
        }),
        // Resolve source maps to the original source
        sourceMaps(),
        ...(SERVE
          ? [
              serve({
                contentBase: 'dist',
                port: 1268,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  // https://developer.chrome.com/blog/private-network-access-preflight/#new-in-pna
                  'Access-Control-Allow-Private-Network': 'true',
                },
              }),
            ]
          : []),
      ]),
  },
  {
    ...options,
    output: {
      file: pkg.unpkg,
      format: 'iife',
      name: 'KhulnasoftReact',
      sourcemap: true,
    },
  },
  {
    ...options,
    output: {
      format: 'iife',
      file: pkg.unpkg,
      name: 'KhulnasoftWidgets',
      sourcemap: true,
    },
  },
];
