export const REACTIVE_STATE_CONTENT = {
  id: '6212bd298e3248dab74048c6a10f84ec',
  createdBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  lastUpdated: 1674570277771,
  name: 'reactive-state',
  meta: {
    lastPreviewUrl:
      'https://preview.khulnasoft.codes?model=page&previewing=true&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=6212bd298e3248dab74048c6a10f84ec&khulnasoft.overrides.6212bd298e3248dab74048c6a10f84ec=6212bd298e3248dab74048c6a10f84ec&khulnasoft.overrides.page:/=6212bd298e3248dab74048c6a10f84ec',
    kind: 'page',
    hasLinks: false,
    needsHydration: true,
  },
  firstPublished: 1674570277770,
  published: 'published',
  query: [
    {
      property: 'urlPath',
      operator: 'is',
      '@type': '@khulnasoft.com/core:Query',
      value: '/reactive-state',
    },
  ],
  testRatio: 1,
  createdDate: 1674570061694,
  lastUpdatedBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  modelId: '240a12053d674735ac2a384dcdc561b5',
  folders: [],
  variations: {},
  data: {
    themeId: false,
    title: 'reactive-state',
    inputs: [
      {
        name: 'reactiveValue',
        showTemplatePicker: true,
        hideFromUI: false,
        showIf: '',
        '@type': '@khulnasoft.com/core:Field',
        model: '',
        copyOnAdd: true,
        mandatory: false,
        noPhotoPicker: false,
        simpleTextOnly: false,
        permissionsRequiredToEdit: '',
        required: false,
        subFields: [],
        hideFromFieldsEditor: false,
        helperText: '',
        bubble: false,
        autoFocus: false,
        defaultValue: 0,
        onChange: '',
        hidden: false,
        advanced: false,
        disallowRemove: false,
        broadcast: false,
        type: 'number',
      },
    ],
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-fea3981e1a654e69be0e1a0e2a8fc7b5',
        component: {
          name: 'Columns',
          options: {
            columns: [
              {
                blocks: [
                  {
                    '@type': '@khulnasoft.com/sdk:Element',
                    '@version': 2,
                    id: 'khulnasoft-57deea4873664c119e77a876d636c717',
                    meta: {
                      previousId: 'khulnasoft-ca1f2ca48bc34e669359dd5b4ec3cbc3',
                    },
                    component: {
                      name: 'Text',
                      options: {
                        text: '<span style="display: block;" class="khulnasoft-paragraph">Below is a reactive state value (incrementing number):</span>',
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
                      'component.options.text': 'state.reactiveValue',
                    },
                    id: 'khulnasoft-4e5b6b5f85dd4edbb30eba374069bb10',
                    meta: {
                      bindingActions: {
                        component: {
                          options: {
                            text: [
                              {
                                '@type': '@khulnasoft.com/core:Action',
                                action: '@khulnasoft.com:customCode',
                                options: {
                                  code: '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nstate.reactiveValue',
                                },
                              },
                            ],
                          },
                        },
                      },
                      previousId: 'khulnasoft-aee5e7f645f549caab81d4bac5d34ff0',
                    },
                    component: {
                      name: 'Text',
                      options: { text: 'Enter some text...' },
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
              {
                blocks: [
                  {
                    '@type': '@khulnasoft.com/sdk:Element',
                    '@version': 2,
                    actions: {
                      click:
                        'console.log("button clicked. current state:",state.reactiveValue),state.reactiveValue+=1,console.log("new state:",state.reactiveValue)',
                    },
                    id: 'khulnasoft-851b975ad853411fb09e6e3479f7a530',
                    meta: {
                      eventActions: {
                        click: [
                          {
                            '@type': '@khulnasoft.com/core:Action',
                            action: '@khulnasoft.com:customCode',
                            options: {
                              code: '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nstate.reactiveValue += 1',
                            },
                          },
                        ],
                      },
                      previousId: 'khulnasoft-6c1363b4fef6457b8a6d4380896293cf',
                    },
                    component: {
                      name: 'Core:Button',
                      options: {
                        text: 'Increment Number',
                        openLinkInNewTab: false,
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
                ],
              },
            ],
            space: 20,
            stackColumnsAt: 'tablet',
            reverseColumnsWhenStacked: false,
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
        id: 'khulnasoft-pixel-6yc5qr11gcq',
        '@type': '@khulnasoft.com/sdk:Element',
        tagName: 'img',
        properties: {
          src: 'https://cdn.khulnasoft.com/api/v1/pixel?apiKey=f1a790f8c3204b3b8c5c1795aeac4660',
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
    url: '/reactive-state',
    state: {
      deviceSize: 'large',
      location: {
        pathname: '/reactive-state',
        path: ['reactive-state'],
        query: {},
      },
    },
  },
  rev: 'jyaeg1yd0lj',
};
