# Example Bynder Plugin for Khulnasoft.com

Integrates Bynder's Universal Compact View with Khulnasoft as a custom input, using the `SingleSelectFile` mode, which provides asset translations and DAT. It only covers the asset selection workflow, however, and does not provide example components that consume that value (see below).

To install the plugin in your Khulnasoft.com Space:
* Navigate to Settings -> Plugins, and click the Edit button
* Click "Add Plugin" button, and enter `@khulnasoft.com/plugin-bynder` into the input field.
* An "Edit Plugin Settings" button will appear below, which will prompt you for your Bynder Portal Domain and preferred locale. 

## Notes
This is a starting point, not a complete integration. 
* The current output is the full Bynder file information object, the response from the CompactView's `onSuccess()` function. This may or may not meet your needs.
* The plugin's main setup is configured in the `plugin.ts` file. 
* UI elements that handle loading the Bynder-provided Universal Compact View asset selector, and rendering the result as a preview in the `ui.tsx` file.
* Simple utils in `utils.ts`, largely CONSTS for consistency between files.
* Bynder's docs can be found [here](https://developer-docs.bynder.com/ui-components), and their React-specific code docs [here](https://www.npmjs.com/package/@bynder/compact-view)

### Using the plugin

To use the Bynder Universal Compact View widget in Khulnasoft.com you must create a custom component or data model input that leverages the `BynderAsset` custom input type provided by this plugin. If you're not already familiar with creating custom components in Khulnasoft.com you can read more [here](https://www.khulnasoft.com/c/docs/custom-components-setup).

In your webapp register a custom component with an input of type `BynderAsset`. The following example is a basic image component, but we recommend implementing your frontend-framework's best-practice image component instead. 

```jsx
// Khulnasoft.com React Gen1 SDK example
import { Khulnasoft } from '@khulnasoft.com/react'

Khulnasoft.registerComponent(
  (props) => {
    if (!props.bynderAsset?.assets[0]) {
      return 'Choose an Image' // or render a placeholder image?
    }

    // choose the asset derivative name that matches your needs
    const {url, width, height} = props.bynderAsset.assets[0].webImage
    return (
      <img
        src={url}
        width={width}
        height={height}
      />
    )
  },
  {
    name: 'BynderImage',
    image:
      'https://unpkg.com/css.gg@2.0.0/icons/svg/image.svg',
    inputs: [{ 
      name: 'bynderAsset', 
      friendlyName: 'Bynder Asset',
      type: 'BynderAsset' 
    }],
  }
)
```

### Opportunities for further improvement:
* Provide a Bynder-specific Image component to render the Asset JSON.
* Create & implement a multi-image select handler, if valuable.
* Per-instance file-type inputs like Khulnasoft's file input component.
  * This will require an improvement on Khulnasoft's plugin side to support.
  * In the meantime, extending `BynderSingleSelect` by creating per-asset-type pickers would be the recommendation.
* Bynder's React NPM Package Bug:
  * Passing in the currently selected value does not appear to maintain the selection, despite passing in the assetID as defined in Bynder's docs.
  * Bynder is aware of this issue, and should be resolved with a new version of the Library.

### Idea: Khulnasoft Input replacement
If completely replacing access to the Khulnasoft file input component is desired, you would need to do the following:
* Change the name key from `"BynderAsset"` to `"file"` when calling `Khulnasoft.registerEditor()`
* Ensure that the only values being saved in the onChange are the final URL of the image, matching the Khulnasoft file input type's format. 
* This could also be done as a toggle, conditionally changing the plugin's name from one to the other.
* Alternatively, you can use the Khulnasoft menu registration to create custom menus that simply don't include the default file picker. 

## Plugin Development

If this plugin doesn't suit your needs and you would like to modify it for your specific use case then read on to see how you can do so! You can find general information about plugins [here](https://www.khulnasoft.com/c/docs/plugins-overview).


### Install

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd plugins/bynder-example
npm install
```

### Develop

```bash
npm run start
```

### Add the development plugin to Khulnasoft.com

From your [Space Settings](https://khulnasoft.com/account/space) (click the gear Settings icon in the left menu) click the edit button next to **Plugins**, click the "Add Plugin" and enter the development URL for this plugin in the text field (`http://localhost:1268/plugin.system.js?pluginId=@khulnasoft.com/plugin-bynder`) then hit save. The query parameter is necessary for Khulnasoft to know what the id of this plugin is, to identify the plugin's settings/configuration. 

Now as you develop you can reload the Khulnasoft interface to see the latest version of your plugin. (Plugins are loaded once per session, a refresh is required to see any code changes)

**NOTE:** Loading http:// content on an https:// website may give you a warning. Be sure to click the shield in the top right of your browser and choose "load unsafe scripts" to allow the http content on Khulnasoft's https site when developing locally.



To uninstall your plugin run just go back to your [Space Settings](https://khulnasoft.com/account/space) and click the edit button next to **Plugins**, click the X button to remove the plugin

### Frameworks

Khulnasoft.com uses [React](https://github.com/facebook/react) and [Material UI](https://github.com/mui-org/material-ui) for the UI, and [Emotion](https://github.com/emotion-js/emotion) for styling.

Using these frameworks in Khulnasoft plugins ensures best possible experience and performance.

### Publishing

If you think your plugin will benefit others in the Khulnasoft.com community you can send a pull request to this repo with your plugin, and we will review it! Otherwise, once your plugin is ready for use you can publish the package and add the link to its bundled JS in **Account Settings > Plugins** (enterprise only).


