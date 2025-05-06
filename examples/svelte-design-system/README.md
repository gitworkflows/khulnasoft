## Khulnasoft.com custom design system example with Svelte

### Built with [Svelte Kit](https://kit.svelte.dev/) + [Svelte Material UI](https://sveltematerialui.com) + [Khulnasoft](https://khulnasoft.com)

> ✨ **Try it live [here](https://svelte-design-system.vercel.app/)**!

In this example we show how to integrate Svelte components with [Khulnasoft.com](https://khulnasoft.com). This is useful when you want to add the ability for your team to utilize custom components on the pages you build using the Khulnasoft editor, or even want to make it so people on your team can only build and edit your site's pages using your custom components.

> ⚛️ For other basic examples see [here](https://github.com/khulnasoft-com/khulnasoft/tree/main/examples/svelte)

The source code for the custom components used in this demo are [here](src/components), and you can see how they are registered with Khulnasoft by looking at the files that end in `*.khulnasoft.js` ([this is an example](https://github.com/khulnasoft-com/khulnasoft/blob/main/examples/svelte-design-system/src/components/Button/Button.khulnasoft.js)). The logic for adding components to the Khulnasoft editor menu can be found [here](https://github.com/khulnasoft-com/khulnasoft/blob/main/examples/svelte-design-system/src/lib/Khulnasoft.svelte)

> 👉**Tip:** want to limit page building to only your components? Try [components only mode](https://khulnasoft.com/c/docs/guides/components-only-mode)

<img src="https://imgur.com/PJW3b4S.gif" alt="example" />

### To run the example Locally

- [Sign in or create an account](https://khulnasoft.com)
- Create a new page
- Clone and start the project:

### Clone and install dependencies

using git

```bash
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd examples/svelte-design-system
npm install
```

### Generate your Khulnasoft.com space

<!-- TODO: link "private key" to a forum post or doc showing how to create that -->

[Signup for Khulnasoft.com](khulnasoft.com/signup), then go to your [organization settings page](https://khulnasoft.com/account/organization?root=true), create a private key and copy it, then create your space and give it a name

From the `examples/svelte-design-system` folder

```
khulnasoft create -k [private-key] -n [space-name] -d
```

This command when done it'll print your new space's public api key, copy it and add as the value for `VITE_KHULNASOFT_PUBLIC_API_KEY` in [khulnasoft-settings](./src/khulnasoft-settings.s)

```
VITE_KHULNASOFT_PUBLIC_API_KEY=...
```

### Run the dev server

```
npm run dev
```

It'll start a dev server at `http://localhost:3000`

<img width="796" alt="Screen Shot 2020-02-18 at 9 48 51 AM" src="https://user-images.githubusercontent.com/5093430/74763082-f5457100-5233-11ea-870b-a1b17c7f99fe.png">

This will allow Khulnasoft to read in all your custom component logic and allow your team to edit and build using your components.

When you deploy this to a live or staging environment, you can change the preview URL for your model globally from [khulnasoft.com/models](https://khulnasoft.com/models) (see more about models [here](https://khulnasoft.com/c/docs/guides/getting-started-with-models) and preview urls [here](https://khulnasoft.com/c/docs/guides/preview-url))
