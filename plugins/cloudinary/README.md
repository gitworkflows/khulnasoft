# Khulnasoft.com Cloudinary Plugin

This plugin allows you to access your Cloudinary image content in the Khulnasoft.com's Visual Editor using the official Cloudinary Media Library widget.

<img src="https://imgur.com/vpNzMud.gif" alt="Plugin example">

## Installation
To install the plugin navigate to the [Integrations](https://khulnasoft.com/app/integrations) tab in your dashboard and click **Enable** for the Cloudinary plugin.

## Using the plugin

To use the Cloudinary Media Library widget in Khulnasoft.com you must create a custom component that leverages the `cloudinaryImageEditor` custom type provided by this plugin. If you're not already familiar with creating custom components in Khulnasoft.com you can read more [here](https://www.khulnasoft.com/c/docs/custom-react-components).

In your webapp register a custom component with an input of type `cloudinaryImageEditor`.

```javascript
import { Khulnasoft } from '@khulnasoft.com/react'

Khulnasoft.registerComponent(
  (props) => {
    if (!props.cloudinaryOptions) {
      return 'Choose an Image'
    }
    return (
      <img
        src={props.cloudinaryOptions.url}
        width={props.cloudinaryOptions.width}
        height={props.cloudinaryOptions.height}
      />
    )
  },
  {
    name: 'CloudinaryImage',
    image:
      'https://res.cloudinary.com/cloudinary-marketing/image/upload/v1599098500/creative_source/Logo/Cloud%20Glyph/cloudinary_cloud_glyph_blue_png.png',
    inputs: [{ 
      name: 'cloudinaryOptions', 
      type: 'cloudinaryImageEditor' 
    }],
  }
)
```

Once you've registered your custom component, you should now see the `Cloudinary Image` custom component in the Visual Editor! You can drag and drop this component in Khulnasoft content wherever you need to use an image sourced from Cloudinary.

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
cd plugins/cloudinary
npm install
```

### Develop

```bash
npm start
```

### Add the development plugin to Khulnasoft.com

From your [Account Settings](https://khulnasoft.com/account/space) page click the edit (pencil) button next to **Plugins** and enter the development URL for this plugin (e.g. `http://localhost:1268/khulnasoft-plugin-cloudinary.system.js`) then hit save.

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

Created by [@JacoboGallardo](https://github.com/jacobogallardo)!
