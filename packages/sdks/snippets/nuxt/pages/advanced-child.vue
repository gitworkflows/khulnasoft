<script setup lang="ts">
import { Content, fetchOneEntry, isPreviewing } from '@khulnasoft.com/sdk-vue';
import CustomTabsInfo from '../components/CustomTabsInfo';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const model = 'advanced-child';
const apiKey = 'ee9f13b4981e489a9a1209887695ef2b';

const { data: content, pending } = await useAsyncData(
  `khulnasoft-${model}-${route.path}`,
  () =>
    fetchOneEntry({
      model,
      apiKey,
      userAttributes: {
        urlPath: route.path,
      },
    })
);
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="!content && !isPreviewing()">404 - Not Found</div>
    <Content
      v-else
      :content="content"
      :model="model"
      :apiKey="apiKey"
      :customComponents="[CustomTabsInfo]"
    />
  </div>
</template>
