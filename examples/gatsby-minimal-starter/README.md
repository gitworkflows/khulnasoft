<h1 align="center">
  Using Khulnasoft.com with Gatsby
</h1>

> A demo for integrating [Khulnasoft.com](https://www.khulnasoft.com) with Gatsby using our GraphQL API and the `@khulnasoft.com/gatsby` plugin

This demo demonstrates creating dynamic pages in Khulnasoft.com on new URLs and generating them with Gatsby, as well
as rendering specific parts of your site with Khulnasoft.com content via GraphQL queries (e.g. for pages, components, etc)

Run this example Gatsby project to see sample khulnasoft data, or replace the api key with your own to set up a Khulnasoft playground to learn how to integrate with Gatsby.

- [src/components/hero.khulnasoft.js](src/components/hero.khulnasoft.js) for an example of using a custom react component in the Khulnasoft.com visiual editor. See a more rich example of a whole design system of components [here](https://github.com/khulnasoft-com/khulnasoft/tree/main/examples/react-design-system)
- [gatsby-config.js](gatsby-config.js) to set your API key

## 🚀 Quick start

1.  **Sign up for Khulnasoft.com**
    Then replace the demo API key in gatsby-config.js with your public API key, which you can find in [khulnasoft.com/account/organization](https://khulnasoft.com/account/organization)

2.  **Clone this demo.**

    ```bash
    git clone git@github.com:khulnasoft-com/khulnasoft.git
    cd khulnasoft/examples/gatsby
    npm install
    npm run start
    ```

3.  **Connect Khulnasoft.com to your localhost**
  Now that you have the development server running on localhost, point the Khulnasoft.com entry to it by assigning the preview URL to be `http://localhost:8000`

When you deploy this to a live or staging environment, you can change the preview URL for your model globally from [khulnasoft.com/models](https://khulnasoft.com/models) (see more about models [here](https://khulnasoft.com/c/docs/guides/getting-started-with-models) and preview urls [here](https://khulnasoft.com/c/docs/guides/preview-url))

This example create pages dynamically based on the url you add to your entries on [Khulnasoft.com](https://www.khulnasoft.com), if you want to create a page manually, do not include the model in your `templates` config as above, add a file under the `pages` folder and query all the entries your page needs from Khulnasoft.com, for example:


```js
import React from 'react';
import { graphql } from 'gatsby';
import { KhulnasoftComponent } from '@khulnasoft.com/react';


const ExamplePage = () => {
 
    const { header, page } = this.props.data.allKhulnasoftModels;
    return (
      <div>
        {/* next line assumes you have a header model in khulnasoft.com, alternatively you use your own <Header /> component here */}
        <KhulnasoftComponent model="header" content={header[0].content} />
        {/* Render other things in your code as you choose */}
        <KhulnasoftComponent model="page" content={page[0].content} />
      </div>
    );
  
}

export default ExamplePage;

// See https://khulnasoft.com/c/docs/graphql-api for more info on our
// GraphQL API and our explorer
export const pageQuery = graphql`
  query {
    allKhulnasoftModels {
      # (optional) custom "header" component model
      header(limit: 1, options: { cachebust: true }) {
        content
      }
      # Manually grab the example content matching "/"
      # For Gatsby content, we always want to make sure we are getting fresh content
      example(
        limit: 1
        target: { urlPath: "/" }
        options: { cachebust: true }
      ) {
        content
      }
    }
  }
`;
```
