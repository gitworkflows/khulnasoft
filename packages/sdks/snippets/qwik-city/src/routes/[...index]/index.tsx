/**
 * Quickstart snippet
 * snippets/qwik-city/src/routes/[...index]/index.tsx
 */
import { component$ } from '@khulnasoft.com/qwik';
import { routeLoader$ } from '@khulnasoft.com/qwik-city';
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-qwik';

// Define Khulnasoft's public API key and content model.
// TO DO: Replace with your Public API Key
export const KHULNASOFT_PUBLIC_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
export const KHULNASOFT_MODEL = 'page';

// Define a route loader function that loads
// content from Khulnasoft based on the URL.
export const useKhulnasoftContent = routeLoader$(async ({ url }) => {
  // Fetch content for the specified model using the API key.
  const khulnasoftContent = await fetchOneEntry({
    model: KHULNASOFT_MODEL,
    apiKey: KHULNASOFT_PUBLIC_API_KEY,
    options: getKhulnasoftSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  // Return the fetched content.
  return khulnasoftContent;
});

// Define a component that renders Khulnasoft content
// using Qwik's Content component.
export default component$(() => {
  // Call the useKhulnasoftContent function to get the content.
  const content = useKhulnasoftContent();
  // Specify the content model, pass the fetched content,
  // and provide the Public API Key
  return (
    <Content
      model={KHULNASOFT_MODEL}
      content={content.value}
      apiKey={KHULNASOFT_PUBLIC_API_KEY}
    />
  );
});
