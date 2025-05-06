<script lang="ts">
import { defineComponent } from 'vue';
import { Content } from '@khulnasoft.com/sdk-vue';
import KhulnasoftBlockWithClassName from './KhulnasoftBlockWithClassName.vue';

const REGISTERED_COMPONENTS = [
  {
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
  },
];

export default defineComponent({
  name: 'DynamicallyRenderKhulnasoftPage',
  components: {
    'khulnasoft-render-content': Content,
  },
  props: ['props'],
  data() {
    return {
      registeredComponents: REGISTERED_COMPONENTS,
    };
  },
});
</script>

<template>
  <div v-if="props">
    <khulnasoft-render-content
      v-bind="props"
      :customComponents="registeredComponents"
    />
  </div>
  <div v-else>Content not Found</div>
</template>
