<script lang="ts">
  import { onMount } from 'svelte';
  import { Content, fetchOneEntry, isPreviewing } from '@khulnasoft.com/sdk-svelte';
  import type { KhulnasoftContent } from '@khulnasoft.com/sdk-svelte';
  import { CustomColumnsInfo } from './CustomColumnsInfo';

  let loading = true;
  let content: KhulnasoftContent | null;

  let model = 'editable-regions';
  let apiKey = 'ee9f13b4981e489a9a1209887695ef2b';

  onMount(() => {
    fetchOneEntry({
      model,
      apiKey,
      userAttributes: {
        urlPath: window.location.pathname,
      },
    }).then((data) => {
      content = data;
      loading = false;
    });
  });
</script>

{#if loading}
  <div>Loading...</div>
{:else if !content && !isPreviewing()}
  <div>404 - Not Found</div>
{:else}
  <Content {content} {apiKey} {model} customComponents={[CustomColumnsInfo]} />
{/if}
