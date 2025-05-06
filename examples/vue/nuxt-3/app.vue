<template>
  <div id="home">
    <div>Hello world from your Vue project. Below is Khulnasoft Content:</div>

    <div v-if="content || isPreviewing()">
      <div>
        page title:
        {{ content?.data?.title || 'Unpublished' }}
      </div>
      <Content
        model="page"
        :content="content"
        :api-key="KHULNASOFT_PUBLIC_API_KEY"
        :customComponents="REGISTERED_COMPONENTS"
      />
    </div>
    <div v-else>Content not Found</div>
  </div>
</template>

<script setup>
import { Content, fetchOneEntry, isPreviewing } from '@khulnasoft.com/sdk-vue';

import HelloWorldComponent from './components/HelloWorld.vue';

// Register your Khulnasoft components
const REGISTERED_COMPONENTS = [
  {
    component: HelloWorldComponent,
    name: 'MyFunComponent',
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

const route = useRoute();

// fetch khulnasoft content data
const { data: content } = await useAsyncData(`khulnasoftData-page-${route.path}`, () =>
  fetchOneEntry({
    model: 'page',
    apiKey: KHULNASOFT_PUBLIC_API_KEY,
    userAttributes: {
      urlPath: route.path,
    },
  })
);
</script>
