// we need to use isServer for tree-shaking to work, hence overriding this file for Qwik.
import { isBrowser } from '@khulnasoft.com/qwik/build';
import { runInBrowser } from './browser-runtime/browser.js';
import type { ExecutorArgs } from './helpers.js';

/**
 * THIS IS A MAGICAL IMPORT. It is aliased by the build process of every SDK configuration, so that
 * it points to the correct runtime for that configuration, which are expected to live exactly at:
 *  - ./browser-runtime/index.js
 *  - ./node-runtime/index.js
 *  - ./edge-runtime/index.js
 *
 * We have code in `/output-generation` that does this aliasing, and is re-used by each SDK.
 * Also, each individual `tsconfig.json` aliases this import to the browser runtime so that the
 * types can be resolved correctly.
 */
import { evaluator } from 'placeholder-runtime';
import { shouldForceBrowserRuntimeInNode } from './should-force-browser-runtime-in-node.js';

/**
 * Even though we have separate runtimes for browser/node/edge, sometimes frameworks will
 * end up sending the server runtime code to the browser (most notably in dev mode).
 */
export const chooseBrowserOrServerEval = (args: ExecutorArgs) =>
  isBrowser || shouldForceBrowserRuntimeInNode({ shouldLogWarning: true })
    ? runInBrowser(args)
    : evaluator(args);
