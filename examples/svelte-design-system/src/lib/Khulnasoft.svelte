<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { variables } from '$lib/variables';
	import CustomComponents from '../components'

	import * as KhulnasoftSDK from '@khulnasoft.com/sdk-svelte';

	const CUSTOM_COMPONENTS = [
		...CustomComponents,
	];

	let content: any = undefined;
	let canShowContent = false;
	const fetch = async () => {
		content = await KhulnasoftSDK.fetchOneEntry({
			model: 'page',
			apiKey: variables.khulnasoftKey,
			options: KhulnasoftSDK.getKhulnasoftSearchParams(
				KhulnasoftSDK.convertSearchParamsToQueryObject($page.url.searchParams)
			),
			userAttributes: {
				urlPath: $page.url.pathname
			}
		});
		canShowContent = content || KhulnasoftSDK.isEditing();
	};

	fetch();
</script>

<!-- TODO: IF !content return 404 page -->
<h1>Hello world from your SvelteKit project.</h1>
<h2>Below is Khulnasoft Content:</h2>

{#if canShowContent}
	<KhulnasoftSDK.Content
		model="page"
		{content}
		apiKey={variables.khulnasoftKey}
		customComponents={CUSTOM_COMPONENTS}
	/>
{/if}

<style>
  h2 {
    text-align: center;
  }
</style>