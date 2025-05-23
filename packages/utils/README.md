# Khulnasoft Utils

A collection of handy utilities when working with Khulnasoft content

## getAsyncProps

For cases where you want to render Khulnasoft content server side with custom data included at server side render time, you can use our `getAsyncProps` helper

### Example

Say you have a component that takes input props and also fetches data sync

```tsx
import { Khulnasoft } from '@khulnasoft.com/react';

export function Products(props) {
  const data = props.data || useProductData(props.category);
  return <>{data.products.map(/*...*/)}</>;
}

Khulnasoft.registerComponent(Products, {
  name: 'Products',
  inputs: [{ name: 'category', type: 'string', enum: ['men', 'women'] }],
});
```

This component will update to fetch product data browser side by category chosen in the Khulnasoft editor. But if you want this to render server side you need `props.data` to be passed with the needed data on render.

To accomplish this, you can use `getAsyncProps`.

Here is a usage example with Next.js:

```tsx
import { Khulnasoft, khulnasoft } from '@khulnasoft.com/react';
import { getAsyncProps } from '@khulnasoft.com/utils';

export default function MyPage(props) {
  return <KhulnasoftComponent model="page" content={props.content} />;
}

export async function getStaticProps(context) {
  const content = await khulnasoft.get('page', { url: context.resolvedUrl }).promise();

  await getAsyncProps(content, {
    async Products(props) {
      return {
        data: await fetch(`${apiRoot}/products?cat=${props.category}`).then(res => res.json()),
      };
    },
  });

  return { props: { content } };
}
```

## extendAsyncProps

`extendAsyncProps` works by extending any component options (props) that matches the mapper asynchrnously.

### Example

Say you have multiple components that take a query input and you want to resolve this query asynchronously before rendering on the server

```tsx
import { Khulnasoft } from '@khulnasoft.com/react';

export function ProductGrid(props) {
  const products = props.products || useProductData(props.productsQuery);
  return <>{products.map(/*...*/)}</>;
}
const customQueryInput = {
  name: 'productsQuery',
  type: 'object',
  helperText: 'shopify products query input ',
  defaultValue: {
    sortBy: 'RELEVANCE',
    first: 3,
    query: 'shirt',
  },
  subFields: [
    {
      type: 'string',
      name: 'query',
      helperText: 'for syntax check https://shopify.dev/concepts/about-apis/search-syntax',
    },
    {
      type: 'enum',
      name: 'sortBy',
      enum: [
        {
          label: 'product ID',
          value: 'ID',
        },
        {
          label: 'Date of creation',
          value: 'CREATED_AT',
        },
      ],
    },
    {
      type: 'number',
      name: 'first',
    },
    {
      type: 'number',
      name: 'last',
    },
    {
      type: 'boolean',
      name: 'reverse',
    },
  ],
}
Khulnasoft.registerComponent(Products, {
  name: 'ProductGrid', inputs: [customQueryInput}]
})
// another component
Khulnasoft.registerComponent(ProductsSlider, {
  name: 'ProductsSlider', inputs: [customQueryInput}]
})

```

This component will update to fetch product data browser side by query chosen in the Khulnasoft editor. But if you want this to render server side you need `props.products` to be passed with the needed data on render.

To accomplish this, you can use `extendAsyncProps`.

Here is a usage example with Next.js:

```tsx
import { Khulnasoft, khulnasoft } from '@khulnasoft.com/react';
import { extendAsyncProps } from '@khulnasoft.com/utils';

export default function MyPage(props) {
  return <KhulnasoftComponent model="page" content={props.content} />;
}

export async function getStaticProps(context) {
  const content = await khulnasoft.get('page', { url: context.resolvedUrl }).promise();

  await extendAsyncProps(content, {
    async productsQuery(props) {
      return {
        products: await fetch(
          `${apiRoot}/products?${qs.stringify(props.productsQuery)}`
        ).then(res => res.json()),
      };
    },
  });

  return { props: { content } };
}
```

## transformComponents

Transforms khulnasoft content usage of multiple components to another.

### Example

This example replaces all `ProductsGrid` components in a khulnasoft content into a `ProductsSlider` which accepts slightly different inputs.

```tsx
import { Khulnasoft } from '@khulnasoft.com/react';

function ProductsGrid(props) {
  // props: { category: string }
  const data = useProductData(props.category);
  return <Grid products={data} />;
}

Khulnasoft.registerComponent(ProductsGrid, {
  name: 'ProductsGrid',
  inputs: [{ name: 'category', type: 'string', enum: ['men', 'women'] }],
});
```

```tsx
import { Khulnasoft } from '@khulnasoft.com/react';

function ProductsSlider(props) {
  // props: { collection: string }
  const data = useProductData(props.collection);
  return <Slider products={data} />;
}

Khulnasoft.registerComponent(ProductsSlider, {
  name: 'ProductsSlider',
  inputs: [{ name: 'collection', type: 'string', enum: ['men', 'women'] }],
});
```

Notice the different input name between both components, in order to replace `ProductsGrid` with `ProductsSlider` will need to run `transformComponents` specifiying how inputs of one map to the other.

```tsx
import { transformComponents } from '@khulnasoft.com/utils';

function updateGridToSlider(khulnasoftContent) {
  return transformComponents(khulnasoftContent, {
    ProductsGrid: {
      name: 'ProductsSlider',
      props: {
        // map productsSlider collection input to ProductsGrid category input
        collection: 'category',
      },
    },
  });
}
```

note: This can break content if the transformation was incorrect, recommend duplicating content and testing on non-live duplicates.

## setPixelProperties

`setPixelProperties` allows you to add more pixel element properties, for example , `alt`

### Example

```ts
import { setPixelProperties } from '@khulnasoft.com/utils';

export async function getServerSideProps({
  params,
}) {
  const page =
    (await khulnasoft
      .get(mode, ....)
      .toPromise()) || null
     
  setPixelProperties(page, { alt: 'pixel tag from khulnasoft' })
  
  return {
    props: {
      page,
    },
  }
}
```
note: Pixels will have `alt` by default in next API verison (`v3`);
