<script lang="ts">
  import { Content, setClientUserAttributes } from '@khulnasoft.com/sdk-svelte';
  import KhulnasoftBlockWithClassName from '../../components/KhulnasoftBlockWithClassName.svelte';

  if (typeof window !== 'undefined') {
    if (window.location.pathname === '/variant-containers') {
      setClientUserAttributes({
        device: 'tablet',
      });
    }
  }

  // this data comes from the function in `+page.server.ts`, which runs on the server only
  export let data;
  const khulnasoftBlockWithClassNameCustomComponent = {
    name: 'KhulnasoftBlockWithClassName',
    component: KhulnasoftBlockWithClassName,
    shouldReceiveKhulnasoftProps: {
      khulnasoftBlock: true,
      khulnasoftContext: true,
      khulnasoftComponents: true,
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
</script>

<main>
  {#if data.props}
    {#key data.props}
      <Content
        {...data.props}
        customComponents={[
          ...data.customComponents,
          khulnasoftBlockWithClassNameCustomComponent,
        ]}
      />
    {/key}
  {:else}
    Content Not Found
  {/if}
</main>
