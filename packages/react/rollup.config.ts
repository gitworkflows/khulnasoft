import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const libraryName = 'khulnasoft-react';

const resolvePlugin = resolve();

const externalDependencies = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.optionalDependencies || {}))
  .filter(item => item !== 'tslib')
  .concat(Object.keys(pkg.peerDependencies || {}));

const options = {
  input: `src/${libraryName}.ts`,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['isolated-vm'],
  watch: {
    include: '../**',
  },
  plugins: [
    typescript({
      include: ['*.js+(|x)', '*.ts+(|x)', '**/*.ts+(|x)'],
      tsconfigOverride: {
        compilerOptions: {
          // No need to type check and gen over and over, we do once at beginning of khulnasoft with `tsc`
          declaration: false,
          checkJs: false,
          allowJs: true,
        },
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      exclude: ['node_modules/isolated-vm/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'useContext',
          'Component',
          'useRef',
          'createElement',
          'forwardRef',
          'Fragment',
          'useEffect',
          'useState',
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef'],
      },
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    // resolve({}),
    resolvePlugin,

    // Resolve source maps to the original source
    sourceMaps(),

    terser(),
  ],
};

export default [
  // UMD browser build
  {
    ...options,
    output: {
      file: 'dist/khulnasoft-react.browser.js',
      name: 'KhulnasoftReact',
      format: 'umd',
      sourcemap: true,
      amd: {
        id: '@khulnasoft.com/react',
      },
    },
  },
  // Main ES and CJS builds
  {
    ...options,
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true },
    ],
    external: externalDependencies.concat('node-fetch'),
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        resolve({
          only: [/^\.{0,2}\//],
        }),
      ]),
  },
  // Lite builds
  {
    ...options,
    input: `src/${libraryName}-lite.ts`,
    output: [
      {
        file: `dist/${libraryName}-lite.esm.js`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `dist/${libraryName}-lite.cjs.js`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external: externalDependencies,
    plugins: options.plugins.map(plugin =>
      plugin !== resolvePlugin
        ? plugin
        : resolve({
            only: [/^\.{0,2}\//],
          })
    ),
  },
  // iife build
  {
    ...options,
    output: {
      file: pkg.unpkg,
      format: 'iife',
      name: 'KhulnasoftReact',
      sourcemap: true,
    },
  },
];
