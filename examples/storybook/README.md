## Khulnasoft.com custom design system example

> ✨ **Try it live [here](https://khulnasoft-storybook.firebaseapp.com/)**!

In this example we show how to integrate react components with [Khulnasoft.com](https://khulnasoft.com). This is useful when you want to add the ability for your team to utilize custom components on the pages you build using the Khulnasoft editor, or even want to make it so people on your team can only build and edit your site's pages using your custom components.

> ⚛️ For serve side rendered examples see our [Next.js](https://github.com/khulnasoft-com/khulnasoft/tree/main/examples/next-js) and [Gatsby](https://github.com/KhulnasoftIO/gatsby-starter-khulnasoft) examples

The source code for the custom components used in this demo are [here](src/components), and you can see how they are registered with Khulnasoft by looking at the files that end in `*.khulnasoft.js` ([this is an example](https://github.com/khulnasoft-com/khulnasoft/blob/main/examples/react-design-system/src/components/ProductsList/ProductsList.khulnasoft.js)). The logic for adding components to the Khulnasoft editor menu can be found [here](https://github.com/khulnasoft-com/khulnasoft/blob/main/examples/react-design-system/src/khulnasoft-settings.js)

> 👉**Tip: want to limit page building to only your components? Try [components only mode](https://khulnasoft.com/c/docs/guides/components-only-mode)**

<img src="https://imgur.com/PJW3b4S.gif" alt="example" />

### To run the example Locally

- [Sign in or create an account](https://khulnasoft.com)
- Create a new page
- Clone and start the project:

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd examples/storybook
npm install
```

To Run storybook

```
npm run storybook
```

To run the app

```
npm run start
```

- Now that you have the development server running on localhost, update the preview URL of the Khulnasoft.com entry you created to : `http://localhost:3000/home`

<img width="796" alt="Screen Shot 2020-02-18 at 9 48 51 AM" src="https://user-images.githubusercontent.com/5093430/74763082-f5457100-5233-11ea-870b-a1b17c7f99fe.png">

This will allow Khulnasoft to read in all your custom component logic and allow your team to edit and build using your components.

When you deploy this to a live or staging environment, you can change the preview URL for your model globally from [khulnasoft.com/models](https://khulnasoft.com/models) (see more about models [here](https://khulnasoft.com/c/docs/guides/getting-started-with-models) and preview urls [here](https://khulnasoft.com/c/docs/guides/preview-url))
