# DEVELOPER

This documentation contains instructions on how to setup the environment and develop Qwik SDK.

## Setup

There are many different ways you can set up your environment to develop Qwik SDK, but here is the one which works well for me, and so if you are new to Qwik SDK development you should consider this as a starting point. Feel free to tweak as you see fit after you get familiar with the development.

## Directory Layout

When working on Qwik SDK you will often times need to make changes to, mitosis, qwik, SDK, and a test file. For this reason all of these repositories and testing folders should be next to each other.

Setup your directory structure as shown here:

```bash
- qwik-sdk-workspace/
  - khulnasoft/              # git clone git@github.com:khulnasoft-com/khulnasoft.git
  - qwik/                 # git clone git@github.com:KhulnasoftIO/qwik.git
  - mitosis/              # git clone git@github.com:KhulnasoftIO/mitosis.git
  - test/                 # npm create qwik@latest # QwikCity starter project
```

## VS Code

I usually open the `qwik-sdk-workspace` folder in VS Code so that I can easily open and edit any of the files.

## NPM Symlinks

When developing Qwik SDK you may need to change many different repos. For this reason set up the symlinks as shown here:

```bash
- qwik-sdk-workspace/
  - khulnasoft/
    - packages/
      - sdks/
        - NPM: @khulnasoft.com/mitosis => ../../../mitosis/packages/core
  - qwik/
  - mitosis/
  - test/
    - NPM: @khulnasoft.com/qwik => ../qwik/packages/core
```

## Building / Running

- Mitosis

  ```bash
  cd mitosis/packages/core
  yarn start   # Will automatically build and run the SDK
  ```

- Khulnasoft

  ```bash
  cd khulnasoft/packages/sdks
  yarn build  # Will build the SDK by running mitosis on SDK inputs
  ```

- Qwik

  ```bash
  cd qwik/
  yarn build.full
  ```

- Test App
  ```bash
  cd test/
  yarn build.ssr
  ```

## Test application for Qwik SDK

In the Qwik-city create a `[index.tsx]` which will intercept all of the URL requests. Then use something like this to render the content from the Qwik SDK:

```typescript
export default component$((props: MainProps) => {
  const context = useStore({});

  useContextProvider(khulnasoftContext, context);
  const KHULNASOFT_PUBLIC_API_KEY = 'f1a790f8c3204b3b8c5c1795aeac4660'; // ggignore
  const contentRsrc = useResource$<any>(() => {
    const url = new URL(props.url);
    return getContent({
      model: 'page',
      apiKey: KHULNASOFT_PUBLIC_API_KEY,
      userAttributes: {
        urlPath: url.pathname || '/',
      },
    });
  });

  return (
    <Host>
      <Resource
        resource={contentRsrc}
        onPending={() => <div>Loading...</div>}
        onResolved={(content) => {
          return (
            <RenderContent
              model="page"
              content={content}
              apiKey={KHULNASOFT_PUBLIC_API_KEY}
            />
          );
        }}
      />
    </Host>
  );
});
```

## Testing Pages for SDK

1. Open https://khulnasoft.com/spaces
2. Open https://khulnasoft.com/content/037948e52eaf4743afed464f02c70da4 to see the content.
3. Editing content should work with the SDK. (to be fixed)
4. To navigate to the workspace cmnd-p: `org f1a790f8c3204b3b8c5c1795aeac4660`
