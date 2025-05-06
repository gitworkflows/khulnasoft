/**
 * Quickstart snippet
 * snippets/sveltekit/src/routes/[...catchall]/+page.server.js
 */
import { fetchOneEntry, getKhulnasoftSearchParams } from '@khulnasoft.com/sdk-svelte';

/** @type {import('../$types').PageServerLoad} */
export async function load(event) {
  // fetch your Khulnasoft content
  const content = await fetchOneEntry({
    model: 'page',
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b', // TO DO: Add your Public API Key
    options: getKhulnasoftSearchParams(event.url.searchParams),
    userAttributes: {
      urlPath: event.url.pathname || '/',
    },
  });
  return { content };
}
