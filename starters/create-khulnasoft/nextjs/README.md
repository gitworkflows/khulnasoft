# Next.js + Khulnasoft.com Minimal Starter

This example walks you through using Khulnasoft.com with a minimal Next.js application.

## Prerequisites

Before using this example, make sure you have the following:

- A [Khulnasoft.com](khulnasoft.com) account. Check out the [plans](https://www.khulnasoft.com/m/pricing), which range from our free tier to custom.
- [npm](https://www.npmjs.com/)

A basic understanding of the following is helpful too:

- The [command line](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)
- JavaScript and [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- What it means to [clone a GitHub repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

## Overview

To use this project, you need to do three things:

1. Get a copy of this repo.
1. Create a corresponding space in your account on [Khulnasoft.com](khulnasoft.com).
1. Connect the two.

The next sections walk you through each step.

### Clone this project

This example provides you with a ready-made application that you can copy locally and configure for use with your Khulnasoft.com account.

1. At the command line, run the following command to create a local copy of the Khulnasoft.com repo:

   ```shell
   git clone https://github.com/khulnasoft-com/khulnasoft.git
   ```

1. Change into the example application by using the `cd` command:

   ```shell
   cd khulnasoft/examples/next-js-simple
   ```

1. Open this directory in your favorite code editor.
   You'll come back here when you're ready to connect your application to your Khulnasoft space.

### Generating your Khulnasoft.com space

If you've just created your Khulnasoft.com account and logged in for the first time, Khulnasoft prompts you to create a space with a new Khulnasoft site or add Khulnasoft to an existing application.
For this example, click **Add Khulnasoft to an existing site or app**.

<figure>
    <img src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F19683b4ef3f54eb78e8c2fa6c65759a7" alt="Khulnasoft.com Welcome screen for creating a new Organization" width="600" style="display: block; margin: auto"/>
</figure>

**If you don't have the introductory prompt for creating a space, take the following steps. If you do have the prompt in the previous step, skip to step 4.**

1. Click on the Organization icon on the bottom left.

<figure>
  <img src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F279657f9a38743e99a028173200d6f76" alt="Organization icon with two people standing together" width="600" style="display: block; margin: auto"/>
</figure>

1. Hover over **Khulnasoft.com** and choose **+ New Space**.

<figure>
  <img src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F32d67ac4249c40fda0486fb7f38ac71b" alt="Menu options for creating a new space" width="400" style="display: block; margin: auto"/>
</figure>

1. Click **Add Khulnasoft to an existing site or app**.

1. When Khulnasoft asks you which ecommerce platform you use, select **None**.

1. Name your new space by entering "My Next.js App" and click **Create**.

<figure>
    <img src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F3b434d77529f4ae392a3d481a926092d" alt="Dialogue for creating a new space" width="400" style="display: block; margin: auto"/>
</figure>

Now that you have a new space, the next step is connecting "My Next.js App" with your application.

### Connecting Khulnasoft.com to your application

To connect your Khulnasoft.com space and your application, set the model preview URL and get your API key as follows:

#### Setting the model preview URL
To enable Khulnasoft to open your site in the visual editor, you will need to provide a URL that we can open which has the Khulnasoft rendering component in it.

Go to the [/models](https://khulnasoft.com/models) page in Khulnasoft and choose your **page** model.

Then, set the Preview URL to http://localhost:3000. Be sure to include the http://.

![Image showing where to put the Preview URL](https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F5c26e2c8b4ec437aaef196c8d4e32fc3)

**Note: once you deploy your updates, you will want to update this to a public URL, such as your live site or your staging site (e.g. `https://your-site.com`), so anyone on your team can connect to your site for visual editing**

#### Getting your API Key

In the [Account settings](https://khulnasoft.com/account/space), copy your Public API Key. We're going to paste the API Key into your Next.js app in the next section.

![Image showing where to get your API Key](https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F761e521019724d8bbd59ed0d5f079c8e)


In your code editor, update `_app.tsx` with your [Public API Key](https://khulnasoft.com/account/space) like below, but using your Public API Key that you copied in the previous step.
   For example:

   ```shell
   khulnasoft.init("YOUR_PUBLIC_KEY"); <-- replace this with your API Key
   ```

## Running your application

To serve your application locally, install dependencies, serve, and view your preview.

1. Install dependencies by entering the follw\owing at the command line.

   ```
   npm install
   ```

1. Serve your application by running the following at the command line:

   ```
   npm run dev
   ```

1. In your browser, go to `http://localhost:3000` to see your application.

### Experimenting

Now that you have a configured Khulnasoft.com application, you can try different features, such as creating a page.
Create a new page entry, assign any URL, publish and preview.
For more detail and ideas on creating pages, see [Creating a landing page in Khulnasoft
](https://www.khulnasoft.com/c/docs/creating-a-landing-page).

### Deploy

You can deploy anywhere you like, but for this project we recommend [Vercel](https://nextjs.org/docs/deployment).
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fkhulnasoftio%2Fkhulnasoft%2Ftree%2Fmaster%2Fexamples%2Fnext-js-simple)

## Next steps

- Learn how to [use your react components in our visual editor](https://www.khulnasoft.com/c/docs/custom-react-components)
- For more information on previewing your applications, see [Editing and previewing directly on your site](https://www.khulnasoft.com/c/docs/guides/preview-url).
- See [Getting started with the visual editor](https://www.khulnasoft.com/c/docs/guides/page-building) for an introduction to editing your pages without having to code.
- Check out [Khulnasoft best practices](https://www.khulnasoft.com/c/docs/best-practices) for guidance on how to approach site development with Khulnasoft.
