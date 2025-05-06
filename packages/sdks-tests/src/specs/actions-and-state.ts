export const CONTENT = {
  data: {
    title: 'event-actions',
    themeId: false,
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-0dee38968b85409098b25ff297617489',
        component: {
          name: 'Columns',
          options: {
            space: 30,
            columns: [
              {
                blocks: [
                  {
                    '@type': '@khulnasoft.com/sdk:Element',
                    '@version': 2,
                    actions: {
                      click: 'state.text="hello",console.log("state after",state)',
                    },
                    code: {
                      actions: {
                        click:
                          '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nstate.text = "hello";\n/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nconsole.log("state after", state);\n',
                      },
                    },
                    id: 'khulnasoft-d8a6885aae114a7fb2af67d0e1aac21f',
                    meta: {
                      previousId: 'khulnasoft-766003db45a44f9c93d2156a75dbaf69',
                      eventActions: {
                        click: [
                          {
                            '@type': '@khulnasoft.com/core:Action',
                            action: '@khulnasoft.com:customCode',
                            options: {
                              code: '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */',
                            },
                          },
                          {
                            '@type': '@khulnasoft.com/core:Action',
                            action: '@khulnasoft.com:setState',
                            options: { value: 'hello', name: 'text' },
                          },
                          {
                            '@type': '@khulnasoft.com/core:Action',
                            action: '@khulnasoft.com:customCode',
                            options: {
                              code: "/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nconsole.log('state after', state)",
                            },
                          },
                        ],
                      },
                    },
                    component: {
                      name: 'Core:Button',
                      options: { text: 'Write Hello', openLinkInNewTab: false },
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
                        width: 'auto',
                        alignSelf: 'center',
                      },
                    },
                  },
                  {
                    '@type': '@khulnasoft.com/sdk:Element',
                    '@version': 2,
                    actions: {
                      click:
                        'console.log("text before: ",state.text),state.text=(state.text||0)+1,console.log("text after: ",state.text)',
                    },
                    bindings: {
                      'component.options.text':
                        'var _virtual_index=state.text;return _virtual_index',
                    },
                    code: {
                      actions: {
                        click:
                          '/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nconsole.log("text before: ", state.text);\nstate.text = (state.text || 0) + 1;\nconsole.log("text after: ", state.text);\n',
                      },
                      bindings: { 'component.options.text': 'state.text' },
                    },
                    id: 'khulnasoft-2653b164c7b84fbea54c4b90ee9c8c49',
                    meta: {
                      previousId: 'khulnasoft-d8a6885aae114a7fb2af67d0e1aac21f',
                      eventActions: {
                        click: [
                          {
                            '@type': '@khulnasoft.com/core:Action',
                            action: '@khulnasoft.com:customCode',
                            options: {
                              code: "/**\n * Global objects available in custom action code:\n *\n * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n * context - khulnasoft context object - learn about context https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event\n *\n * Learn more: https://www.khulnasoft.com/c/docs/guides/custom-code\n *\n */\nconsole.log('text before: ', state.text);\nstate.text = (state.text || 0) + 1;\nconsole.log('text after: ', state.text);",
                            },
                          },
                        ],
                      },
                    },
                    component: {
                      name: 'Core:Button',
                      options: { text: 'Write Hey', openLinkInNewTab: false },
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
                        width: 'auto',
                        alignSelf: 'center',
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
                    id: 'khulnasoft-1e56259c93b74f0d8869cef8a49de681',
                    children: [
                      {
                        '@type': '@khulnasoft.com/sdk:Element',
                        '@version': 2,
                        id: 'khulnasoft-a2a05284857141948dd7d43fd9ed32e3',
                        meta: {
                          previousId: 'khulnasoft-67d21c1987ea46e8ab5a6e1e2f942c11',
                        },
                        component: {
                          name: 'Text',
                          options: {
                            text: '<span style="display: block;" class="khulnasoft-paragraph">Clicking the button will toggle the below value:</span>',
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
                            'var _virtual_index=state.text||"default";return _virtual_index',
                        },
                        code: {
                          bindings: {
                            'component.options.text': "state.text || 'default'",
                          },
                        },
                        id: 'khulnasoft-ecb9ec9cc4a94676b79d4a3c3d3460d7',
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
              },
            ],
            stackColumnsAt: 'tablet',
          },
        },
      },
    ],
    inputs: [],
  },
};
