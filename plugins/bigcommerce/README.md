# Khulnasoft.com BigCommerce plugin

The BigCommerce plugin helps you connect your BigCommerce catalog to your Khulnasoft.com content.

## Setting up the plugin for use in Khulnasoft

For detailed instructions, visit the official documentation, [Setting Up the BigCommerce Plugin](https://www.khulnasoft.com/c/docs/plugins-ecom-bigcommerce). 

## Developing the plugin 

If you're already familiar with the BigCommerce plugin and want to contribute to its development, follow the instructions in this section.

### Installing

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd plugins/bigcommerce
npm install
```

### Running

```bash
npm start
```

### Adding the plugin in Khulnasoft.com

Go to [khulnasoft.com/account/organization](https://khulnasoft.com/account/organization) and add the localhost URL to the plugin from the plugin settings (`http://localhost:1268/plugin.system.js?pluginId=@khulnasoft.com/plugin-bigcommerce`)

**NOTE:** Loading `http://` content on an `https://` website will give you a warning. Be sure to click the shield in the top right of your browser and choose "load unsafe scripts" to allow the HTTP content on Khulnasoft's HTTPS site when developing locally

<img alt="Load unsafe script example" src="https://i.stack.imgur.com/uSaLL.png">

Now as you develop you can restart Khulnasoft to get the latest version of your plugin.

To uninstall your plugin, remove it in the [Plugins section of Khulnasoft](https://khulnasoft.com/app/integrations).

### Using the plugin

Try creating a custom [model](https://khulnasoft.com/c/docs/guides/getting-started-with-models), [component](https://khulnasoft.com/c/docs/custom-react-components), or [symbol](https://khulnasoft.com/c/docs/guides/symbols) using a Bigcommerce field, and edit away!

<img src="https://i.imgur.com/uVOLn7A.gif" alt="Seeing your plugin in the editor example gif">

### Frameworks

Khulnasoft.com uses [React](https://github.com/facebook/react) and [Material UI](https://github.com/mui-org/material-ui) for the UI, and [Emotion](https://github.com/emotion-js/emotion) for styling.

Using these frameworks in Khulnasoft plugins ensures a better experience and performance.
