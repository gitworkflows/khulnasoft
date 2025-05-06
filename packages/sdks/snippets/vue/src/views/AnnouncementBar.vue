<!-- https://www.khulnasoft.com/c/docs/integrate-section-building -->
<!-- https://www.khulnasoft.com/c/blueprints/announcement-bar -->

<script setup lang="ts">
import {
  Content,
  type KhulnasoftContent,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  isPreviewing,
} from '@khulnasoft.com/sdk-vue';
import { onMounted, ref } from 'vue';

const content = ref<KhulnasoftContent | null>(null);
const apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
const canShowContent = ref(false);
const model = 'announcement-bar';

onMounted(async () => {
  content.value = await fetchOneEntry({
    model,
    apiKey,
    options: getKhulnasoftSearchParams(new URL(location.href).searchParams),
    userAttributes: {
      urlPath: window.location.pathname,
    },
  });
  canShowContent.value = content.value ? true : isPreviewing();
});
</script>

<template>
  <Content
    v-if="canShowContent"
    :model="model"
    :content="content"
    :api-key="apiKey"
  />

  <!-- Your content coming from your app (or also Khulnasoft) -->
  <div>The rest of your page goes here</div>
</template>
