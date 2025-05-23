export const CONTENT = {
  createdBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  createdDate: 1647464399394,
  data: {
    inputs: [],
    title: 'Symbols',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-58e03f0713d842f59be31f54943e08f0',
        component: {
          name: 'Text',
          options: {
            text: '<p>Below are 2 symbols. The second one has a custom description prop provided</p>',
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
            textAlign: 'center',
          },
        },
      },
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-4b12841b42ef468f886ee871abf39f2e',
        component: {
          name: 'Symbol',
          options: {
            symbol: {
              data: {
                description: 'default description',
                image:
                  'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F32b835cd8f62400085961dcf3f3b37a2',
              },
              model: 'symbol',
              entry: '29ab534d62c4406c8500e1cbfa609537',
              content: {
                createdDate: 1647468296291,
                screenshot:
                  'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F72d2ff7ac19549d798b830b2c9d9f3c4',
                createdBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
                variations: {},
                name: 'photo card symbol',
                published: 'published',
                firstPublished: 1647468296291,
                testRatio: 1,
                data: {
                  inputs: [
                    {
                      autoFocus: false,
                      simpleTextOnly: false,
                      broadcast: false,
                      copyOnAdd: true,
                      helperText: '',
                      '@type': '@khulnasoft.com/core:Field',
                      hidden: false,
                      subFields: [],
                      defaultValue: 'default description',
                      hideFromUI: false,
                      noPhotoPicker: false,
                      model: '',
                      hideFromFieldsEditor: false,
                      mandatory: false,
                      permissionsRequiredToEdit: '',
                      showIf: '',
                      onChange: '',
                      type: 'text',
                      required: false,
                      bubble: false,
                      advanced: false,
                      disallowRemove: false,
                      showTemplatePicker: true,
                      name: 'description',
                    },
                    {
                      autoFocus: false,
                      mandatory: false,
                      '@type': '@khulnasoft.com/core:Field',
                      permissionsRequiredToEdit: '',
                      showIf: '',
                      simpleTextOnly: false,
                      helperText: '',
                      noPhotoPicker: false,
                      showTemplatePicker: true,
                      hideFromUI: false,
                      advanced: false,
                      hideFromFieldsEditor: false,
                      model: '',
                      bubble: false,
                      name: 'image',
                      onChange: '',
                      disallowRemove: false,
                      allowedFileTypes: ['jpeg', 'png'],
                      required: false,
                      subFields: [],
                      type: 'file',
                      hidden: false,
                      copyOnAdd: true,
                      defaultValue:
                        'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F32b835cd8f62400085961dcf3f3b37a2',
                      broadcast: false,
                    },
                  ],
                  blocks: [
                    {
                      '@type': '@khulnasoft.com/sdk:Element',
                      '@version': 2,
                      id: 'khulnasoft-88afc6082bfb4afc84d72341ccf01695',
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
                                  bindings: {
                                    'component.options.image':
                                      'var _virtual_index=state.image;return _virtual_index',
                                  },
                                  id: 'khulnasoft-e61a203fbd034b58891e810206375885',
                                  component: {
                                    name: 'Image',
                                    options: {
                                      image:
                                        'https://cdn.khulnasoft.com/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d?width=998',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      lazy: true,
                                      fitContent: true,
                                      aspectRatio: 0.7041,
                                      sizes:
                                        '(max-width: 638px) 100vw, (max-width: 998px) 100vw, 42vw',
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
                                      width: '100%',
                                      minHeight: '20px',
                                      minWidth: '20px',
                                      overflow: 'hidden',
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
                                  id: 'khulnasoft-1b129f91c871409bb7c5e2f0967afa77',
                                  children: [
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      id: 'khulnasoft-5d336f09104c406d824482054c0bf58b',
                                      component: {
                                        name: 'Text',
                                        options: {
                                          text: '<p>Title of image</p>',
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
                                          textAlign: 'center',
                                        },
                                      },
                                    },
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      id: 'khulnasoft-b81cb922c844445a83e03913503c9273',
                                      component: {
                                        name: 'Text',
                                        options: {
                                          text: '<p>Description of image: </p>',
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
                                          textAlign: 'center',
                                        },
                                      },
                                    },
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      bindings: {
                                        'component.options.text':
                                          'var _virtual_index=state.description;return _virtual_index',
                                      },
                                      id: 'khulnasoft-d17f8e8a551b44c59c21e7cc0b5a500f',
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
                                          textAlign: 'center',
                                        },
                                      },
                                    },
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      id: 'khulnasoft-2463cce4794646c78fb1ad4e42909e25',
                                      component: {
                                        name: 'Text',
                                        options: {
                                          text: '<p>Author of image</p>',
                                        },
                                      },
                                      responsiveStyles: {
                                        large: {
                                          display: 'flex',
                                          flexDirection: 'column',
                                          position: 'relative',
                                          flexShrink: '0',
                                          boxSizing: 'border-box',
                                          lineHeight: 'normal',
                                          height: 'auto',
                                          textAlign: 'center',
                                          marginTop: 'auto',
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
                                      flexGrow: '1',
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
                    {
                      id: 'khulnasoft-pixel-fkkbe267km9',
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
                  state: {
                    deviceSize: 'large',
                    location: { path: '', query: {} },
                  },
                },
                id: '29ab534d62c4406c8500e1cbfa609537',
                query: [],
                lastUpdatedBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
                modelId: 'd661dd1d06ce43ddbe3c2fe35597e545',
                meta: {
                  hasLinks: false,
                  lastPreviewUrl:
                    'https://preview.khulnasoft.codes?model=symbol&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=symbol&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.symbol=29ab534d62c4406c8500e1cbfa609537&khulnasoft.overrides.29ab534d62c4406c8500e1cbfa609537=29ab534d62c4406c8500e1cbfa609537',
                  kind: 'component',
                  needsHydration: false,
                },
                lastUpdated: 1660657202161,
                rev: '84qvbzx8fvf',
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
            color: 'rgb(255, 0, 0)',
          },
          medium: {
            display: 'flex',
            color: 'rgb(0, 255, 6)',
          },
          small: {
            color: 'rgb(0, 255, 255)',
          },
        },
      },
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        layerName: 'photo card symbol',
        id: 'khulnasoft-9f3d979aacac4320a8a86f86a387b4fc',
        component: {
          name: 'Symbol',
          options: {
            symbol: {
              data: {
                description: 'special test description',
                image:
                  'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F4bce19c3d8f040b3a95e91000a98283e',
              },
              model: 'symbol',
              entry: '29ab534d62c4406c8500e1cbfa609537',
              content: {
                createdDate: 1647468296291,
                screenshot:
                  'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F72d2ff7ac19549d798b830b2c9d9f3c4',
                createdBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
                variations: {},
                name: 'photo card symbol',
                published: 'published',
                firstPublished: 1647468296291,
                testRatio: 1,
                data: {
                  inputs: [
                    {
                      autoFocus: false,
                      simpleTextOnly: false,
                      broadcast: false,
                      copyOnAdd: true,
                      helperText: '',
                      '@type': '@khulnasoft.com/core:Field',
                      hidden: false,
                      subFields: [],
                      defaultValue: 'default description',
                      hideFromUI: false,
                      noPhotoPicker: false,
                      model: '',
                      hideFromFieldsEditor: false,
                      mandatory: false,
                      permissionsRequiredToEdit: '',
                      showIf: '',
                      onChange: '',
                      type: 'text',
                      required: false,
                      bubble: false,
                      advanced: false,
                      disallowRemove: false,
                      showTemplatePicker: true,
                      name: 'description',
                    },
                    {
                      autoFocus: false,
                      mandatory: false,
                      '@type': '@khulnasoft.com/core:Field',
                      permissionsRequiredToEdit: '',
                      showIf: '',
                      simpleTextOnly: false,
                      helperText: '',
                      noPhotoPicker: false,
                      showTemplatePicker: true,
                      hideFromUI: false,
                      advanced: false,
                      hideFromFieldsEditor: false,
                      model: '',
                      bubble: false,
                      name: 'image',
                      onChange: '',
                      disallowRemove: false,
                      allowedFileTypes: ['jpeg', 'png'],
                      required: false,
                      subFields: [],
                      type: 'file',
                      hidden: false,
                      copyOnAdd: true,
                      defaultValue:
                        'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2F32b835cd8f62400085961dcf3f3b37a2',
                      broadcast: false,
                    },
                  ],
                  blocks: [
                    {
                      '@type': '@khulnasoft.com/sdk:Element',
                      '@version': 2,
                      id: 'khulnasoft-88afc6082bfb4afc84d72341ccf01695',
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
                                  bindings: {
                                    'component.options.image':
                                      'var _virtual_index=state.image;return _virtual_index',
                                  },
                                  id: 'khulnasoft-e61a203fbd034b58891e810206375885',
                                  component: {
                                    name: 'Image',
                                    options: {
                                      image:
                                        'https://cdn.khulnasoft.com/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d?width=998',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      lazy: true,
                                      fitContent: true,
                                      aspectRatio: 0.7041,
                                      sizes:
                                        '(max-width: 638px) 100vw, (max-width: 998px) 100vw, 42vw',
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
                                      width: '100%',
                                      minHeight: '20px',
                                      minWidth: '20px',
                                      overflow: 'hidden',
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
                                  id: 'khulnasoft-1b129f91c871409bb7c5e2f0967afa77',
                                  children: [
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      id: 'khulnasoft-5d336f09104c406d824482054c0bf58b',
                                      component: {
                                        name: 'Text',
                                        options: {
                                          text: '<p>Title of image</p>',
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
                                          textAlign: 'center',
                                        },
                                      },
                                    },
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      id: 'khulnasoft-b81cb922c844445a83e03913503c9273',
                                      component: {
                                        name: 'Text',
                                        options: {
                                          text: '<p>Description of image: </p>',
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
                                          textAlign: 'center',
                                        },
                                      },
                                    },
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      bindings: {
                                        'component.options.text':
                                          'var _virtual_index=state.description;return _virtual_index',
                                      },
                                      id: 'khulnasoft-d17f8e8a551b44c59c21e7cc0b5a500f',
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
                                          textAlign: 'center',
                                        },
                                      },
                                    },
                                    {
                                      '@type': '@khulnasoft.com/sdk:Element',
                                      '@version': 2,
                                      id: 'khulnasoft-2463cce4794646c78fb1ad4e42909e25',
                                      component: {
                                        name: 'Text',
                                        options: {
                                          text: '<p>Author of image</p>',
                                        },
                                      },
                                      responsiveStyles: {
                                        large: {
                                          display: 'flex',
                                          flexDirection: 'column',
                                          position: 'relative',
                                          flexShrink: '0',
                                          boxSizing: 'border-box',
                                          lineHeight: 'normal',
                                          height: 'auto',
                                          textAlign: 'center',
                                          marginTop: 'auto',
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
                                      flexGrow: '1',
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
                    {
                      id: 'khulnasoft-pixel-fkkbe267km9',
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
                  state: {
                    deviceSize: 'large',
                    location: { path: '', query: {} },
                  },
                },
                id: '29ab534d62c4406c8500e1cbfa609537',
                query: [],
                lastUpdatedBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
                modelId: 'd661dd1d06ce43ddbe3c2fe35597e545',
                meta: {
                  hasLinks: false,
                  lastPreviewUrl:
                    'https://preview.khulnasoft.codes?model=symbol&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=symbol&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.symbol=29ab534d62c4406c8500e1cbfa609537&khulnasoft.overrides.29ab534d62c4406c8500e1cbfa609537=29ab534d62c4406c8500e1cbfa609537',
                  kind: 'component',
                  needsHydration: false,
                },
                lastUpdated: 1660657202161,
                rev: '84qvbzx8fvf',
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
          },
        },
      },
      {
        id: 'khulnasoft-pixel-ltvdupwjhm',
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
    url: '/symbols',
    state: {
      deviceSize: 'large',
      location: { pathname: '/symbols', path: ['symbols'], query: {} },
    },
  },
  id: '2a23baae19a64031b8dd17e8fd8adc47',
  lastUpdatedBy: 'OcOewqA7uqVVlVfqY453F8vgcc33',
  meta: {
    hasLinks: false,
    kind: 'page',
    lastPreviewUrl:
      'https://preview.khulnasoft.codes?model=page&previewing=truehttp://localhost:3000/symbols&apiKey=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.space=f1a790f8c3204b3b8c5c1795aeac4660&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=2a23baae19a64031b8dd17e8fd8adc47&khulnasoft.overrides.2a23baae19a64031b8dd17e8fd8adc47=2a23baae19a64031b8dd17e8fd8adc47&khulnasoft.overrides.page:/=2a23baae19a64031b8dd17e8fd8adc47',
    needsHydration: true,
  },
  modelId: '240a12053d674735ac2a384dcdc561b5',
  name: 'Symbols',
  published: 'published',
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      operator: 'is',
      property: 'urlPath',
      value: '/symbols',
    },
  ],
  testRatio: 1,
  variations: {},
  lastUpdated: 1660661567598,
  screenshot:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2Ff1a790f8c3204b3b8c5c1795aeac4660%2Fb4c208dab77d489386f78e8cf43f5feb',
  firstPublished: 1649431689632,
  rev: 'q440q0er5p',
} as const;

const splitUpContent = () => {
  const CONTENT_CLONE = JSON.parse(JSON.stringify(CONTENT));
  const FIRST_SYMBOL_CONTENT = CONTENT_CLONE.data.blocks[1].component.options.symbol.content;
  const SECOND_SYMBOL_CONTENT = CONTENT_CLONE.data.blocks[2].component.options.symbol.content;
  // remove both symbol content from content
  delete CONTENT_CLONE.data.blocks[1].component.options.symbol.content;
  delete CONTENT_CLONE.data.blocks[2].component.options.symbol.content;

  return { CONTENT_WITHOUT_SYMBOLS: CONTENT_CLONE, FIRST_SYMBOL_CONTENT, SECOND_SYMBOL_CONTENT };
};

export const { CONTENT_WITHOUT_SYMBOLS, FIRST_SYMBOL_CONTENT, SECOND_SYMBOL_CONTENT } =
  splitUpContent();
