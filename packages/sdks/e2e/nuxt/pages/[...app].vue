<script setup lang="ts">
import {
  Content,
  _processContentResult,
  setClientUserAttributes,
} from '@khulnasoft.com/sdk-vue';
import KhulnasoftBlockWithClassName from '../components/KhulnasoftBlockWithClassName.vue';
import { getProps } from '@sdk/tests';

if (typeof window !== 'undefined') {
  if (window.location.pathname === '/variant-containers') {
    setClientUserAttributes({
      device: 'tablet',
    });
  }
}

const route = useRoute();

const REGISTERED_COMPONENTS = [
  {
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
  },
];

const { data: props } = await useAsyncData('khulnasoftData', async () => {
  const props = await getProps({ pathname: route.path, _processContentResult });
  return props;
});
</script>

<template>
  <div v-if="props">
    <Content v-bind="props" :customComponents="REGISTERED_COMPONENTS" />
  </div>
  <div v-else>Content not Found</div>
</template>
