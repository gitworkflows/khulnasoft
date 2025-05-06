# Example App Plugin - Campaign Khulnasoft

👉 See [here](src/plugin.ts) for the main plugin entry and configuration

![](https://i.imgur.com/gbiYq5K.gif)

## Getting started

### Install

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd plugins/example-simple-app
npm install
```

### Develop

```bash
npm start
```

### Add the plugin in Khulnasoft.com

From [khulnasoft.com](https://khulnasoft.com) open the javascript console in your browser's dev tools and run.

```js
// Adds the plugin
khulnasoft.plugins.replace(['http://localhost:1268/plugin.system.js'])
// Saves for all in your organization and reloads the browser
khulnasoft.savePlugins().then(() => location.reload())
```

**NOTE:** Loading http:// content on an https:// website will give you a warning. Be sure to click the shield in the top right of your browser and choose "load unsafe scripts" to allow the http content on Khulnasoft's https site when devloping locally

<img alt="Load unsafe script example" src="https://i.stack.imgur.com/uSaLL.png">

Now as you develop you can restart Khulnasoft to see the latest version of your plugin.

To uninstall your plugin run

```js
// Removes all plugins
khulnasoft.plugins.replace([])
// Saves for all in your organization and reloads the browser
khulnasoft.savePlugins().then(() => location.reload())
```

### Publishing

We recommend sending us a pull request with your plugin so we can publish it on your behalf.

If required, you can also publish to your own NPM or a hosting service.

To load a plugin from NPM

```js
khulnasoft.plugins.replace(['@khulnasoft.com/plugin-example'])
```

#### Advanced

You can load a plugin from a specific version

```js
khulnasoft.plugins.replace(['@khulnasoft.com/plugin-example@1.0.0'])
```

Or from a URL

```js
khulnasoft.plugins.replace(['https://something.com/foo'])
```
