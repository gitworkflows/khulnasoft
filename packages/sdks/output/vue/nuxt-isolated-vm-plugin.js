import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  // initialize Isolated VM on node runtime
  if (process.server || import.meta.server) {
    async function importIsolatedVM() {
      const { initializeNodeRuntime } = await import(
        '@khulnasoft.com/sdk-vue/node/init'
      );
      initializeNodeRuntime();
    }
    importIsolatedVM();
  }
});
