<script lang="ts">
  import { Blocks, type KhulnasoftBlock } from '@khulnasoft.com/sdk-svelte';

  export let khulnasoftBlock: KhulnasoftBlock;
  export let tabList: Array<{ tabName: string; blocks: KhulnasoftBlock[] }>;

  let activeTab = 0;
</script>

{#if tabList.length}
  <div class="dynamics-slots">
    {#each tabList as tab, index}
      <button on:click={() => (activeTab = index)}>
        {tab.tabName}
      </button>
    {/each}

    <Blocks
      blocks={tabList[activeTab].blocks}
      path={`tabList.${activeTab}.blocks`}
      parent={khulnasoftBlock.id}
    />
  </div>
{/if}
