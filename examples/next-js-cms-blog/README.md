# A statically generated blog example using Next.js and Khulnasoft.com

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using [Khulnasoft.com](https://khulnasoft.com/) as CMS and editor.

## Live Demo

[Live demo](https://nextjs-blog-demo-eight.vercel.app/)

## Requirements

Before you begin, ensure that you have the following accounts set up:

-   [Khulnasoft.com Account](https://khulnasoft.com)
-   Node 14 or later
-   yarn


### Getting started with Khulnasoft.com :
  - [1: Create an account for Khulnasoft.com](#1-create-an-account-for-khulnasoftio)
  - [2: Your Khulnasoft.com private key](#2-your-khulnasoftio-private-key)
  - [3: Clone this repository and initialize a Khulnasoft.com space](#3-clone-this-repository-and-initialize-a-khulnasoftio-space)

### Step 1 Install the Khulnasoft.com cli

```
npm install @khulnasoft.com/cli -g
```

### Step 2 Generate a space

[Signup for Khulnasoft.com](https://khulnasoft.com/signup), then go to your [organization settings page](https://khulnasoft.com/account/organization?root=true), create a private key and copy it and supply it for `[private-key]` below. For `[space-name]` create a name for your space, such as "Blog"

```
khulnasoft create -k [private-key] -n [space-name] -d
```

This command when done it'll print your new space's public api key, copy it and add as the value for `NEXT_PUBLIC_KHULNASOFT_API_KEY` into the .env file

``` bash
  ____            _   _       _                     _                    _   _ 
| __ )   _   _  (_) | |   __| |   ___   _ __      (_)   ___       ___  | | (_)
|  _ \  | | | | | | | |  / _` |  / _ \ | '__|     | |  / _ \     / __| | | | |
| |_) | | |_| | | | | | | (_| | |  __/ | |     _  | | | (_) |   | (__  | | | |
|____/   \__,_| |_| |_|  \__,_|  \___| |_|    (_) |_|  \___/     \___| |_| |_|

|████████████████████████████████████████| product-footer writing schema.json | 1/1
|████████████████████████████████████████| announcement-bar: writing schema.json | 1/1
|████████████████████████████████████████| category-hero: writing schema.json | 1/1
|████████████████████████████████████████| page: writing schema.json | 2/2


Your new space "blog demo" public API Key: <your new api key>
```

Copy the created API key and add it to your .env file: 

```
KHULNASOFT_PUBLIC_KEY=<your new api key>
```

### Step 3 Run Next.js in development mode

```bash
yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, you can post on [GitHub discussions](https://github.com/vercel/next.js/discussions).


