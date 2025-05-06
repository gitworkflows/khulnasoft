<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import Khulnasoft from '$lib/Khulnasoft.svelte';
</script>

<div>
	<Khulnasoft />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
