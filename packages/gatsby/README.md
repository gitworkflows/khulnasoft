# @khulnasoft.com/gatsby

Plugin for integrating [Khulnasoft.com](https://www.khulnasoft.com) to allow drag and drop page building with Gatsby. It puts the Khulnasoft.com schema under an `allKhulnasoftModels` field of the Gatsby GraphQL query, If a templates map is passed as option, this plugin will create gatsby pages dynamically for each page entry in khulnasoft.com on the path specified.

<img src="https://imgur.com/PJW3b4S.gif" alt="example" />

## Install

`npm install @khulnasoft.com/gatsby`

## How to use

Make a free account over at [Khulnasoft.com](https://www.khulnasoft.com/) and grab your public API key from your [organization page](https://khulnasoft.com/account/organization) and:

```javascript
// In your gatsby-config.js
const path = require('path');
module.exports = {
  plugins: [
    {
      resolve: '@khulnasoft.com/gatsby',
      options: {
        // public API Key
        publicAPIKey: 'MY_PUBLIC_API_KEY',
        // OPTIONAL
        // Set this to `true` to rely on our cached content. Default value is `false`, always fetching the newest content from Khulnasoft.
        useCache: false,
        // OPTIONAL
        // mapping model names to template files, the plugin will create a page for each entry of the model at its specified url
        templates: {
          // `page` can be any model of choice, camelCased
          page: path.resolve('templates/my-page.tsx'),
        },
        // OPTIONAL
        mapEntryToContext: async ({ entry, graphql }) => {
          const result = await graphql('....');
          return {
            property: entry.data.property,
            anotherProperty: entry.data.whatever,
            dataFromQuery: result.data
            /* ... */
          };
        },
        // OPTIONAL
        // to resolve a single entry to multiple, for e.g in localization
        resolveDynamicEntries: async (entries) => {
          const entriesToBuild = []
          for entry of entries {
            if (entry.data.myprop.isDynamic){
               entriesToBuild.push(await myEntryResolver(entry))
            }
            else {
               entriesToBuild.push(entry)
            }
          }
          return entriesToBuild;
        },
      },
    },
  ],
};
```

Then start building pages in Khulnasoft.com, hit publish, and they will be incluced in your Gatsby site on each new build!

For a more advanced example and a starter check out [gatsby-starter-khulnasoft](https://github.com/KhulnasoftIO/gatsby-starter-khulnasoft)

## Using your components in the editor

See this [design systems example](/examples/react-design-system) for lots of examples using your deisgn system + custom components

👉**Tip: want to limit page building to only your components? Try [components only mode](https://khulnasoft.com/c/docs/guides/components-only-mode)**

Register a component

```tsx
import { Khulnasoft } from '@khulnasoft.com/react';

class SimpleText extends React.Component {
  render() {
    return <h1>{this.props.text}</h1>;
  }
}

Khulnasoft.registerComponent(SimpleText, {
  name: 'Simple Text',
  inputs: [{ name: 'text', type: 'string' }],
});
```

## How to Query

For an up-to-date complete examples check out the [Gatsby + Khulnasoft.com starter](https://github.com/KhulnasoftIO/gatsby-starter-khulnasoft)

```graphql
{
  allKhulnasoftModels {
    myPageModel(options: { cachebust: true }) {
      content
    }
  }
}
```

## Learn more

- [Gatsby + Khulnasoft.com starter](https://github.com/KhulnasoftIO/gatsby-starter-khulnasoft)
- [Design system example](https://github.com/khulnasoft-com/khulnasoft/tree/main/examples/react-design-system)
- [Official docs](https://www.khulnasoft.com/c/docs/getting-started)
