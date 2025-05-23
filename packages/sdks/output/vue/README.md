# Khulnasoft.com Vue SDK

This is Khulnasoft's Gen2 Vue SDK.

## Getting Started

```
npm install @khulnasoft.com/sdk-vue
```

NOTE: if you are using Nuxt, you will need to add the SDK's Nuxt module in `nuxt.config.js`:

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@khulnasoft.com/sdk-vue/nuxt'],
});
```

## CSS

If you are using a SSR framework _other_ than Nuxt, you will need to manually import the CSS by adding the following to your entrypoint, before rendering Khulnasoft Content:

```html
<script>
  import '@khulnasoft.com/sdk-vue/css';
</script>
```

## Mitosis

This SDK is generated by [Mitosis](https://github.com/KhulnasoftIO/mitosis). To see the Mitosis source-code, go [here](../../).

## Feature Support

To check the status of the SDK, look at [these tables](../../README.md#feature-implementation).

## Fetch

This Package uses fetch. See [these docs](https://github.com/KhulnasoftIO/this-package-uses-fetch/blob/main/README.md) for more information.

## Version Support

This SDK supports standalone Vue 3, or using Nuxt 3.

## Usage

You can see examples of using Khulnasoft.com:

- with Vue 3 [here](https://github.com/khulnasoft-com/khulnasoft/tree/main/examples/vue/vue-3)
- with Nuxt 3 [here](https://github.com/khulnasoft-com/khulnasoft/tree/main/examples/vue/nuxt-3)
- with Nuxt 3 (using a catch-all route) [here](https://github.com/khulnasoft-com/khulnasoft/tree/main/examples/vue/nuxt-3-catchall)
