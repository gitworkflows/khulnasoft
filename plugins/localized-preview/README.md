# Khulnasoft Localization Switcher

👉 See [here](src/plugin.ts) for the main plugin entry and configuration

![](https://i.imgur.com/9cTB7zp.png)

![](https://i.imgur.com/GM9braZ.png)

## Getting started

Add your default and alternate locales. These locales must also be configured in your NextJS i18n config. Currently supports path based localization (ie /fr).

### Install

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd plugins/localization
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

Used in production at [www.wecre8websites.com](https://www.wecre8websites.com)!
