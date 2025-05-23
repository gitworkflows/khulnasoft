import { fetchOneEntry } from '@khulnasoft.com/sdk-svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const data = await fetchOneEntry({
    model: 'custom-child',
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  return { data };
};
