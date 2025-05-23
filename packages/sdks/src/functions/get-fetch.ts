import { getGlobalThis } from './get-global-this.js';

function getFetch(): typeof global.fetch {
  const globalFetch: typeof global.fetch = getGlobalThis().fetch;

  if (typeof globalFetch === 'undefined') {
    console.warn(
      `Khulnasoft SDK could not find a global fetch function. Make sure you have a polyfill for fetch in your project. 
      For more information, read https://github.com/KhulnasoftIO/this-package-uses-fetch`
    );

    throw new Error('Khulnasoft SDK could not find a global `fetch` function');
  }

  return globalFetch;
}

export const fetch = getFetch();
