import { _processContentResult } from '@khulnasoft.com/sdk-vue';
import { getProps } from '@sdk/tests';
import 'cross-fetch/dist/node-polyfill.js';

export { onBeforeRender };

/**
 *
 * @param {import('vite-plugin-ssr/types').PageContextBuiltIn} pageContext
 * @returns
 */
async function onBeforeRender(pageContext) {
  const props = await getProps({
    _processContentResult,
    pathname: pageContext.urlParsed.pathname,
  });

  return {
    pageContext: {
      pageProps: { props },
    },
  };
}
