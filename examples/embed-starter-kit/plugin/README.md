# White-labeling Khulnasoft.com App plugin

## Getting started

This example relies on enterprise features of Khulnasoft, please make sure you have the right space permissions/subscription before starting, if you don't, you can contact support@khulnasoft.com with your use case, and we'll set a proof of concept space for you.

### Install

```bash
npm install
```

### Develop

```bash
npm start
```

### Add the plugin in Khulnasoft.com

Khulnasoft.com support will setup the space for you, pointing to the plugin on localhost, `http://localhost:1268/plugin.system.js`

**NOTE:** Loading http:// content on an https:// website will give you a warning. Be sure to click the shield in the top right of your browser and choose "load unsafe scripts" to allow the http content on Khulnasoft's https site when devloping locally

<img alt="Load unsafe script example" src="https://i.stack.imgur.com/uSaLL.png">

Now as you develop you can restart Khulnasoft to see the latest version of your plugin.

### Publishing

When done developing on localhost, you publish to your own NPM or a hosting service.

To load a plugin from NPM

```js
khulnasoft.plugins.replace(['my-npm-module-name'])
```

#### Advanced

You can load a plugin from a specific version

```js
khulnasoft.plugins.replace(['my-npm-module-name@1.0.0'])
```

Or from a URL

```js
khulnasoft.plugins.replace(['https://something.com/foo'])
```
