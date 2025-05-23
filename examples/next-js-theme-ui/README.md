# Next.js + theme-ui + Khulnasoft.com starter kit

This is a starter kit for using Themes with [theme-ui](https://theme-ui.com/) + next.js and Khulnasoft.com.

Demo live at: [khulnasoft-next-js-theme-ui](https://khulnasoft-next-js-theme-ui.vercel.app)

### In this example, you should see already some content created, such as the "Theme" model with some examples, feel free to edit, delete or use it how you want.

### You can check them out at [khulnasoft.com/content](https://khulnasoft.com/content) or under /khulnasoft folder of this project.

## Goals and Features

- Ultra high performance
- SEO optimized
- Themable
- Personalizable (internationalization, a/b testing, etc)

## Table of contents

- [Getting Started](#getting-started)
  - [1: Create an account for Khulnasoft.com](#1-create-an-account-for-khulnasoftio)
  - [2: Your Khulnasoft.com private key](#2-your-khulnasoftio-private-key)
  - [3: Clone this repository and initialize a Khulnasoft.com space](#3-clone-this-repository-and-initialize-a-khulnasoftio-space)
  - [4. Up and Running!](#7-up-and-running)
- [Deploy](#deploy)

<!-- markdown-toc end -->

## Getting Started

**Pre-requisites**

This guide will assume that you have the following software installed:

- nodejs (>=12.0.0)
- npm
- git

**Introduction**

### 1: Create an account for Khulnasoft.com

Before we start, head over to Khulnasoft.com and [create an account](https://khulnasoft.com/signup).

### 2: Your Khulnasoft.com private key

Head over to your [organization settings page](https://khulnasoft.com/account/organization?root=true) and create a
private key, copy the key for the next step.

- Visit the [organization settings page](https://khulnasoft.com/account/organization?root=true), or select
  an organization from the list

![organizations drop down list](./docs/images/khulnasoft.com-organizations.png)

- Click "Account" from the left hand sidebar
- Click the edit icon for the "Private keys" row
- Copy the value of the auto-generated key, or create a new one with a name that's meaningful to you

![Example of how to get your private key](./docs/images/private-key-flow.png)

### 3: Clone this repository and initialize a Khulnasoft.com space

Next, we'll create a copy of the starter project, and create a new
[space](https://www.khulnasoft.com/c/docs/spaces) for it's content to live
in.

In the example below, replace `<private-key>` with the key you copied
in the previous step, and change `<space-name>` to something that's
meaningful to you -- don't worry, you can change it later!

```
git clone https://github.com/khulnasoft-com/khulnasoft.git
cd examples/next-js-theme-ui

npm install --global "@khulnasoft.com/cli"

khulnasoft create --key "<private-key>" --name "<space-name>" --debug
```


If this was a success you should be greeted with a message that
includes a public API key for your newly minted Khulnasoft.com space.

_Note: This command will also publish some starter khulnasoft.com cms
content from the ./khulnasoft directory to your new space when it's
created._

```bash
  ____            _   _       _                     _                    _   _
| __ )   _   _  (_) | |   __| |   ___   _ __      (_)   ___       ___  | | (_)
|  _ \  | | | | | | | |  / _` |  / _ \ | '__|     | |  / _ \     / __| | | | |
| |_) | | |_| | | | | | | (_| | |  __/ | |     _  | | | (_) |   | (__  | | | |
|____/   \__,_| |_| |_|  \__,_|  \___| |_|    (_) |_|  \___/     \___| |_| |_|

|████████████████████████████████████████| page: writing homepage.json | 2/2


Your new space "demo" public API Key: 012345abcdef0123456789abcdef0123
```

Copy the public API key ("012345abcdef0123456789abcdef0123" in the example above) for the next step.

This starter project uses dotenv files to configure environment variables.
Open the files [.env.development](./.env.development) and
[.env.production](./.env.production) in your favorite text editor, and
set the value of `KHULNASOFT_PUBLIC_KEY` to the public key you just copied.
You can ignore the other variables for now, we'll set them later.

```diff
+ KHULNASOFT_PUBLIC_KEY=012345abcdef0123456789abcdef0123
- KHULNASOFT_PUBLIC_KEY=
```

### 4. Up and Running!

The hard part is over, all you have to do is start up the project now.

```bash
npm install
npm run dev
```

This will start a server at `http://localhost:3000`.

### Start building

Now that we have everything setup, start building and publishing pages on khulnasoft.com, for a demo on building something similar to the [demo homepage](https://headless.khulnasofts), follow the steps in this [short video](https://www.loom.com/share/9b947acbbf714ee3ac6c319c130cdb85)

## Deployment Options

You can deploy this code anywhere you like - you can find many deployment options for Next.js [here](https://nextjs.org/docs/deployment). The following options support one click installs and are super easy to start with:

- Vercel: for more information check [Vercel docs on Next.js deployments](https://vercel.com/docs/next.js/overview).

- Netlify: For more information check [Netlify docs on Next.js deployments](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/).
