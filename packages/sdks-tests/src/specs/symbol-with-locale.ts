export const DEFAULT_TEXT_SYMBOL = {
  lastUpdatedBy: 'b0272BAHcDTw8MCeDwLmdq7Uykp2',
  folders: [],
  data: {
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-90ec911111a94f0aa3e0ee1860388d93',
        meta: {
          previousId: 'khulnasoft-29bab71fac7043eb921eb530a3203e5f',
          'transformed.text': 'localized',
          localizedTextInputs: ['text'],
        },
        component: {
          name: 'Text',
          options: {
            text: '<span style="display: block;" class="khulnasoft-paragraph">Default text</span>',
          },
        },
        responsiveStyles: {
          large: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: '0',
            boxSizing: 'border-box',
            marginTop: '20px',
            lineHeight: 'normal',
            height: 'auto',
          },
        },
      },
      {
        id: 'khulnasoft-pixel-hdkrkco2lk9',
        '@type': '@khulnasoft.com/sdk:Element',
        tagName: 'img',
        properties: {
          src: 'https://cdn.khulnasoft.com/api/v1/pixel?apiKey=f1a790f8c3204b3b8c5c1795aeac4660',
          'aria-hidden': 'true',
          alt: '',
          role: 'presentation',
          width: '0',
          height: '0',
        },
        responsiveStyles: {
          large: {
            height: '0',
            width: '0',
            display: 'inline-block',
            opacity: '0',
            overflow: 'hidden',
            pointerEvents: 'none',
          },
        },
      },
    ],
    state: { deviceSize: 'large', location: { path: '', query: {} } },
  },
  modelId: 'd661dd1d06ce43ddbe3c2fe35597e545',
  query: [],
  published: 'published',
  screenshot:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F2072bf01f23f4d929d2f459fc900e61c',
  firstPublished: 1687808895615,
  testRatio: 1,
  lastUpdated: 1687808953907,
  createdDate: 1687808895615,
  createdBy: 'b0272BAHcDTw8MCeDwLmdq7Uykp2',
  meta: {
    kind: 'component',
    lastPreviewUrl:
      'https://preview.khulnasoft.codes?model=symbol&previewing=true&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=symbol&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.symbol=e2a166f7d9544ed9ade283abf9491af3&khulnasoft.overrides.e2a166f7d9544ed9ade283abf9491af3=e2a166f7d9544ed9ade283abf9491af3&khulnasoft.options.locale=Default',
    hasLinks: false,
  },
  variations: {},
  name: 'Locale symbol',
  id: 'e2a166f7d9544ed9ade283abf9491af3',
  rev: 'znwd06q4jua',
} as const;

export const CONTENT = {
  lastUpdatedBy: 'b0272BAHcDTw8MCeDwLmdq7Uykp2',
  folders: [],
  data: {
    inputs: [],
    themeId: false,
    title: 'symbol with locale',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-29bab71fac7043eb921eb530a3203e5f',
        component: {
          name: 'Symbol',
          options: {
            symbol: {
              entry: 'e2a166f7d9544ed9ade283abf9491af3',
              model: 'symbol',
              data: {},
            },
          },
        },
        responsiveStyles: {
          large: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: '0',
            boxSizing: 'border-box',
          },
        },
      },
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        actions: { click: 'var _virtual_index=state.locale="fr";return _virtual_index' },
        id: 'khulnasoft-bfbb2ae098f74d90ac94922f4cc18ff7',
        meta: {
          eventActions: {
            click: [
              {
                '@type': '@khulnasoft.com/core:Action',
                action: '@khulnasoft.com:customCode',
                options: { code: "state.locale = 'fr'" },
              },
            ],
          },
        },
        component: { name: 'Core:Button', options: { text: 'click', openLinkInNewTab: false } },
        responsiveStyles: {
          large: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: '0',
            boxSizing: 'border-box',
            marginTop: '20px',
            appearance: 'none',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '25px',
            paddingRight: '25px',
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
          },
        },
      },
      {
        id: 'khulnasoft-pixel-gie7gk6gv5w',
        '@type': '@khulnasoft.com/sdk:Element',
        tagName: 'img',
        properties: {
          src: 'https://cdn.khulnasoft.com/api/v1/pixel?apiKey=f1a790f8c3204b3b8c5c1795aeac4660',
          'aria-hidden': 'true',
          alt: '',
          role: 'presentation',
          width: '0',
          height: '0',
        },
        responsiveStyles: {
          large: {
            height: '0',
            width: '0',
            display: 'inline-block',
            opacity: '0',
            overflow: 'hidden',
            pointerEvents: 'none',
          },
        },
      },
    ],
    url: '/symbol-with-locale',
    state: { deviceSize: 'large', location: { path: '', query: {} } },
  },
  modelId: '240a12053d674735ac2a384dcdc561b5',
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      property: 'urlPath',
      value: '/symbol-with-locale',
      operator: 'is',
    },
  ],
  published: 'published',
  firstPublished: 1687809092354,
  testRatio: 1,
  lastUpdated: 1687809475739,
  createdDate: 1687808851184,
  createdBy: 'b0272BAHcDTw8MCeDwLmdq7Uykp2',
  meta: {
    kind: 'page',
    lastPreviewUrl:
      'http://127.0.0.1:5173/symbol-with-locale?khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=d5721e2b572047149ec96a4588ab576f&khulnasoft.overrides.d5721e2b572047149ec96a4588ab576f=d5721e2b572047149ec96a4588ab576f&khulnasoft.overrides.page:/symbol-with-locale=d5721e2b572047149ec96a4588ab576f&khulnasoft.options.locale=Default',
    hasLinks: false,
    symbolsUsed: { e2a166f7d9544ed9ade283abf9491af3: true },
  },
  variations: {},
  name: 'symbol with locale',
  id: 'd5721e2b572047149ec96a4588ab576f',
  rev: 'as1tvtsbc2u',
} as const;

export const FRENCH_TEXT_SYMBOL = {
  lastUpdatedBy: 'b0272BAHcDTw8MCeDwLmdq7Uykp2',
  folders: [],
  data: {
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-90ec911111a94f0aa3e0ee1860388d93',
        meta: {
          previousId: 'khulnasoft-29bab71fac7043eb921eb530a3203e5f',
          'transformed.text': 'localized',
          localizedTextInputs: ['text'],
        },
        component: {
          name: 'Text',
          options: {
            text: '<span style="display: block;" class="khulnasoft-paragraph">French text</span>',
          },
        },
        responsiveStyles: {
          large: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: '0',
            boxSizing: 'border-box',
            marginTop: '20px',
            lineHeight: 'normal',
            height: 'auto',
          },
        },
      },
      {
        id: 'khulnasoft-pixel-g02jiz217i7',
        '@type': '@khulnasoft.com/sdk:Element',
        tagName: 'img',
        properties: {
          src: 'https://cdn.khulnasoft.com/api/v1/pixel?apiKey=f1a790f8c3204b3b8c5c1795aeac4660',
          'aria-hidden': 'true',
          alt: '',
          role: 'presentation',
          width: '0',
          height: '0',
        },
        responsiveStyles: {
          large: {
            height: '0',
            width: '0',
            display: 'inline-block',
            opacity: '0',
            overflow: 'hidden',
            pointerEvents: 'none',
          },
        },
      },
    ],
    state: { deviceSize: 'large', location: { path: '', query: {} } },
  },
  modelId: 'd661dd1d06ce43ddbe3c2fe35597e545',
  query: [],
  published: 'published',
  screenshot:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F2072bf01f23f4d929d2f459fc900e61c',
  firstPublished: 1687808895615,
  testRatio: 1,
  lastUpdated: 1687808953907,
  createdDate: 1687808895615,
  createdBy: 'b0272BAHcDTw8MCeDwLmdq7Uykp2',
  meta: {
    kind: 'component',
    lastPreviewUrl:
      'https://preview.khulnasoft.codes?model=symbol&previewing=true&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=symbol&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.symbol=e2a166f7d9544ed9ade283abf9491af3&khulnasoft.overrides.e2a166f7d9544ed9ade283abf9491af3=e2a166f7d9544ed9ade283abf9491af3&khulnasoft.options.locale=Default',
    hasLinks: false,
  },
  variations: {},
  name: 'Locale symbol',
  id: 'e2a166f7d9544ed9ade283abf9491af3',
  rev: 'upgeuaxb42',
} as const;
