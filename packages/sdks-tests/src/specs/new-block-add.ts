export const NEW_BLOCK_ADD = {
  ownerId: 'ad30f9a246614faaa6a03374f83554c9',
  lastUpdateBy: null,
  createdDate: 1740465158921,
  id: '5b981fdce0d8492b97ee820c91c57182',
  '@version': 4,
  name: 'coolsafasfr',
  modelId: '17c6065109ef4062ba083f5741f4ee6a',
  published: 'published',
  meta: {
    hasLinks: false,
    lastPreviewUrl:
      'http://localhost:4200/coolsafasfr?khulnasoft.space=ad30f9a246614faaa6a03374f83554c9&khulnasoft.user.permissions=read%2Ccreate%2Cpublish%2CeditCode%2CeditDesigns%2Cadmin%2CeditLayouts%2CeditLayers%2CeditContentPriority&khulnasoft.user.role.name=Admin&khulnasoft.user.role.id=admin&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=5b981fdce0d8492b97ee820c91c57182&khulnasoft.overrides.5b981fdce0d8492b97ee820c91c57182=5b981fdce0d8492b97ee820c91c57182&khulnasoft.overrides.page:/coolsafasfr=5b981fdce0d8492b97ee820c91c57182&khulnasoft.options.locale=Default',
    kind: 'page',
  },
  priority: -995,
  stage: 'b3ee01559a244a078973f545ad475eba',
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      property: 'urlPath',
      operator: 'is',
      value: '/coolsafasfr',
    },
  ],
  data: {
    title: 'coolsafasfr',
    themeId: false,
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-748ee741cdab4a5181fe83ffa0af7ff6',
        component: {
          name: 'Text',
          options: {
            text: 'some text already published',
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
  lastUpdated: 1740466357145,
  firstPublished: 1740465351426,
  testRatio: 1,
  createdBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  lastUpdatedBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  folders: [],
};

export const NEW_BLOCK_ADD_2 = {
  ...NEW_BLOCK_ADD,
  data: {
    ...NEW_BLOCK_ADD.data,
    blocks: [
      ...NEW_BLOCK_ADD.data.blocks,
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-421fe741cdab4a5181fe83ffa0af7ff6',
        component: { name: 'Text', options: { text: 'end text' } },
      },
    ],
  },
};
