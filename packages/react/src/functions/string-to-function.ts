import { Khulnasoft, khulnasoft } from '@khulnasoft.com/sdk';
import { safeDynamicRequire } from './safe-dynamic-require';
import { isDebug } from './is-debug';
import { shouldForceBrowserRuntimeInNode } from './should-force-browser-runtime-in-node';

const fnCache: { [key: string]: KhulnasoftEvanFunction | undefined } = {};

type KhulnasoftEvanFunction = (
  state: object,
  event?: Event | undefined | null,
  block?: any,
  khulnasoft?: Khulnasoft,
  Device?: any,
  update?: Function | null,
  _Khulnasoft?: typeof Khulnasoft,
  context?: object
) => any;

export const api = (state: any) => khulnasoft;

export function stringToFunction(
  str: string,
  expression = true,
  errors?: Error[],
  logs?: string[]
): KhulnasoftEvanFunction {
  /* TODO: objedct */
  if (!str || !str.trim()) {
    return () => undefined;
  }

  const cacheKey = str + ':' + expression;
  if (fnCache[cacheKey]) {
    return fnCache[cacheKey]!;
  }

  // FIXME: gross hack
  const useReturn =
    (expression &&
      !(str.includes(';') || str.includes(' return ') || str.trim().startsWith('return '))) ||
    str.trim().startsWith('khulnasoft.run');
  let fn: Function = () => {
    /* intentionally empty */
  };

  try {
    // tslint:disable-next-line:no-function-constructor-with-string-args
    if (Khulnasoft.isBrowser) {
      // TODO: use strict and eval
      fn = new Function(
        'state',
        'event',
        'block',
        'khulnasoft',
        'Device',
        'update',
        'Khulnasoft',
        'context',
        // TODO: remove the with () {} - make a page v3 that doesn't use this
        // Or only do if can't find state\s*\. anywhere hm
        `
          var names = [
            'state',
            'event',
            'block',
            'khulnasoft',
            'Device',
            'update',
            'Khulnasoft',
            'context'
          ];
          var rootState = state;
          if (typeof Proxy !== 'undefined') {
            rootState = new Proxy(rootState, {
              set: function () {
                return false;
              },
              get: function (target, key) {
                if (names.includes(key)) {
                  return undefined;
                }
                return target[key];
              }
            });
          }
          /* Alias */
          var ctx = context;
          var log = console.log.bind(console);
          with (rootState) {
            ${useReturn ? `return (${str});` : str};
          }
        `
      );
    }
  } catch (error: any) {
    if (errors) {
      errors.push(error);
    }
    const message = error && error.message;
    if (message && typeof message === 'string') {
      if (logs && logs.indexOf(message) === -1) {
        logs.push(message);
      }
    }
    if (Khulnasoft.isBrowser) {
      console.warn(`Function compile error in ${str}`, error);
    }
  }

  const final = (...args: any[]) => {
    try {
      if (Khulnasoft.isBrowser || shouldForceBrowserRuntimeInNode()) {
        return fn(...args);
      } else {
        // TODO: memoize on server
        // TODO: use something like this instead https://www.npmjs.com/package/rollup-plugin-strip-blocks
        // There must be something more widely used?
        // TODO: regex for between comments instead so can still type check the code... e.g. //SERVER-START ... code ... //SERVER-END
        // Below is a hack to get certain code to *only* load in the server build, to not screw with
        // browser bundler's like rollup and webpack. Our rollup plugin strips these comments only
        // for the server build
        // TODO: cache these for better performancs with new VmScript
        const isolateContext: import('isolated-vm').Context = getIsolateContext();
        const ivm = safeDynamicRequire('isolated-vm') as typeof import('isolated-vm');
        const resultStr = isolateContext.evalClosureSync(
          makeFn(str, useReturn),
          args.map((arg, index) =>
            typeof arg === 'object'
              ? new ivm.Reference(
                  index === indexOfKhulnasoftInstance
                    ? {
                        // workaround: methods with default values for arguments is not being cloned over
                        ...arg,
                        getUserAttributes: () => arg.getUserAttributes(''),
                      }
                    : arg
                )
              : null
          )
        );
        try {
          // returning objects throw errors in isolated vm, so we stringify it and parse it back
          const res = JSON.parse(resultStr);
          return res;
        } catch (_error: any) {
          return resultStr;
        }
      }
    } catch (error: any) {
      if (Khulnasoft.isBrowser) {
        console.warn(
          'Khulnasoft custom code error:',
          error.message || error,
          'in',
          str,
          error.stack || error
        );
      } else {
        if (isDebug()) {
          console.debug(
            'Khulnasoft custom code error:',
            error.message || error,
            'in',
            str,
            error.stack || error
          );
        }
      }
      if (errors) {
        errors.push(error);
      }
      return null;
    }
  };

  if (Khulnasoft.isBrowser) {
    fnCache[cacheKey] = final;
  }

  return final;
}

const indexOfKhulnasoftInstance = 3;

export const makeFn = (code: string, useReturn: boolean, args?: string[]) => {
  // Order must match the order of the arguments to the function
  const names = args || [
    'state',
    'event',
    'block',
    'khulnasoft',
    'Device',
    'update',
    'Khulnasoft',
    'context',
  ];

  // Convert all argument references to proxies, and pass `copySync` method to target object, to return a copy of the original JS object
  // https://github.com/laverdet/isolated-vm#referencecopysync
  const refToProxyFn = `
  var refToProxy = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    return new Proxy({}, {
        get(target, key) {
            if (key === 'copySync') {
              return () => obj.copySync();
            }
            const val = obj.getSync(key);
            if (typeof val?.copySync === 'function') {
                return JSON.parse(stringify(val));
            }
            return val;
        },
        set(target, key, value) {
            obj.setSync(key, value);
        },
        deleteProperty(target, key) {
            obj.deleteSync(key);
        }
      })
  }
`;
  // Returned object  will be stringified and parsed back to the parent isolate
  const strinfigyFn = `
    var stringify = (val) => {
      if (typeof val === 'object' && val !== null) {
        return JSON.stringify(val.copySync ? val.copySync() : val);
      }
      return val;
    }
  `;

  return `
${refToProxyFn}
${strinfigyFn}
`.concat(names.map((arg, index) => `var ${arg} = refToProxy($${index});`).join('\n')).concat(`
${names.includes('context') ? 'var ctx = context;' : ''}
var endResult = function() {
  ${useReturn ? `return (${code});` : code};
};

return stringify(endResult());
`);
};

export const getIsolateContext = () => {
  let isolatedContext = Khulnasoft.serverContext;

  if (!isolatedContext) {
    const ivm = safeDynamicRequire('isolated-vm') as typeof import('isolated-vm');
    const isolate = new ivm.Isolate({ memoryLimit: 128 });
    isolatedContext = isolate.createContextSync();
    Khulnasoft.setServerContext(isolatedContext);
  }
  const jail = isolatedContext!.global;
  // This makes the global object available in the context as `global`. We use `derefInto()` here
  // because otherwise `global` would actually be a Reference{} object in the new isolate.
  jail.setSync('global', jail.derefInto());
  // We will create a basic `log` function for the new isolate to use.
  jail.setSync('log', function (...args: any[]) {
    if (isDebug()) {
      console.log(...args);
    }
  });
  return isolatedContext;
};
