/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * src/routes/announcements/[...catchall]/+page.server.js
 */
import { fetchOneEntry, getKhulnasoftSearchParams } from '@khulnasoft.com/sdk-svelte';

/** @type {import('../../$types').PageServerLoad} */
export async function load(event) {
  // fetch your Khulnasoft content
  const content = await fetchOneEntry({
    model: 'announcement-bar',
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b', // TO DO: Add your Public API Key
    options: getKhulnasoftSearchParams(event.url.searchParams),
    userAttributes: {
      urlPath: event.url.pathname || '/',
    },
  });
  return { content };
}
