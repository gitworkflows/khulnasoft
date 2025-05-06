# Khulnasoft.com Commerce Layer Plugin

Easily connect your Commerce Layer products to your Khulnasoft.com content!

## Installation

Go to [khulnasoft.com/account/organization](https://khulnasoft.com/account/organization) and press on `@khulnasoft.com/plugin-commercelayer` in the list of plugins, then hit save. You'll be prompted for your Commerce Layer credentials:
- Client ID
- Market Scope (e.g., 'market:id:YOUR_MARKET_ID')

## Features

The plugin provides new field types for your Khulnasoft.com models:

### Product Fields

- `Commerce Layer Product` - Search and select products from your Commerce Layer catalog
- `Commerce Layer Product Preview` - Preview product templates with live data

### Component Model Fields

Component models can be used to create product page templates. Using the following fields makes previewing the templates straightforward:

- `Commerce Layer Product Preview` can be used as a custom field on component models to create templated editing URLs. For example:
  ```
  https://www.mystore.com/product/${previewProduct.handle}
  ```
  Add a custom field of type `Commerce Layer Product Preview` to dynamically update the preview URL based on the selected product.

### Custom Targeting

You can target content to specific products by setting the target attributes on your site:

```ts
khulnasoft.setUserAttributes({
  product: currentProduct.id,
});
```

## Development

### Install

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd plugins/commercelayer
npm install
```

### Run

```bash
npm start
```

### Add the Plugin Locally

Go to [khulnasoft.com/account/organization](https://khulnasoft.com/account/organization) and add the localhost URL to the plugin from the plugin settings (`http://localhost:1268/plugin.system.js?pluginId=@khulnasoft.com/plugin-commercelayer`)

**NOTE:** Loading http:// content on an https:// website will give you a warning. Click the shield in the top right of your browser and choose "load unsafe scripts" to allow http content on Khulnasoft's https site when developing locally.

### Testing the Plugin

1. Create a custom [model](https://khulnasoft.com/c/docs/guides/getting-started-with-models)
2. Add a Commerce Layer Product field
3. Search and select products from your catalog
4. Preview the content with live product data

## Authentication

The plugin uses Commerce Layer's Sales Channel authentication. You'll need:
- A Commerce Layer account
- Sales Channel API credentials
- A valid market scope

## Contributing

Contributions are welcome! Please read Khulnasoft.com's [contributing guidelines](https://github.com/khulnasoft-com/khulnasoft/blob/main/CONTRIBUTING.md) before submitting PRs.

## Frameworks

Khulnasoft.com uses [React](https://github.com/facebook/react) and [Material UI](https://github.com/mui-org/material-ui) for the UI, and [Emotion](https://github.com/emotion-js/emotion) for styling.