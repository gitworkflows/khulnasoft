<script setup lang="ts">
import {
  Content,
  fetchOneEntry,
  isPreviewing,
  type KhulnasoftContent,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-vue';
import { onMounted, ref } from 'vue';

import HelloWorldComponent from './components/HelloWorld.vue';

// Register your Khulnasoft components
const REGISTERED_COMPONENTS = [
  {
    component: HelloWorldComponent,
    name: 'Hello World',
    canHaveChildren: true,
    inputs: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'World',
      },
    ],
  },
];

// TODO: enter your public API key
const KHULNASOFT_PUBLIC_API_KEY = 'f1a790f8c3204b3b8c5c1795aeac4660'; // ggignore
const content = ref<KhulnasoftContent | null>(null);
const canShowContent = ref(false);
const model = 'page';

onMounted(async () => {
  content.value = await fetchOneEntry({
    model,
    apiKey: KHULNASOFT_PUBLIC_API_KEY,
    options: getKhulnasoftSearchParams(new URL(location.href).searchParams),
    userAttributes: {
      urlPath: window.location.pathname,
    },
  });
  canShowContent.value = content.value ? true : isPreviewing();
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </header>
  <div>
    <div>Hello world from your Vue 3 project. Below is Khulnasoft Content:</div>
    <div v-if="canShowContent">
      <div>
        page title:
        {{ (content && content.data && content.data.title) || 'Unpublished' }}
      </div>
      <Content
        :model="model"
        :content="content"
        :api-key="KHULNASOFT_PUBLIC_API_KEY"
        :customComponents="REGISTERED_COMPONENTS"
      />
    </div>
    <div v-else>Content not Found</div>
  </div>
</template>

<style>
#app {
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
