<script setup lang="ts">
import { Blocks, type KhulnasoftBlock } from '@khulnasoft.com/sdk-vue';
const props = defineProps<{
  khulnasoftBlock?: KhulnasoftBlock;
  khulnasoftContext?: any;
  khulnasoftComponents?: any;
  content?: any[];
}>();
</script>

<template>
  <div>
    <Blocks
      :parent="khulnasoftBlock?.id"
      path="component.options.content"
      :context="khulnasoftContext"
      :registeredComponents="khulnasoftComponents"
      :blocks="content"
      class="test-class-name"
    />
  </div>
</template>
