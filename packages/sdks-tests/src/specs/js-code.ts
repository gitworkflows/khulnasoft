export const JS_CODE_CONTENT = {
  lastUpdatedBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  folders: [],
  data: {
    jsCode: 'state.menu={a:{b:{expanded:"jsCode text"}}}',
    inputs: [],
    newField3: 'testing',
    themeId: false,
    title: 'js-code',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        bindings: {
          show: 'var _virtual_index=state.menu.a.b.expanded;return _virtual_index',
          'component.options.text':
            'var _virtual_index=state.menu.a.b.expanded;return _virtual_index',
        },
        id: 'khulnasoft-165c8701ec8846ddbb2c992aac25ca43',
        component: {
          name: 'Text',
          options: {
            text: '...',
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
        actions: {
          click: 'state.menu.a.b.expanded=state.menu.a.b.expanded ? undefined : "jsCode text"',
        },
        id: 'khulnasoft-54da80f81b584020bd09a4bee2d12cbd',
        meta: {
          eventActions: {
            click: [
              {
                '@type': '@khulnasoft.com/core:Action',
                action: '@khulnasoft.com:customCode',
                options: {
                  code: '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\n\nstate.menu.a.b.expanded = !state.menu.a.b.expanded',
                },
              },
            ],
          },
        },
        component: {
          name: 'Core:Button',
          options: {
            text: 'toggle menu',
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
    url: '/js-code',
    state: {
      deviceSize: 'large',
      location: {
        pathname: '/js-code',
        path: ['js-code'],
        query: {},
      },
      menu: { a: { b: { expanded: true } } },
    },
  },
  modelId: '240a12053d674735ac2a384dcdc561b5',
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      property: 'urlPath',
      value: '/js-code',
      operator: 'is',
    },
  ],
  published: 'draft',
  screenshot:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2Ff51fd03100f64db6ae650500738224d8',
  testRatio: 1,
  lastUpdated: 1698688645725,
  createdDate: 1698688306886,
  createdBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  meta: {
    kind: 'page',
    lastPreviewUrl:
      'https://preview.khulnasoft.codes?model=page&previewing=true&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=7a66536056b7451a9f7c372eb3d665bb&khulnasoft.overrides.7a66536056b7451a9f7c372eb3d665bb=7a66536056b7451a9f7c372eb3d665bb&khulnasoft.overrides.page:/=7a66536056b7451a9f7c372eb3d665bb&khulnasoft.options.locale=Default',
    hasLinks: false,
  },
  variations: {},
  name: 'js-code',
  id: '7a66536056b7451a9f7c372eb3d665bb',
  rev: '4ln38bhry8',
};
