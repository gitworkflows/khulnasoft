import {
  getCookie,
  getQueryParam,
  setCookie,
} from '@/scripts/init-referrer-cookie';
import dedent from 'dedent';
import React, { useEffect, useState } from 'react';
import useEventListener from 'use-typed-event-listener';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light-async';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml';
import githubGist from 'react-syntax-highlighter/dist/cjs/styles/hljs/github-gist';
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import { theme } from '@/constants/theme';
import { Khulnasoft } from '@khulnasoft.com/sdk';
import CircularProgress from '@material-ui/core/CircularProgress';
import { KhulnasoftBlocks } from '@khulnasoft.com/react';

const camelCase = (str: string) =>
  str.replace(/-([a-z])/g, (match) => match[1].toUpperCase());

SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('xml', html);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type CodeSnippetsProps = {
  modelName?: string;
  modelType?: ModelType;
  dark?: boolean;
  // TODO
  entry?: string;
  tabs?: string;
  overrideTabsContent?: string;
  omitTabs?: string;
  hideLearnMoreLink?: string;
};

type ModelType = 'page' | 'section' | 'data';

type Tab =
  | 'react'
  | 'next'
  | 'gatsby'
  | 'angular'
  | 'vue'
  | 'nuxt'
  | 'rest'
  | 'shopify'
  | 'webcomponents'
  | 'javascript'
  | 'graphql';

const tabs: Tab[] = [
  'react',
  'next',
  'gatsby',
  'shopify',
  'vue',
  'nuxt',
  'angular',
  'rest',
  'graphql',
  'javascript',
  'webcomponents',
];

const TAB_CHANGE_EVENT_NAME = 'khulnasoft:codeSnippets:changeTab';
const USE_TAB_COOKIE_NAME = 'khulnasoft:codeSnippets:useTab';
const USE_TAB_QUERY_PARAM = 'codeFramework';
const DEFAULT_TAB = 'react';

function getDefaultTab(): Tab {
  const cookieTab = getCookie(USE_TAB_COOKIE_NAME);
  if (tabs.includes(cookieTab as Tab)) {
    return cookieTab as Tab;
  }
  return DEFAULT_TAB;
}

export interface TabInfo {
  name: string;
  language: string;
  code: (modelName: string, apiKey: string, modelType: string) => string;
  image: string;
  documentationUrl: string;
}

export const frameworkTabs: Record<Tab, TabInfo> = {
  shopify: {
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0f577e84eb4e4aa4a69d602dd376aa11',
    name: 'Shopify',
    code: (name) => dedent`
      {% comment %}
        Include this anywhere in your liquid code
        Alternatively, you can use symbols to include this content in any other Khulnasoft content
        https://khulnasoft.com/c/docs/symbols
      {% endcomment %}

      {% include 'model.${name}.khulnasoft' %}
    `,
    language: 'django',
    documentationUrl: 'https://www.khulnasoft.com/c/docs/shopify/developers',
  },
  rest: {
    name: 'REST API',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F7c16907175964f5dada038f6cceef77b',
    code: (name, key) => dedent`
      curl https://khulnasoft.com/api/v1/html/${name}?apiKey=${key}&url=/some-url

      # Example response
      # {
      #   "id": "c923kd89",
      #   "name": "My first homepage",
      #   "data: {
      #     "html": "<div data-khulnasoft-component="${name}"><div class="khulnasoft-blocks"><h1>Hello!</h1></div></div>",
      #     "customProperty": "customValue"
      #   }
      # }
    `,
    language: 'bash',
    documentationUrl: 'https://khulnasoft.com/c/docs/html-api',
  },
  graphql: {
    name: 'GraphQL',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fb739b409e5b94937b5b11e3cf62cfae4',
    code: (name, key) => dedent`
      curl https://khulnasoft.com/api/v1/graphql/${key}?query=query{${camelCase(
      name,
    )}(options:{prerender:true},target:{urlPath:"/some-url"}){content}}

      # Example response
      # {
      #   "data: {
      #     "${camelCase(name)}": { 
      #       "content": { 
      #         "data": {
      #           "html": "<div data-khulnasoft-component="${name}"><div class="khulnasoft-blocks"><h1>Hello!</h1></div></div>",
      #           "customProperty": "customValue"
      #         }
      #       }
      #     } 
      #   }
      # }
    `,
    language: 'bash',
    documentationUrl: 'https://khulnasoft.com/graphql-explorer',
  },
  react: {
    name: 'React',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F2f3409f4f8b64d5f880195061aa481ab',
    code: (name, key) => dedent`
    import { khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react'

    khulnasoft.init('${key}')

    export default const MyComponent = () => (
      <KhulnasoftComponent
        model="${name}" />
    )
    `,
    language: 'javascript',
    documentationUrl:
      'https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react',
  },
  next: {
    name: 'Next',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fc6a3c58c0bde4f43b1fd6a350f491bdf',
    code: (name, key) => dedent`
    import { khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react'

    khulnasoft.init('${key}')

    export const getStaticProps = async (context) => {
      const content = await khulnasoft.get('${name}', { url: context.resolvedUrl }).promise();

      return { 
        props: { content }, 
        revalidate: true,
        notFound: !content
      }
    }

    export default const MyComponent = (props) => (
      <KhulnasoftComponent
        content={props.content}
        model="${name}" />
    )
    `,
    language: 'javascript',
    documentationUrl:
      'https://github.com/khulnasoft-com/khulnasoft/tree/master/examples/next-js',
  },
  gatsby: {
    name: 'Gatsby',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F45e59fc603574e708dcb79e45ef72d02',
    code: (name, key) => dedent`
      import { khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react'
      import { graphql } from 'gatsby'

      khulnasoft.init('${key}')

      export default const MyComponent = (props) => {
        const content = props.data?.allKhulnasoftModels.landingPage[0]?.content;
      
        return <KhulnasoftComponent
          content={content}
          model="${name}" />
      }

      export const query = graphql\`
        query($path: String!) {
          allKhulnasoftModels {
            page(
              target: { urlPath: $path }
              limit: 1
              options: { cachebust: true }
            ) { content }
          }
        }
      \`
    `,
    language: 'javascript',
    documentationUrl:
      'https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/gatsby',
  },
  angular: {
    name: 'Angular',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fa91e9e437203442d8ed481eef94a99dc',
    code: (name, key) => dedent`
      // In your module
      import { KhulnasoftModule } from '@khulnasoft.com/angular'
      @NgModule({
        imports: [ KhulnasoftModule.forRoot('${key}') ]
        // ...
      })
      export class AppModule {}

      // Then in your component template
      <khulnasoft-component name="${name}"></khulnasoft-component>
    `,
    language: 'javascript',
    documentationUrl:
      'https://github.com/khulnasoft-com/khulnasoft/tree/master/examples/angular',
  },
  vue: {
    name: 'Vue',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F7cc6d5b6fc4045d5a9f9b12ddcc65407',
    code: (name, key) => dedent`
      <template>
        <RenderContent model="${name}" />
      </template>
      <script>
        import { RenderContent, khulnasoft } from '@khulnasoft.com/vue'

        khulnasoft.init("${key}")

        export default { 
          components: { RenderContent }
        }
      </script>
    `,
    language: 'html',
    documentationUrl:
      'https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/vue',
  },
  nuxt: {
    name: 'Nuxt',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F73f47f47e0cc46cd95dbf72c26728858',
    code: (name, key) => dedent`
      <template>
        <RenderContent model="${name}" />
      </template>
      <script>
        import { RenderContent, khulnasoft } from '@khulnasoft.com/vue'

        khulnasoft.init("${key}")

        export default { 
          components: { RenderContent }
        }
      </script>
    `,
    language: 'html',
    documentationUrl:
      'https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/vue',
  },
  webcomponents: {
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F5613cb3536be4c108b32c34bf06f1c59',
    name: 'Webcomponents',
    code: (name, key) => {
      return dedent`
      <script async src="https://cdn.khulnasoft.com/js/webcomponents"></script>
        
      <!-- Put this component where you want this Khulnasoft content to display -->
      <khulnasoft-component model="${name}" api-key="${key}">
        <!-- content here displays while loading -->
        Loading...
      </khulnasoft-component>
    `;
    },
    language: 'html',
    documentationUrl: 'https://www.khulnasoft.com/c/docs/webcomponents-api',
  },
  javascript: {
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fd09e5d3e78654f34964b8ff30988fd2e',
    name: 'JS',
    language: 'javascript',
    code: (name, key, type) => {
      return dedent`
        import { khulnasoft } from '@khulnasoft.com/sdk'

        khulnasoft.init('${key}')

        khulnasoft.get('${name}').promise().then(content => {
          // Add the HTML to the element needed
          document.querySelector('#${
            type === 'page' ? 'page' : 'section'
          }').innerHTML = content.data.html
        });
      `;
    },
    // TODO: wordpress specific embed instructions
    documentationUrl:
      'https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/core',
  },
};

export function CodeSnippets(props: CodeSnippetsProps) {
  const [tab, _setTab] = useState(getDefaultTab);

  let useTabs = (
    props.tabs
      ? props.tabs.split(',').filter((tab) => tabs.includes(tab as any))
      : tabs
  ) as Tab[];

  if (props.omitTabs) {
    const omitTabsArr = props.omitTabs.split(',');
    useTabs = useTabs.filter((item) => !omitTabsArr.includes(item));
  }

  const customContentTabs =
    props.overrideTabsContent
      ?.split(',')
      .filter((tab) => tabs.includes(tab as any)) || [];

  const [isBrowser, setIsBrowser] = useState(false);

  if (Khulnasoft.isBrowser) {
    useEventListener(window, TAB_CHANGE_EVENT_NAME, (e) => {
      const event = e as CustomEvent;
      const tab = event.detail.tab;
      if (tabs.includes(tab)) {
        _setTab(tab);
      }
    });
  }

  const modelType = props.modelType || 'page';

  function changeTab(newTab: Tab) {
    if (!tabs.includes(newTab)) {
      return;
    }
    _setTab(newTab);
    setCookie(
      USE_TAB_COOKIE_NAME,
      newTab,
      365,
      location.hostname.endsWith('khulnasoft.com')
        ? `;domain=khulnasoft.com`
        : undefined,
    );
    window.dispatchEvent(
      new CustomEvent(TAB_CHANGE_EVENT_NAME, {
        detail: {
          tab: newTab,
        },
      }),
    );
  }

  useEffect(() => {
    const frameworkParam: any = getQueryParam(
      location.href,
      USE_TAB_QUERY_PARAM,
    );
    if (frameworkParam && tabs.includes(frameworkParam)) {
      const url = new URL(location.href);
      url.searchParams.delete(USE_TAB_QUERY_PARAM);
      const newParamsString = url.searchParams.toString();
      const newUrl =
        url.pathname +
        (newParamsString ? '?' + newParamsString : '') +
        (url.hash || '');
      changeTab(frameworkParam);

      // For some reason this only works with a long delay
      setTimeout(() => {
        window.history.replaceState({}, '_replace', newUrl);
      }, 500);
    }
  }, []);

  const apiKey = getCookie('khulnasoft.apiKey') || 'YOUR_KEY';

  const tabInfo = frameworkTabs[tab];
  const code = tabInfo?.code(
    props.modelName || 'page',
    apiKey,
    props.modelType || '[age',
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return (
      <div
        css={{
          display: 'flex',
          padding: 50,
        }}
      >
        <CircularProgress
          disableShrink
          size={30}
          css={{
            margin: 'auto',
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div css={{ display: 'flex', overflow: 'auto' }}>
        <div css={{ display: 'flex', margin: 'auto' }}>
          {useTabs.map((name, index) => {
            const thisTab = frameworkTabs[name];
            const isSelected = tab === name;
            return (
              <button
                title={name}
                css={{
                  cursor: 'pointer',
                  appearance: 'none',
                  border: 'none',
                  padding: '10px 20px',
                  background: 'none',
                  outline: 'none',
                  textAlign: 'center',
                  filter: isSelected ? 'none' : 'grayscale(100%)',
                  fontWeight: isSelected ? 'bold' : undefined,
                  opacity: isSelected ? 1 : 0.3,
                  transition:
                    'filter 0.1s ease-in-out, opacity 0.1s ease-in-out',
                  '&:hover': {
                    opacity: isSelected ? undefined : 1,
                    filter: isSelected ? undefined : 'none',
                    '.name': {
                      maxWidth: 'none',
                    },
                  },
                }}
                className={isSelected ? 'selected' : ''}
                onClick={() => changeTab(name)}
                key={index}
              >
                <img
                  css={{
                    width: 30,
                    height: 30,
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  src={thisTab?.image || frameworkTabs.rest.image}
                />
                <div
                  className="name"
                  css={{
                    marginTop: 5,
                    maxWidth: isSelected ? 'none' : 60,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {thisTab?.name || (
                    <span css={{ textTransform: 'capitalize' }}>{name}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        {customContentTabs.includes(tab) ? (
          <KhulnasoftBlocks
            // TODO: childOf [parentBlocks]?
            child
            parentElementId={(props as any).khulnasoftBlock?.id}
            blocks={(props as any).customTabContent?.[tab]}
            dataPath={`component.options.customTabContent.${tab}`}
          />
        ) : (
          <>
            {modelType === 'page' && tab === 'shopify' ? (
              <div
                css={{
                  textAlign: 'center',
                  padding: 30,
                }}
              >
                Page building is built into our Theme Studio for Shopify app, no
                integration required!
              </div>
            ) : (
              <SyntaxHighlighter
                customStyle={{
                  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                  lineHeight: '1em',
                  fontSize: '1.2em',
                  padding: '20px',
                  borderRadius: 4,
                }}
                style={props.dark !== false ? oneDark : githubGist}
                language={tabInfo?.language || 'javascript'}
              >
                {code || ''}
              </SyntaxHighlighter>
            )}
          </>
        )}
        {(!props.hideLearnMoreLink ||
          !props.hideLearnMoreLink.split(',').includes(tab)) && (
          <a
            css={{
              padding: 10,
              textAlign: 'center',
              color: theme.colors.primary,
              display: 'block',
            }}
            href={
              tab === 'shopify' && modelType === 'page'
                ? 'https://apps.shopify.com/khulnasoft-2'
                : tabInfo?.documentationUrl
            }
            target="_blank"
            rel="noopenner"
          >
            Learn more
          </a>
        )}
      </div>
    </div>
  );
}
