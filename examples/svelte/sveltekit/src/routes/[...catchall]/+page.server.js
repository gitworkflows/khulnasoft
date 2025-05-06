import { fetchOneEntry, getKhulnasoftSearchParams } from '@khulnasoft.com/sdk-svelte';
import { KHULNASOFT_PUBLIC_API_KEY } from '../../apiKey';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	// fetch your Khulnasoft content
	const content = await fetchOneEntry({
		model: 'page',
		apiKey: KHULNASOFT_PUBLIC_API_KEY,
		options: getKhulnasoftSearchParams(event.url.searchParams),
		userAttributes: {
			urlPath: event.url.pathname || '/'
		}
	});

	return { content };
}
