import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  setup(options, nuxt) {
    const includeCompiledCss = options.includeCompiledCss ?? true;
    const initializeNodeRuntime = options.initializeNodeRuntime ?? false;
    /**
     * Add the compiled Khulnasoft.com CSS to the Nuxt CSS array.
     */
    if (includeCompiledCss) {
      nuxt.options.css.push('@khulnasoft.com/sdk-vue/css');
    }
    /**
     * This is because Vite tries to optimize the isolated-vm dependency while
     * running the dev server (first build), which is not needed and throws an error.
     * `isolated-vm` is a Node.js native module which should only be imported and used in Node.js environments.
     */
    if (initializeNodeRuntime) {
      if (nuxt.options.vite?.optimizeDeps?.exclude) {
        nuxt.options.vite.optimizeDeps.exclude.push(
          '@khulnasoft.com/sdk-vue/node/init'
        );
      } else {
        nuxt.options.vite = {
          ...nuxt.options.vite,
          optimizeDeps: {
            ...nuxt.options.vite?.optimizeDeps,
            exclude: ['@khulnasoft.com/sdk-vue/node/init'],
          },
        };
      }

      const resolver = createResolver(import.meta.url);
      addPlugin({
        src: resolver.resolve('nuxt-isolated-vm-plugin.js'),
        mode: 'server',
      });
    }
  },
});
