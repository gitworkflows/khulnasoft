import { component$ } from '@khulnasoft.com/qwik';
import type { DocumentHead } from '@khulnasoft.com/qwik-city';
import { routeLoader$ } from '@khulnasoft.com/qwik-city';
import { isBrowser } from '@khulnasoft.com/qwik/build';
import { fetchOneEntry, getKhulnasoftSearchParams } from '@khulnasoft.com/sdk-qwik';
import { Content as EdgeContent } from '@khulnasoft.com/sdk-qwik/bundle/edge';
import { Content as BrowserContent } from '@khulnasoft.com/sdk-qwik/bundle/browser';
import { CUSTOM_COMPONENTS } from '../../components/khulnasoft-registry';

export const Content = isBrowser ? BrowserContent : EdgeContent;

const KHULNASOFT_API_KEY = 'f1a790f8c3204b3b8c5c1795aeac4660';

// This page is a catch-all for all routes that don't have a pre-defined route.
// Using a catch-all route allows you to dynamically create new pages in Khulnasoft.

// Use the `useKhulnasoftContent` route loader to get your content from Khulnasoft.
// `routeLoader$()` takes an async function to fetch content
// from Khulnasoft with using `fetchOneEntry()`.
export const useKhulnasoftContent = routeLoader$(async ({ url, error }) => {
  const isPreviewing = url.searchParams.has('khulnasoft.preview');

  // Fetch Khulnasoft.com Visual CMS content using the Qwik SDK.
  // The public API key is set in the .env file at the root
  // https://www.khulnasoft.com/c/docs/using-your-api-key
  const khulnasoftContent = await fetchOneEntry({
    model: 'page',
    apiKey: KHULNASOFT_API_KEY,
    options: getKhulnasoftSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  // If there's no content, throw a 404.
  // You can use your own 404 component here
  if (!khulnasoftContent && !isPreviewing) {
    throw error(404, 'Page not found');
  }

  // return content fetched from Khulnasoft, which is JSON
  return khulnasoftContent;
});

export default component$(() => {
  const khulnasoftContent = useKhulnasoftContent();

  // Content component uses the `content` prop to render
  // the page, specified by the API Key, at the current URL path.
  return (
    <Content
      model="page"
      content={khulnasoftContent.value}
      apiKey={KHULNASOFT_API_KEY}
      customComponents={CUSTOM_COMPONENTS}
    />
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const khulnasoftContent = resolveValue(useKhulnasoftContent);
  return {
    title: khulnasoftContent?.data?.title,
  };
};
