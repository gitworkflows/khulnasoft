<script lang="ts">
  import { Content, _processContentResult } from '@khulnasoft.com/sdk-svelte';
  import { getProps } from '@sdk/tests';
  import KhulnasoftBlockWithClassName from './KhulnasoftBlockWithClassName.svelte';

  const khulnasoftBlockWithClassNameCustomComponent = {
    name: 'KhulnasoftBlockWithClassName',
    component: KhulnasoftBlockWithClassName,
    shouldReceiveKhulnasoftProps: {
      khulnasoftBlock: true,
    },
    inputs: [
      {
        name: 'content',
        type: 'uiBlocks',
        defaultValue: [
          {
            '@type': '@khulnasoft.com/sdk:Element',
            '@version': 2,
            id: 'khulnasoft-c6e179528dee4e62b337cf3f85d6496f',
            component: {
              name: 'Text',
              options: {
                text: 'Enter some text...',
              },
            },
            responsiveStyles: {
              large: {
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                flexShrink: '0',
                boxSizing: 'border-box',
                marginTop: '20px',
                lineHeight: 'normal',
                height: 'auto',
              },
            },
          },
        ],
      },
    ],
  };

  let props = undefined;
  const fetch = async () => {
    props = await getProps({ _processContentResult });
    props.customComponents = [khulnasoftBlockWithClassNameCustomComponent];
  };

  fetch();
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<main>
  {#if props}
    <Content {...props} />
  {:else}
    Content Not Found
  {/if}
</main>
