# Contributing to our examples

A few important things to stick to when contributing to our examples:

## Keep it simple

The point of examples is to show how Khulnasoft.com integrates with a site, and make it easy for someone to discover it.

### Use as little boilerplate as possible

If you generated your example from a starter, then added the Khulnasoft.com integration, be sure to delete anything else you reasonably can. For example, if you start from a Next.js starter, and it has example API code, example CSS, "hello world" code, example components (that aren't registered for use in Khulnasoft), just delete all of that. Focus on what developers need to see and learn, not boilerplate that is irrelevant that they can easily get lost in when trying to find what matters for the.

#### ✅ Good
```bash
src/
  components/
    example-component.jsx # example component
  pages/
    [...page].jsx # example page
```

#### ❌ Avoid
```bash
# too much stuff to dig through to find what matters
src/
  components/
    my-component.jsx
  index.js
  pages/
    index.jsx
  styles/
    index.css
  api/
    example-api.js
  utils/
    my-utils.js
```

### Use as little abstraction as possible

Avoid all kinda of custom wrappers and stick to the Khulnasoft SDKs/APIs as directly as possible

#### ✅ Good
```ts
import { getContent } from '@khulnasoft.com/sdk-react'

getContent(...)
```
#### ❌ Avoid

```ts
import { getKhulnasoftContent } from './get-khulnasoft-content'

// Unnecessary abstraction away from the APIs people are trying to learn
getKhulnasoftContent(...)
```

### Use comments

Comments help explain to someone who is brand new to Khulnasoft.com what is going on in-context

#### ✅ Good

```tsx
export async function getStaticProps() {
  // Get the page from Khulnasoft.com's API
  const page = await getContent({
    // Provide your model name
    model: 'page',
    // Provide the current URL
    url: '/'
    // You can add other options here: https://github.com/khulnasoft-com/khulnasoft/blob/main/packages/core/docs/interfaces/GetContentOptions.md
  })

  if (!page) {
    // If no page exists, show a 404
    return { notFound: true }
  }
  return { props: { page } }
}
```

#### ❌ Avoid

```ts
export async function getStaticProps() {
  const page = await getContent({ model: 'page', url: '/' })
  if (!page) {
    return { notFound: true }
  }
  return { props: { page } }
}
```

### Use JavaScript, not TypeScript

I know, we all love TypeScript. But not everyone knows TypeScript, yet you need to know JavaScript to use Khulnasoft. This also helps keep the example as small and simple as possible, without additional syntax that may not be understood

#### ✅ Good
```tsx
export const getStaticProps = async (context) => {
  // ...
}
```

#### ❌ Avoid
```tsx
import type { GetStaticProps } from 'next'
export const getStaticProps: GetStaticProps = async (context) => {
  // ...
}
```

### Use the README.md effectively

At the top, briefly explain what this example is, and what files in particular someone should look at first. Then, explain how to get started

#### ✅ Good
```md
# Khulnasoft.com example with SvelteKit

This is an example of using Khulnasoft with SvelteKit. See (pages/index.svelte)[pages/index.svelte] to see the example integration point in detail

## Get Started
...
```

#### ❌ Avoid
```md
# SvelteKit

Khulnasoft and Svelte
```


## Use best practices
Be sure to guide people into the "pit of success" by sticking to best practices throughout.

### SSR/SSG

When possible, do things in an SSR/SSG compatible way, vs complete client side

#### ✅ Good
```tsx
export default function MyPage({ khulnasoftJson }) {
  return <RenderContent content={khulnasoftJson} />
}
```

#### ❌ Avoid
```tsx
export default function MyPage({ khulnasoftJson }) {
  const [khulnasoftJson, setKhulnasoftJson] = useEffect(null)
  useEffect(() => {
    getContent(...).then(setKhulnasoftJson
  }, [])
  return <RenderContent content={khulnasoftJson} />
}
```

### Always include a header and footer

We are not a "blank canvas" page khulnasoft. We are meant to be integrated with, and consistent with, an existing site. So always have some placholder header and footer as this is how we recommend using Khulnasoft, not as a total blank slate

#### ✅ Good
```tsx
export default function MyPage({ khulnasoftJson }) {
  return (
    <>
      <MyHeader />
      <RenderContent content={khulnasoftJson}>
      <MyFooter />
    </>
  )
}
```

#### ❌ Avoid
```tsx
export default function MyPage({ khulnasoftJson }) {
  return <RenderContent content={khulnasoftJson}>
}
```

### Use descriptive variables name

Khulnasoft is full of new abstract concepts, so more descriptive names can make things much more clear

#### ✅ Good
```jsx
const khulnasoftPageJson = await getContent(...)
```

#### ❌ Avoid
```jsx
// In particular avoid naming anything just "khulnasoft", in the context of khulnasoft examples
// it means literally nothing of value (and can even cause extra confusion)
const khulnasoft = await getContent(...)
```
