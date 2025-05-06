import { KhulnasoftElement } from '@khulnasoft.com/sdk'

const block = (options: Partial<KhulnasoftElement>) =>
  ({
    ...options,
    // All khulnasoft blocks need this @type property set
    '@type': '@khulnasoft.com/sdk:Element',
  } as KhulnasoftElement)

const examplePageTemplate = {
  name: 'New page',
  published: 'published' as 'published',
  query: [{ property: 'urlPath', operator: 'is', value: '/' }],
  data: {
    blocks: [
      block({
        component: {
          name: 'Text',
          options: {
            text: 'Hello!',
          },
        },
      }),
      block({
        responsiveStyles: {
          large: {
            marginTop: '20px',
          },
        },
        component: {
          name: 'Text',
          options: {
            text: 'Hello!',
          },
        },
      }),
    ],
  },
}

export const pageTemplates = {
  'page type a': {
    page: examplePageTemplate,
  },
  'page type b': {
    page: examplePageTemplate,
  },
}
