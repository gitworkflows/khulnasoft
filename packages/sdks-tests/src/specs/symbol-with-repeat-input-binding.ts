export const SYMBOL_WITH_REPEAT_INPUT_BINDING = {
  ownerId: 'ad30f9a246614faaa6a03374f83554c9',
  lastUpdateBy: null,
  createdDate: 1725872832969,
  id: '3413ca2078c24216be71bacf54adbfc9',
  '@version': 4,
  name: 'data-symbols',
  modelId: '17c6065109ef4062ba083f5741f4ee6a',
  published: 'published',
  meta: {
    symbolsUsed: {
      f8f9e85ab8504e7db68c1d896d652c91: true,
    },
    kind: 'page',
    hasLinks: false,
    lastPreviewUrl:
      'http://localhost:5173/data-symbols?khulnasoft.space=ad30f9a246614faaa6a03374f83554c9&khulnasoft.user.permissions=read%2Ccreate%2Cpublish%2CeditCode%2CeditDesigns%2Cadmin%2CeditLayouts%2CeditLayers&khulnasoft.user.role.name=Admin&khulnasoft.user.role.id=admin&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=3413ca2078c24216be71bacf54adbfc9&khulnasoft.overrides.3413ca2078c24216be71bacf54adbfc9=3413ca2078c24216be71bacf54adbfc9&khulnasoft.overrides.page:/data-symbols=3413ca2078c24216be71bacf54adbfc9&khulnasoft.options.locale=Default',
  },
  priority: -647,
  stage: 'b3ee01559a244a078973f545ad475eba',
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      property: 'urlPath',
      operator: 'is',
      value: '/data-symbols',
    },
  ],
  data: {
    themeId: false,
    inputs: [],
    title: 'data-symbols',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        bindings: {
          'component.options.symbol.data.header':
            'var _virtual_index=state.productsItem.header;return _virtual_index',
        },
        code: {
          bindings: {
            'component.options.symbol.data.header': 'state.productsItem.header',
          },
        },
        repeat: {
          collection: 'state.products',
        },
        id: 'khulnasoft-c4c338558fb747068e63cd6b97f037ba',
        meta: {
          bindingActions: {
            component: {
              options: {
                symbol: {
                  data: {
                    header: null,
                  },
                },
              },
            },
          },
        },
        component: {
          name: 'Symbol',
          options: {
            dataOnly: false,
            inheritState: false,
            renderToLiquid: false,
            symbol: {
              model: 'symbol',
              entry: 'f8f9e85ab8504e7db68c1d896d652c91',
              data: {
                header: 'nothing',
              },
              ownerId: 'ad30f9a246614faaa6a03374f83554c9',
              content: {
                ownerId: 'ad30f9a246614faaa6a03374f83554c9',
                lastUpdateBy: null,
                createdDate: 1725873478428,
                id: 'f8f9e85ab8504e7db68c1d896d652c91',
                '@version': 4,
                name: 'data-symbol-symbol',
                modelId: '5e1209efea0045f58d9b871d81b652fa',
                published: 'published',
                meta: {
                  hasLinks: false,
                  kind: 'component',
                  lastPreviewUrl:
                    'https://preview.khulnasoft.codes?model=symbol&previewing=true&apiKey=ad30f9a246614faaa6a03374f83554c9&khulnasoft.space=ad30f9a246614faaa6a03374f83554c9&khulnasoft.user.permissions=read%2Ccreate%2Cpublish%2CeditCode%2CeditDesigns%2Cadmin%2CeditLayouts%2CeditLayers&khulnasoft.user.role.name=Admin&khulnasoft.user.role.id=admin&khulnasoft.cachebust=true&khulnasoft.preview=symbol&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.symbol=f8f9e85ab8504e7db68c1d896d652c91&khulnasoft.overrides.f8f9e85ab8504e7db68c1d896d652c91=f8f9e85ab8504e7db68c1d896d652c91&khulnasoft.options.locale=Default',
                },
                priority: -652,
                stage: 'b3ee01559a244a078973f545ad475eba',
                query: [],
                data: {
                  inputs: [
                    {
                      '@type': '@khulnasoft.com/core:Field',
                      meta: {},
                      name: 'header',
                      type: 'text',
                      defaultValue: 'default',
                      required: false,
                      subFields: [],
                      helperText: '',
                      autoFocus: false,
                      simpleTextOnly: false,
                      disallowRemove: false,
                      broadcast: false,
                      bubble: false,
                      hideFromUI: false,
                      hideFromFieldsEditor: false,
                      showTemplatePicker: true,
                      permissionsRequiredToEdit: '',
                      advanced: false,
                      copyOnAdd: true,
                      onChange: '',
                      behavior: '',
                      showIf: '',
                      mandatory: false,
                      hidden: false,
                      noPhotoPicker: false,
                      model: '',
                      supportsAiGeneration: false,
                      defaultCollapsed: false,
                    },
                  ],
                  blocks: [
                    {
                      '@type': '@khulnasoft.com/sdk:Element',
                      '@version': 2,
                      id: 'khulnasoft-ad60c140982d45f58d7190fd84481967',
                      component: {
                        name: 'Text',
                        options: {
                          text: 'HEADER:<br>',
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
                      '@type': '@khulnasoft.com/sdk:Element',
                      '@version': 2,
                      bindings: {
                        'component.options.text':
                          'var _virtual_index=state.header;return _virtual_index',
                      },
                      code: {
                        bindings: {
                          'component.options.text': 'state.header',
                        },
                      },
                      id: 'khulnasoft-3d3ef778f0734f259daa268388104ee0',
                      component: {
                        name: 'Text',
                        options: {
                          text: 'Enter some text...',
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
                lastUpdated: 1725874311648,
                firstPublished: 1725873773459,
                testRatio: 1,
                createdBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
                lastUpdatedBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
                folders: [],
              },
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
  lastUpdated: 1725874514331,
  firstPublished: 1725874440040,
  testRatio: 1,
  createdBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  lastUpdatedBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  folders: [],
};
