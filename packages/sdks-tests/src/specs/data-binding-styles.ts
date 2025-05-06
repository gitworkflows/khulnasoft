export const CONTENT = {
  data: {
    themeId: false,
    title: 'data-binding-styles',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-53b3b3d1ab0e49e6b9645f0edb5cfa2c',
        children: [
          {
            '@type': '@khulnasoft.com/sdk:Element',
            '@version': 2,
            bindings: { 'style.color': 'state.myTextColor' },
            code: {
              bindings: {
                'style.color':
                  '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nstate.myTextColor;\n',
              },
            },
            id: 'khulnasoft-05cadf76ae1e4359aeb76b2b5e4febc4',
            meta: {
              bindingActions: {
                style: {
                  color: [
                    {
                      '@type': '@khulnasoft.com/core:Action',
                      action: '@khulnasoft.com:customCode',
                      options: {
                        code: '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nstate.myTextColor',
                      },
                    },
                  ],
                },
              },
            },
            component: {
              name: 'Text',
              options: { text: 'This text should be red...' },
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
    ],
    state: {
      myTextColor: 'red',
    },
  },
};
