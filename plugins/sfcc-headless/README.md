# Khulnasoft.com Salesforce Headless plugin

Easily connect your Salesforce products and collections to your Khulnasoft.com content!

## Installation

Go to [khulnasoft.com/account/space](https://khulnasoft.com/account/space) and type `@khulnasoft.com/plugin-sfcc-headless` in plugins options, then hit save, you'll be prompted for few configuration options needed to connect to you SFCC instance.

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

- `Salesforce Product` when used as a custom targeting type, it'll target contexts where the field is set to the product ID, you'll need to set the product ID on the host environment, using one of the methods above. Alternatively, if you want to target by product handle use the `Commercetools Product Handle` type in your custom targeting attributes.

- `Salesforce Collection` can be used as custom targeting attribute to target specific category by ID, you'll need to set the category ID on the host environment, using one of the methods above. Alternatively, if you want to target by product handle use the `Commercetools Category Handle` type in your custom targeting attributes.


### Custom Components Inputs

Using the field types `Salesforce Product` and `Salesforce Collection` as inputs, the UIs will prompt to search for products and collections. When consumed by APIs, SDKs, or in the Khulnasoft.com UIs, the value will be resolved automatically the in the form of a Khulnasoft.com `Request` object

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
