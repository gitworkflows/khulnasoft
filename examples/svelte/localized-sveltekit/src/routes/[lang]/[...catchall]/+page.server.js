import { fetchOneEntry, getKhulnasoftSearchParams } from '@khulnasoft.com/sdk-svelte';
import { KHULNASOFT_PUBLIC_API_KEY } from '../../../apiKey';
import { getLocaleFromPathname } from '../../../utils';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const locale = getLocaleFromPathname(event.url.pathname);
	// remove locale from the path to match multiple locales in same page if needed
	const urlPath = event.url.pathname.replace(`/${locale}`, '') || '/';
	// fetch your Khulnasoft content
	const content = await fetchOneEntry({
		model: 'page',
		apiKey: KHULNASOFT_PUBLIC_API_KEY,
		locale,
		options: getKhulnasoftSearchParams(event.url.searchParams),
		userAttributes: {
			urlPath,
			locale
		}
	});

	return { content, locale, ...(!content && { status: 404 }) };
}
