export const SHOW_HIDE_IF = {
  data: {
    title: 'dynamic-data-bindings',
    themeId: false,
    inputs: [
      {
        hideFromFieldsEditor: false,
        subFields: [],
        hideFromUI: false,
        bubble: false,
        autoFocus: false,
        showIf: '',
        name: 'clicks',
        broadcast: false,
        hidden: false,
        onChange: '',
        helperText: '',
        noPhotoPicker: false,
        mandatory: false,
        copyOnAdd: true,
        advanced: false,
        model: '',
        type: 'number',
        defaultValue: 0,
        permissionsRequiredToEdit: '',
        simpleTextOnly: false,
        disallowRemove: false,
        showTemplatePicker: true,
        required: false,
        '@type': '@khulnasoft.com/core:Field',
      },
    ],
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        bindings: { show: 'var _virtual_index=!0;return _virtual_index' },
        id: 'khulnasoft-62f72a1633564ecebd5b910ad93f0c16',
        component: {
          name: 'Text',
          options: {
            text: '<span style="display: block;" class="khulnasoft-paragraph">this always appears</span>',
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
        bindings: { hide: 'var _virtual_index=!0;return _virtual_index' },
        id: 'khulnasoft-bebc74dd4f64465ebe1fe167e2e8542f',
        meta: { previousId: 'khulnasoft-62f72a1633564ecebd5b910ad93f0c16' },
        component: {
          name: 'Text',
          options: {
            text: '<span style="display: block;" class="khulnasoft-paragraph">this never appears</span>',
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
        id: 'khulnasoft-3fbbbf6bf9174d5d994f94fb39dca45f',
        children: [
          {
            '@type': '@khulnasoft.com/sdk:Element',
            '@version': 2,
            bindings: {
              show: 'var _virtual_index=state.clicks%2==0;return _virtual_index',
            },
            id: 'khulnasoft-f9f97e80aa8b42069323f91f4fddf269',
            meta: {
              previousId: 'khulnasoft-3b69f9ad2f2b4e7990a2c303e4caaee5',
            },
            component: {
              name: 'Text',
              options: {
                text: '<span style="display: block;" class="khulnasoft-paragraph">even clicks</span>',
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
              hide: 'var _virtual_index=state.clicks%2==0;return _virtual_index',
            },
            layerName: 'odd clicks',
            id: 'khulnasoft-a5335b4cc7e64cef8a15b464cc881e88',
            meta: {
              previousId: 'khulnasoft-f9f97e80aa8b42069323f91f4fddf269',
            },
            component: {
              name: 'Text',
              options: {
                text: '<span style="display: block;" class="khulnasoft-paragraph">odd clicks</span>',
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
            actions: { click: 'state.clicks+=1' },
            id: 'khulnasoft-8d833dcfaf6f4d50a6bae6dd91fd0e7b',
            meta: {
              eventActions: {
                click: [
                  {
                    '@type': '@khulnasoft.com/core:Action',
                    action: '@khulnasoft.com:customCode',
                    options: {
                      code: '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nstate.clicks += 1',
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
    ],
    url: '/dynamic-data-bindings',
    state: { deviceSize: 'large', location: { path: '', query: {} } },
  },
  query: [
    {
      value: '/dynamic-data-bindings',
      '@type': '@khulnasoft.com/core:Query',
      operator: 'is',
      property: 'urlPath',
    },
  ],
  meta: {
    lastPreviewUrl:
      'https://preview.khulnasoft.codes?model=page&previewing=true&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=317004058913402c8de2958d144abb4b&khulnasoft.overrides.317004058913402c8de2958d144abb4b=317004058913402c8de2958d144abb4b&khulnasoft.overrides.page:/=317004058913402c8de2958d144abb4b',
    hasLinks: false,
    kind: 'page',
    needsHydration: true,
  },
  published: 'draft',
  lastUpdated: 1675808774637,
  lastUpdatedBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  variations: {},
  folders: [],
  testRatio: 1,
  createdDate: 1675723585300,
  name: 'dynamic-data-bindings',
  createdBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  modelId: '240a12053d674735ac2a384dcdc561b5',
  id: '317004058913402c8de2958d144abb4b',
  rev: 'ktr5u6nz57j',
};
