<script lang="ts">
  import { Blocks } from '@khulnasoft.com/sdk-svelte';

  export let khulnasoftBlock: any;
  export let content: any;
</script>

<div>
  <Blocks
    parent={khulnasoftBlock?.id}
    path="component.options.content"
    blocks={content}
    className="test-class-name"
  />
</div>
