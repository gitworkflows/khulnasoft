## When should I use this SDK (please read carefully)

- you should ONLY use this SDK if you are trying to [register](https://www.khulnasoft.com/c/docs/custom-components-setup) your RSCs (react server components) in Khulnasoft. That is its only advantage over our standard React SDKs.
- our [Gen1](../../../react/) and [Gen2](../react/) React SDKs work perfectly well with all versions of Next.js. The only feature they do not support is registration of RSCs.
- this SDK only works in the NextJS App Directory.

To allow registering RSCs, this SDK must make compromises. Most notably:

- it does not support interactive Khulnasoft features within the rendered content (such as updating dynamic bindings, state, actions etc.). As of today, there are no workarounds around these limitations, due to how RSCs work. See the [features grid](https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/sdks#features) for more information.
- the visual editor experience is laggy, as it requires network roundtrips to the customer's servers for each edit. We are working on improving this.

this SDK is marked as "Beta" due to the missing features mentioned above. It is however actively maintained and developed alongside all other SDKs.

# Khulnasoft.com React NextJS SDK (BETA)

This is the Khulnasoft NextJS SDK, `@khulnasoft.com/sdk-react-nextjs`. It is intended to be used _only_ with NextJS's app directory, and has hard dependencies on NextJS-specific functionality that only works in the app directory.

## Usage

When registering a custom component, you will need to add the `isRSC: true` option to the component. For example:

```tsx
// CatFacts.tsx
async function CatFacts() {
  const catFacts = await fetch('https://cat-fact.herokuapp.com/facts').then(
    (x) => x.json()
  );
  return (
    <div>
      Here are some cat facts from an RSC:
      <ul>
        {catFacts.slice(3).map((fact) => (
          <li key={fact._id}>{fact.text}</li>
        ))}
      </ul>
    </div>
  );
}

export const CatFactsInfo = {
  name: 'CatFacts',
  component: CatFacts,
  // You must add the below option or the SDK will fail to render.
  isRSC: true,
};
```

And in your `page.tsx`, you can use the custom component like this:

```tsx
// page.tsx
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-react-nextjs';
import { CatFactsInfo } from './CatFacts';

export default async function Page(props) {
  const urlPath = '/' + (props.params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    model: 'page',
    apiKey,
    options: getKhulnasoftSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  return (
    <Content
      content={content}
      model="page"
      apiKey={apiKey}
      customComponents={[CatFactsInfo]}
    />
  );
}
```

For more usage information, look at the [examples](#examples).

## Mitosis

This SDK is generated by [Mitosis](https://github.com/KhulnasoftIO/mitosis). To see the Mitosis source-code, go [here](../../).

## Feature Support

To check the status of the SDK, look at [these tables](../../README.md#feature-implementation).

## Getting Started

```
npm install @khulnasoft.com/sdk-react-nextjs
```

## Examples

- [Next.js SDK](../../../../examples/next-js-sdk-gen-2-experimental-app-directory)
