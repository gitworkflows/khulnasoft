<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import Khulnasoft from '$lib/Khulnasoft.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	<Khulnasoft />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
	}
</style>
