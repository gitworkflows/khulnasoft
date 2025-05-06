<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Blocks, type KhulnasoftBlock } from '@khulnasoft.com/sdk-vue';

export default defineComponent({
  name: 'KhulnasoftBlockWithClassName',
  components: {
    Blocks,
  },
  props: {
    khulnasoftBlock: {
      type: Object as PropType<KhulnasoftBlock>,
      required: true,
    },
    content: {
      type: Array as PropType<KhulnasoftBlock[]>,
      required: true,
    },
    khulnasoftContext: {
      type: Object,
      required: true,
    },
    khulnasoftComponents: {
      type: Object,
      required: true,
    },
  },
});
</script>

<template>
  <div>
    <Blocks
      :parent="khulnasoftBlock?.id"
      path="component.options.content"
      :context="khulnasoftContext"
      :registeredComponents="khulnasoftComponents"
      :blocks="content"
      className="test-class-name"
    />
  </div>
</template>
