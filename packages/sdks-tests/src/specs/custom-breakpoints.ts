import type { KhulnasoftContent } from './types.js';

export const CONTENT = {
  meta: {
    lastPreviewUrl:
      'http://localhost:3000/all-custom-breakpoints-cases?khulnasoft.space=598b0e0699ec457e8a2dbcddabd0dc8b&khulnasoft.cachebust=true&khulnasoft.preview=new-page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.new-page=598b0e0699ec457e8a2dbcddabd0dc8b_e2e76ec7673c4a8bab994232c2518553&khulnasoft.overrides.598b0e0699ec457e8a2dbcddabd0dc8b_e2e76ec7673c4a8bab994232c2518553=598b0e0699ec457e8a2dbcddabd0dc8b_e2e76ec7673c4a8bab994232c2518553&khulnasoft.overrides.new-page:/all-custom-breakpoints-cases=598b0e0699ec457e8a2dbcddabd0dc8b_e2e76ec7673c4a8bab994232c2518553',
    breakpoints: {
      medium: 800,
      small: 500,
      xsmall: 320,
    },
    hasLinks: false,
    kind: 'page',
    originalContentId: '598b0e0699ec457e8a2dbcddabd0dc8b_c293f45703c74bfa890786b4967fc098',
    winningTest: null,
  },
  createdDate: 1668786952389,
  query: [
    {
      property: 'urlPath',
      '@type': '@khulnasoft.com/core:Query',
      value: '/all-custom-breakpoints-cases',
      operator: 'is',
    },
  ],
  ownerId: '598b0e0699ec457e8a2dbcddabd0dc8b',
  createdBy: 'iWvU0fXytRMIvtgMTkEhA0Xnsn43',
  modelId: '598b0e0699ec457e8a2dbcddabd0dc8b_9bf60dcd567a41cebc919b08e957749e',
  data: {
    newfield1: '',
    themeId: false,
    inputs: [],
    title: 'columns-fix',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-07a33dd533c3450bbfc00672e3e093eb',
        meta: { previousId: 'khulnasoft-137c5a8a2dae4bda93de3cf1db06ac1c' },
        component: {
          name: 'Columns',
          options: {
            columns: [
              {
                blocks: [
                  {
                    '@type': '@khulnasoft.com/sdk:Element',
                    '@version': 2,
                    id: 'khulnasoft-4f3e2ce955e248c6872b055286ff5394',
                    component: {
                      name: 'Text',
                      options: { text: '<p>Column 1 (row in desktop)</p>' },
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
                    id: 'khulnasoft-a621d5a3c6dc45a895924e4152edb2d0',
                    component: {
                      name: 'Text',
                      options: {
                        text: '<p>Column 2 (right aligned and stacked in tablet)</p>',
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
                      medium: { color: 'rgba(223, 22, 22, 1)' },
                      small: { color: 'rgba(126, 211, 33, 1)' },
                      xsmall: { color: 'rgba(25, 201, 216, 1)' },
                    },
                  },
                ],
              },
              {
                blocks: [
                  {
                    '@type': '@khulnasoft.com/sdk:Element',
                    '@version': 2,
                    id: 'khulnasoft-a5a73b3c366a4817a73fdc7398e48539',
                    component: {
                      name: 'Text',
                      options: {
                        text: '<p>Column 3 (center aligned and stacked in mobile)</p>',
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
                      medium: { color: 'rgba(208, 2, 27, 1)' },
                      small: { color: 'rgba(126, 211, 33, 1)' },
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
          medium: { marginLeft: 'auto' },
          small: { marginLeft: 'auto', marginRight: 'auto' },
        },
      },
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-cbc165b835274e39a52d5a581a0a4177',
        meta: { previousId: 'khulnasoft-e309a8c6f39545d982f239390c006fe1' },
        component: {
          name: 'Text',
          options: {
            text: '<p>BREAKPOINTS 500 - 800</p><p>501 - 800 RED</p><p>500 and below GREEN</p>',
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
          medium: { color: 'rgba(208, 2, 27, 1)' },
          small: { color: 'rgba(65, 117, 5, 1)' },
          xsmall: { color: 'rgba(25, 201, 216, 1)' },
        },
      },
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        id: 'khulnasoft-8570b01e08dd48f5b372877834293711',
        meta: { previousId: 'khulnasoft-b43f7c5f5ce244619633f4efaf3a9839' },
        component: {
          name: 'Image',
          options: {
            image:
              'https://cdn.khulnasoft.com/api/v1/image/assets%2F2da67e7bcbdb46c6b269648640a961aa%2F29060b0e5aac4adfa7e4e1a28fa4a7af',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            lazy: false,
            fitContent: true,
            aspectRatio: 0.666,
            lockAspectRatio: false,
            height: 933,
            width: 1400,
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
          medium: { display: 'none' },
          small: { display: 'flex', width: '25%', maxWidth: '250px' },
        },
      },
    ],
    blocksString:
      '[{"@type":"@khulnasoft.com/sdk:Element","@version":2,"id":"khulnasoft-07a33dd533c3450bbfc00672e3e093eb","meta":{"previousId":"khulnasoft-137c5a8a2dae4bda93de3cf1db06ac1c"},"component":{"name":"Columns","options":{"columns":[{"blocks":[{"@type":"@khulnasoft.com/sdk:Element","@version":2,"id":"khulnasoft-4f3e2ce955e248c6872b055286ff5394","component":{"name":"Text","options":{"text":"<p>Column 1 (row in desktop)</p>"}},"responsiveStyles":{"large":{"display":"flex","flexDirection":"column","position":"relative","flexShrink":"0","boxSizing":"border-box","marginTop":"20px","lineHeight":"normal","height":"auto"}}}]},{"blocks":[{"@type":"@khulnasoft.com/sdk:Element","@version":2,"id":"khulnasoft-a621d5a3c6dc45a895924e4152edb2d0","component":{"name":"Text","options":{"text":"<p>Column 2 (right aligned and stacked in tablet)</p>"}},"responsiveStyles":{"large":{"display":"flex","flexDirection":"column","position":"relative","flexShrink":"0","boxSizing":"border-box","marginTop":"20px","lineHeight":"normal","height":"auto"},"medium":{"color":"rgba(223, 22, 22, 1)"},"small":{"color":"rgba(126, 211, 33, 1)"},"xsmall":{"color":"rgba(25, 201, 216, 1)"}}}]},{"blocks":[{"@type":"@khulnasoft.com/sdk:Element","@version":2,"id":"khulnasoft-a5a73b3c366a4817a73fdc7398e48539","component":{"name":"Text","options":{"text":"<p>Column 3 (center aligned and stacked in mobile)</p>"}},"responsiveStyles":{"large":{"display":"flex","flexDirection":"column","position":"relative","flexShrink":"0","boxSizing":"border-box","marginTop":"20px","lineHeight":"normal","height":"auto"},"medium":{"color":"rgba(208, 2, 27, 1)"},"small":{"color":"rgba(126, 211, 33, 1)"}}}]}],"space":20,"stackColumnsAt":"tablet","reverseColumnsWhenStacked":false}},"responsiveStyles":{"large":{"display":"flex","flexDirection":"column","position":"relative","flexShrink":"0","boxSizing":"border-box","marginTop":"20px"},"medium":{"marginLeft":"auto"},"small":{"marginLeft":"auto","marginRight":"auto"}}},{"@type":"@khulnasoft.com/sdk:Element","@version":2,"id":"khulnasoft-cbc165b835274e39a52d5a581a0a4177","meta":{"previousId":"khulnasoft-e309a8c6f39545d982f239390c006fe1"},"component":{"name":"Text","options":{"text":"<p>BREAKPOINTS 500 - 800</p><p>501 - 800 RED</p><p>500 and below GREEN</p>"}},"responsiveStyles":{"large":{"display":"flex","flexDirection":"column","position":"relative","flexShrink":"0","boxSizing":"border-box","marginTop":"20px","lineHeight":"normal","height":"auto"},"medium":{"color":"rgba(208, 2, 27, 1)"},"small":{"color":"rgba(65, 117, 5, 1)"},"xsmall":{"color":"rgba(25, 201, 216, 1)"}}},{"@type":"@khulnasoft.com/sdk:Element","@version":2,"id":"khulnasoft-8570b01e08dd48f5b372877834293711","meta":{"previousId":"khulnasoft-b43f7c5f5ce244619633f4efaf3a9839"},"component":{"name":"Image","options":{"image":"https://cdn.khulnasoft.com/api/v1/image/assets%2F2da67e7bcbdb46c6b269648640a961aa%2F29060b0e5aac4adfa7e4e1a28fa4a7af","backgroundSize":"cover","backgroundPosition":"center","lazy":false,"fitContent":true,"aspectRatio":0.666,"lockAspectRatio":false,"height":933,"width":1400}},"responsiveStyles":{"large":{"display":"flex","flexDirection":"column","position":"relative","flexShrink":"0","boxSizing":"border-box","marginTop":"20px","width":"100%","minHeight":"20px","minWidth":"20px","overflow":"hidden"},"medium":{"display":"none"},"small":{"display":"flex","width":"25%","maxWidth":"250px"}}}]',
  },
  lastUpdateBy: null,
  testRatio: 1,
  metrics: {
    clicks: 0,
    impressions: 0,
  },
  priority: -1,
  lastUpdated: 1668786990557,
  '@version': 3,
  id: '598b0e0699ec457e8a2dbcddabd0dc8b_e2e76ec7673c4a8bab994232c2518553',
  published: 'published',
  variations: {},
  firstPublished: 1668609208331,
  lastUpdatedBy: 'iWvU0fXytRMIvtgMTkEhA0Xnsn43',
  name: 'all custom breakpoints cases',
};

function fastClone<T extends object>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

const getResetContent = () => {
  const contentWithoutBreakpoints = fastClone(CONTENT as KhulnasoftContent);
  delete contentWithoutBreakpoints.meta!.breakpoints;
  return contentWithoutBreakpoints;
};

export const CONTENT_RESET = getResetContent();
