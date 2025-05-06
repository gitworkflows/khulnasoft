<script lang="ts">
  import { Blocks, type KhulnasoftBlock } from '@khulnasoft.com/sdk-svelte';

  export let column1: KhulnasoftBlock[];
  export let column2: KhulnasoftBlock[];
  export let khulnasoftBlock: KhulnasoftBlock;
</script>

<!-- Left Column -->
<Blocks parent={khulnasoftBlock.id} path="column1" blocks={column1} />

<!-- Right Column -->
<Blocks parent={khulnasoftBlock.id} path="column2" blocks={column2} />
