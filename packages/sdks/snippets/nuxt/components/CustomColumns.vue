<template>
  <!-- Left Column -->
  <Blocks :parent="khulnasoftBlock.id" :path="'column1'" :blocks="column1" />
  <!-- Right Column -->
  <Blocks :parent="khulnasoftBlock.id" :path="'column2'" :blocks="column2" />
</template>

<script setup lang="ts">
import { Blocks, type KhulnasoftBlock } from '@khulnasoft.com/sdk-vue';

const { column1, column2, khulnasoftBlock } = defineProps<{
  column1: KhulnasoftBlock[];
  column2: KhulnasoftBlock[];
  khulnasoftBlock: KhulnasoftBlock;
}>();
</script>
