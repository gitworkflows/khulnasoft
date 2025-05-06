<template>
  <div class="dynamics-slots" v-if="tabList.length">
    <button
      v-for="(tab, index) in tabList"
      :key="index"
      :class="{ active: activeTab === index }"
      @click="activeTab = index"
    >
      {{ tab.tabName }}
    </button>

    <Blocks
      :blocks="tabList[activeTab].blocks"
      :path="`tabList.${activeTab}.blocks`"
      :parent="khulnasoftBlock.id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Blocks, type KhulnasoftBlock } from '@khulnasoft.com/sdk-vue';

const activeTab = ref(0);

const { khulnasoftBlock, tabList } = defineProps<{
  khulnasoftBlock: KhulnasoftBlock;
  tabList: Array<{
    tabName: string;
    blocks: KhulnasoftBlock[];
  }>;
}>();
</script>
