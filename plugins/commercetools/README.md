# Khulnasoft.com Commercetools plugin

Easily connect your Commercetools data to your Khulnasoft.com content!

## Installation

Go to [khulnasoft.com/account/organization](https://khulnasoft.com/account/organization) and press on `@khulnasoft.com/plugin-commercetools` in the list of plugins, then hit save, you'll be prompted for storeId and secretKey next.

![Installation screenshot](https://cdn.khulnasoft.com/api/v1/image/assets%2F6d39f4449e2b4e6792a793bb8c1d9615%2F18a7201313914cccae7f0311a1a614ae)

You will now see six new field types (for [model](https://khulnasoft.com/c/docs/guides/getting-started-with-models) fields, [symbol](https://khulnasoft.com/c/docs/guides/symbols) inputs, [custom components](https://khulnasoft.com/c/docs/custom-react-components) fields), and [custom targeting attributes](https://www.khulnasoft.com/c/docs/guides/targeting-and-scheduling#custom-targeting) that can be used in three different contexts:

### Custom targeting

Custom targeting in Khulnasoft.com allow users to target content by a multitude of attributes, and in this plugin you'll be able to add specific content to commercetools categorys or products, for this you'll need first to set the target attributes on the host site, either by setting the `userAttributes` if you're rendering client side:

```ts
khulnasoft.setUserAttributes({
  product: currentProduct.id,
});
```

Or by passing it as a query param to the [content API](https://www.khulnasoft.com/c/docs/query-api#:~:text=userAttributes) call, or in [graqhql query](https://www.khulnasoft.com/c/docs/graphql-api#:~:text=with%20targeting) for e.g in Gatsby or nextjs.

- `Commercetools Product` when used as a custom targeting type, it'll target contexts where the field is set to the product ID, you'll need to set the product ID on the host environment, using one of the methods above. Alternatively, if you want to target by product handle use the `Commercetools Product Handle` type in your custom targeting attributes.

- `Commercetools Category` can be used as custom targeting attribute to target specific category by ID, you'll need to set the category ID on the host environment, using one of the methods above. Alternatively, if you want to target by product handle use the `Commercetools Category Handle` type in your custom targeting attributes.

### Component model fields

Component models can be used to represent product or category page templates for all or a specific set of products/categorys, using one of the following fields, you'll make previewing the templates for any product or category straight-forward:

- `Commercetools Product Preview` is to be used as a custom field on component models, this will allow you to have templated editing url on your component model relevant to the commercetools product being previewed, for example you can set the url in your model to:
  `https://www.mystore.com/product/${previewProduct.handle}`, add a custom field of type `Commercetools Product Preview` to the model, now when you create a new entry, the handle will be added dynamically to the preview url based on the preview product, it is recommended to add a default value to the `Commercetools Product Preview` custom field, so users will land at a specific product page when developing a template component.

- `Commercetools Category Preview` is to be used as a custom field on component models, this will allow you to have templated editing url on your component model relevant to the commercetools category being previewed, for example you can set the url in your model to:
  `https://www.mystore.com/category/${previewCategory.handle}`, add a custom field of type `Commercetools Category Preview`, now when you create a new entry, the handle will be added dynamically to the preview url based on the preview product, it is recommended to add a default value to the `Commercetools Category Preview` custom field, so users will land at a specific category page when developing a template component.

### Symbol Inputs

Using the field types `Commercetools Product` and `Commercetools Category` as inputs, the UIs will prompt to search for products and categorys. When consumed by APIs, SDKs, or in the Khulnasoft.com UIs, the value will be resolved automatically the in the form of a Khulnasoft.com `Request` object

```js
{
  "yourFieldName": {
    "@type": "@khulnasoft.com/core:Request",
    "request": {
      "url": "..."
    },
    "data": {
      // Response data from the API request, e.g.:
      "product": {
        /* ... */
      }
    }
  }
}
```

## How to develop?

### Install

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd plugins/commercetools
npm install
```

### Run

```bash
npm start
```

### Add the plugin in Khulnasoft.com

Go to [khulnasoft.com/account/organization](https://khulnasoft.com/account/organization) and add the localhost URL to the plugin from the plugin settings (`http://localhost:1268/plugin.system.js?pluginId=@khulnasoft.com/ecom-commercetools-is`)

**NOTE:** Loading http:// content on an https:// website will give you a warning. Be sure to click the shield in the top right of your browser and choose "load unsafe scripts" to allow the http content on Khulnasoft's https site when devloping locally

<img alt="Load unsafe script example" src="https://i.stack.imgur.com/uSaLL.png">

Now as you develop you can restart Khulnasoft to see the latest version of your plugin.

To uninstall your plugin, just remove it in the plugins UI

### Seeing the plugin in action

Try creating a custom [model](https://khulnasoft.com/c/docs/guides/getting-started-with-models), [component](https://khulnasoft.com/c/docs/custom-react-components), or [symbol](https://khulnasoft.com/c/docs/guides/symbols) using a Commercetools field, and edit away!

<img src="https://i.imgur.com/uVOLn7A.gif" alt="Seeing your plugin in the editor example gif">

### Frameworks

Khulnasoft.com uses [React](https://github.com/facebook/react) and [Material UI](https://github.com/mui-org/material-ui) for the UI, and [Emotion](https://github.com/emotion-js/emotion) for styling.

Using these frameworks in Khulnasoft plugins ensures best possible experience and performance.
