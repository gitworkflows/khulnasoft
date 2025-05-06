export const CONTENT = {
  query: [
    {
      operator: 'is',
      value: '/reactive-toggle',
      property: 'urlPath',
      '@type': '@khulnasoft.com/core:Query',
    },
  ],
  folders: [],
  lastUpdatedBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  data: {
    title: 'reactive-toggle',
    themeId: false,
    inputs: [
      {
        simpleTextOnly: false,
        '@type': '@khulnasoft.com/core:Field',
        hideFromFieldsEditor: false,
        model: '',
        mandatory: false,
        onChange: '',
        type: 'boolean',
        advanced: false,
        noPhotoPicker: false,
        autoFocus: false,
        bubble: false,
        helperText: '',
        name: 'toggle',
        permissionsRequiredToEdit: '',
        required: false,
        showTemplatePicker: true,
        hideFromUI: false,
        disallowRemove: false,
        hidden: false,
        copyOnAdd: true,
        showIf: '',
        broadcast: false,
        subFields: [],
      },
    ],
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        bindings: {
          'component.options.text':
            'var _virtual_index=state.toggle?"hey":"nope";return _virtual_index',
        },
        id: 'khulnasoft-198daac971b642089fa300eb3b31fd5d',
        meta: {
          bindingActions: {
            component: {
              options: {
                text: [
                  {
                    '@type': '@khulnasoft.com/core:Action',
                    action: '@khulnasoft.com:conditionalValue',
                    options: {
                      expression: 'state.toggle',
                      then: 'hey',
                      else: 'nope',
                    },
                  },
                ],
              },
            },
          },
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
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        actions: { click: 'console.log("clicked button")' },
        id: 'khulnasoft-21150e42fa43456b9d66e157d6f46db8',
        meta: {
          eventActions: {
            click: [
              {
                '@type': '@khulnasoft.com/core:Action',
                action: '@khulnasoft.com:customCode',
                options: {
                  code: "/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nconsole.log('clicked button')",
                },
              },
            ],
          },
        },
        component: {
          name: 'Core:Button',
          options: { text: 'Click me!', openLinkInNewTab: false },
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
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        actions: { click: 'console.log("clicked box")' },
        id: 'khulnasoft-4fcbdb02dfde41c88d9facc08d0bb154',
        meta: {
          eventActions: {
            click: [
              {
                '@type': '@khulnasoft.com/core:Action',
                action: '@khulnasoft.com:customCode',
                options: {
                  code: "/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nconsole.log('clicked box')",
                },
              },
            ],
          },
        },
        children: [
          {
            '@type': '@khulnasoft.com/sdk:Element',
            '@version': 2,
            id: 'khulnasoft-58803aec33dd4e27aee4b4b4e775fc0e',
            meta: {
              previousId: 'khulnasoft-3afed6eb6ce545b2ab31fc23e4d5abd4',
            },
            component: {
              name: 'Text',
              options: {
                text: '<span style="display: block;" class="khulnasoft-paragraph">clickable BOX</span>',
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
        responsiveStyles: {
          large: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: '0',
            boxSizing: 'border-box',
            marginTop: '20px',
            height: 'auto',
            paddingBottom: '30px',
          },
        },
      },
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        actions: { click: 'console.log("clicked text")' },
        id: 'khulnasoft-aa9c04fa68e647bf8401e0a7f2b16a60',
        meta: {
          previousId: 'khulnasoft-e906477bdafa4bb6b4d5d1fd15da05a5',
          eventActions: {
            click: [
              {
                '@type': '@khulnasoft.com/core:Action',
                action: '@khulnasoft.com:customCode',
                options: {
                  code: "/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nconsole.log('clicked text')",
                },
              },
            ],
          },
        },
        component: {
          name: 'Text',
          options: {
            text: '<span style="display: block;" class="khulnasoft-paragraph">clickable text element</span>',
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
    url: '/reactive-toggle',
    state: { deviceSize: 'large', location: { path: '', query: {} } },
  },
  id: '7aae85475a0a4ed69140bc2ae7442bcf',
  variations: {},
  name: 'reactive-toggle',
  meta: {
    kind: 'page',
    lastPreviewUrl:
      'https://svelte-vite-example.vercel.app/reactive-toggle?khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=7aae85475a0a4ed69140bc2ae7442bcf&khulnasoft.overrides.7aae85475a0a4ed69140bc2ae7442bcf=7aae85475a0a4ed69140bc2ae7442bcf&khulnasoft.overrides.page:/reactive-toggle=7aae85475a0a4ed69140bc2ae7442bcf',
    hasLinks: false,
    needsHydration: true,
  },
  createdDate: 1675455127622,
  published: 'draft',
  testRatio: 1,
  modelId: '240a12053d674735ac2a384dcdc561b5',
  lastUpdated: 1675461872192,
  createdBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  rev: 'uqwvkjtrneh',
};
