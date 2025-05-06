# Khulnasoft.com Cloudinary Multiple Image Plugin

This plugin is specifically designed to select multiple images from Cloudinary image content in the Khulnasoft.com's Visual Editor using the official Cloudinary Media Library widget. It will create a list item for each selected image.

<img src="https://imgur.com/vpNzMud.gif" alt="Plugin example">

## Installation
To install the plugin navigate to the [Integrations](https://khulnasoft.com/app/integrations) tab in your dashboard and click **Enable** for the Cloudinary Multiple Image Picker plugin.

## Using the plugin

In your Model, if you have a field of type List. Then one subField can be of type Cloudinary Multiple Image Picker. This will allow you to select multiple images from the Cloudinary Window. For each image selected it will create a list item with other fields as well. 
This will be useful when users have to create list items and add image to each item.
Check this loom to understand more. 

https://www.loom.com/share/c53b49f16d1e4c148219aa833ea7e49a




### Setup

The first time you use the component, you will be prompted to authenticate your Cloudinary account. The Cloudinary Image editor contains 2 buttons:

- `SET CREDENTIALS`: This brings up a dialog to set your Cloudinary credentials (`API key` and `Cloud Name`). In order to work, you need to have SSO enabled and be previously logged in (current version does not support other authentication approaches).

- `CHOOSE IMAGE`: Once your credentials are set (you only need to do this once) a new dialog will appear with the a Cloudinary media library browser. Select your asset and click the `INSERT` button to insert the image into your page. Only one selection at a time is supported.

---

## Plugin Development
If this plugin doesn't suit your needs and you would like to modify it for your specific use case then read on to see how you can do so! You can find general information about plugins [here](https://www.khulnasoft.com/c/docs/plugins-overview).

See [here](src/CloudinaryImageEditor.tsx) for the React component that powers this plugin

### Install

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd plugins/multi-cloudinary
npm install
```

### Develop

```bash
npm start
```

### Add the development plugin to Khulnasoft.com

From your [Account Settings](https://khulnasoft.com/account/space) page click the edit (pencil) button next to **Plugins** and enter the development URL for this plugin (e.g. `http://localhost:1268/khulnasoft-plugin-multi-select-cloudinary.system.js`) then hit save.

**NOTE:** Loading http:// content on an https:// website will give you a warning. Be sure to click the shield in the top right of your browser and choose "load unsafe scripts" to allow the http content on Khulnasoft's https site when devloping locally

<img alt="Load unsafe script example" src="https://i.stack.imgur.com/uSaLL.png">

Now as you develop you can restart Khulnasoft to see the latest version of your plugin.

To uninstall your plugin run just go back to your [Account Settings](https://khulnasoft.com/account/space) and click the edit (pencil) button next to **Plugins**, delete your development URL from the list and save

### Frameworks

Khulnasoft.com uses [React](https://github.com/facebook/react) and [Material UI](https://github.com/mui-org/material-ui) for the UI, and [Emotion](https://github.com/emotion-js/emotion) for styling.

Using these frameworks in Khulnasoft plugins ensures best possible experience and performance.

### Publishing

If you think your plugin will benefit others in the Khulnasoft.com community you can send a pull request to this repo with your plugin, and we will review it! Otherwise, once your plugin is ready for use you can publish the package and add the link to its bundled JS in **Account Settings > Plugins** (enterprise only).

---
## Contributors

Created by [@anaghav2023](https://github.com/anaghav2023)!
