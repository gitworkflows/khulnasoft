export const CUSTOM_CODE_DOM_UPDATE = {
  ownerId: 'ad30f9a246614faaa6a03374f83554c9',
  lastUpdateBy: null,
  createdDate: 1739026168594,
  id: '69e8b1f090cd4f7db6d9b74a61bb5ea9',
  '@version': 4,
  name: 'template-test',
  modelId: '17c6065109ef4062ba083f5741f4ee6a',
  published: 'published',
  meta: {
    lastPreviewUrl:
      'http://localhost:4200/template-test?khulnasoft.space=ad30f9a246614faaa6a03374f83554c9&khulnasoft.user.permissions=read%2Ccreate%2Cpublish%2CeditCode%2CeditDesigns%2Cadmin%2CeditLayouts%2CeditLayers%2CeditContentPriority&khulnasoft.user.role.name=Admin&khulnasoft.user.role.id=admin&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=69e8b1f090cd4f7db6d9b74a61bb5ea9&khulnasoft.overrides.69e8b1f090cd4f7db6d9b74a61bb5ea9=69e8b1f090cd4f7db6d9b74a61bb5ea9&khulnasoft.overrides.page:/template-test=69e8b1f090cd4f7db6d9b74a61bb5ea9&khulnasoft.options.locale=Default',
    kind: 'page',
    hasLinks: false,
  },
  priority: -975,
  stage: 'b3ee01559a244a078973f545ad475eba',
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      property: 'urlPath',
      operator: 'is',
      value: '/template-test',
    },
  ],
  data: {
    themeId: false,
    title: 'template-test',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-c61ad147db4f4d92bb20495f97c1555b',
        component: {
          name: 'Custom Code',
          options: {
            code: "<p id=\"myPara\">Hello there, I am custom HTML code!</p>\n\n<script>\n  const myPara = document.querySelector('#myPara');\n\n  console.log('here', myPara, myPara.innerHTML)\n\n  myPara.innerHTML = 'hello'\n\n myPara.style.backgroundColor = 'green';\n</script>\n",
            scriptsClientOnly: false,
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
  lastUpdated: 1739540707978,
  firstPublished: 1739026188135,
  testRatio: 1,
  screenshot:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2Fad30f9a246614faaa6a03374f83554c9%2Fb24ce391f6d24e9da21794e6a08c6e1d',
  createdBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  lastUpdatedBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  folders: [],
};
