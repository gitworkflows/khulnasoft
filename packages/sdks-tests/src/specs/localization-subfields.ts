export const LOCALIZATION_SUBFIELDS = {
  ownerId: 'ad30f9a246614faaa6a03374f83554c9',
  lastUpdateBy: null,
  createdDate: 1733998720578,
  id: 'ded8620c332b4315b69afc3bb957831e',
  '@version': 4,
  name: 'loc-subfields',
  modelId: '17c6065109ef4062ba083f5741f4ee6a',
  published: 'draft',
  meta: {
    hasLinks: false,
    kind: 'page',
    lastPreviewUrl:
      'http://localhost:5173/loc-subfields?khulnasoft.space=ad30f9a246614faaa6a03374f83554c9&khulnasoft.user.permissions=read%2Ccreate%2Cpublish%2CeditCode%2CeditDesigns%2Cadmin%2CeditLayouts%2CeditLayers%2CeditContentPriority&khulnasoft.user.role.name=Admin&khulnasoft.user.role.id=admin&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=ded8620c332b4315b69afc3bb957831e&khulnasoft.overrides.ded8620c332b4315b69afc3bb957831e=ded8620c332b4315b69afc3bb957831e&khulnasoft.overrides.page:/loc-subfields=ded8620c332b4315b69afc3bb957831e&khulnasoft.options.locale=Default',
    componentsUsed: {
      ComponentWithLocalizedSubfields: 1,
    },
  },
  priority: -825,
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      property: 'urlPath',
      operator: 'is',
      value: '/loc-subfields',
    },
  ],
  data: {
    themeId: false,
    title: 'loc-subfields',
    inputs: [],
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-c550aa8a34804f3097eb46f76baa15d4',
        meta: {
          'transformed.texts.0.text1': 'localized',
          localizedTextInputs: ['texts.0.text1', 'texts.0.text2'],
          'transformed.texts.0.text2': 'localized',
        },
        component: {
          name: 'ComponentWithLocalizedSubfields',
          options: {
            texts: [
              {
                text1: {
                  '@type': '@khulnasoft.com/core:LocalizedValue',
                  Default: 'hello',
                  'hi-IN': 'namaste',
                },
                text2: {
                  '@type': '@khulnasoft.com/core:LocalizedValue',
                  Default: 'world',
                  'hi-IN': 'duniya',
                },
              },
            ],
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
          },
        },
      },
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        bindings: {
          'component.options.text': 'var _virtual_index=state.header;return _virtual_index',
        },
        code: {
          bindings: {
            'component.options.text': 'state.header',
          },
        },
        id: 'khulnasoft-f76bb010047a44f3bbb18ee6aa7071bb',
        meta: {
          transformed: {
            text: 'localized',
          },
          localizedTextInputs: ['text'],
          bindingActions: {
            _newProperty: null,
          },
        },
        component: {
          name: 'Text',
          options: {
            text: {
              '@type': '@khulnasoft.com/core:LocalizedValue',
              Default: 'Enter some text...',
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
            marginTop: '20px',
            lineHeight: 'normal',
            height: 'auto',
          },
        },
      },
    ],
  },
  metrics: {
    clicks: 0,
    impressions: 0,
  },
  variations: {},
  lastUpdated: 1733999285539,
  testRatio: 1,
  createdBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  lastUpdatedBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  folders: [],
};
