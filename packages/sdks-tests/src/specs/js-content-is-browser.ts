export const JS_CONTENT_IS_BROWSER = {
  ownerId: 'ad30f9a246614faaa6a03374f83554c9',
  lastUpdateBy: null,
  createdDate: 1705670644112,
  id: 'e9f017bb5a54485a95037344afe1fb46',
  '@version': 4,
  name: 'getdate',
  modelId: '17c6065109ef4062ba083f5741f4ee6a',

  published: 'published',
  meta: {
    hasLinks: false,
    kind: 'page',
    lastPreviewUrl:
      'http://localhost:5173/getdate?khulnasoft.space=ad30f9a246614faaa6a03374f83554c9&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=e9f017bb5a54485a95037344afe1fb46&khulnasoft.overrides.e9f017bb5a54485a95037344afe1fb46=e9f017bb5a54485a95037344afe1fb46&khulnasoft.overrides.page:/getdate=e9f017bb5a54485a95037344afe1fb46',
  },
  priority: -88,
  query: [
    {
      '@type': '@khulnasoft.com/core:Query',
      property: 'urlPath',
      operator: 'is',
      value: '/getdate',
    },
  ],
  data: {
    jsCode:
      'var __awaiter=function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(e){i(e)}}function u(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,u)}l((r=r.apply(e,n||[])).next())}))},__generator=function(e,n){var t,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(e,a)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};function main(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){return Khulnasoft.isServer,Khulnasoft.isBrowser&&console.log("hello world"),[2]}))}))}var _virtual_index=main();return _virtual_index',
    inputs: [],
    tsCode:
      "/*\n  * Global objects available:\n  *\n  * state - khulnasoft state object - learn about state https://www.khulnasoft.com/c/docs/guides/state-and-actions\n  * context - khulnasoft context object - learn about state https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react#passing-data-and-functions-down\n  * fetch - Fetch API - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API'\n  * Khulnasoft - Khulnasoft object - useful values include: Khulnasoft.isServer, Khulnasoft.isBrowser, Khulnasoft.isPreviewing, Khulnasoft.isEditing\n  *\n  * visit https://www.khulnasoft.com/c/docs/guides/custom-code\n  * for more information on writing custom code\n  */\n async function main () {\n  if (Khulnasoft.isServer) {\n    // Place any code here you want to only run on the server. Any  \n    // data fetched on the server will be available to re-hydrate on the client\n    // if added to the state object\n  }\n\n  if (Khulnasoft.isBrowser) {\n    // Place code that you only want to run in the browser (client side only) here\n    // For example, anything that uses document/window access or DOM manipulation\n    console.log('hello world')\n  }\n}\n\nexport default main();",
    themeId: false,
    title: 'getdate',
    blocks: [
      {
        '@type': '@khulnasoft.com/sdk:Element',
        '@version': 2,
        bindings: {
          'component.options.text': 'var _virtual_index=state.year;return _virtual_index',
        },
        code: {
          bindings: {
            'component.options.text': 'state.year',
          },
        },
        id: 'khulnasoft-20536be45acc4cd9921a836b12ab53c1',
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
  lastUpdated: 1705679243443,
  firstPublished: 1705670768358,
  testRatio: 1,
  createdBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  lastUpdatedBy: 'RuGeCLr9ryVt1xRazFYc72uWwIK2',
  folders: [],
};
