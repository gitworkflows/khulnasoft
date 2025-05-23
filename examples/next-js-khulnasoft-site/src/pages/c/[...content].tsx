import React from 'react';
import { Khulnasoft, khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react';
import Head from 'next/head';
import { renderLink } from '../../functions/render-link';
import { defaultTitle, defaultDescription } from '../../constants/seo-tags';
import { GetStaticProps } from 'next';
import { USE_CODEGEN } from '@/constants/use-codegen';

khulnasoft.init('YJIGb4i01jvw0SRdL5Bt');

const verticalBreakpoint = '@media (max-width: 800px)';

if (USE_CODEGEN) {
  khulnasoft.env = process.env.NODE_ENV === 'development' ? 'dev' : 'test';
}

function Content({ khulnasoftPage, docsHeader }: any /* TODO: types */) {
  const title = `${
    (khulnasoftPage && (khulnasoftPage.data.pageTitle || khulnasoftPage.data.title)) ||
    defaultTitle
  } | Khulnasoft.com`;
  return (
    <div>
      <Head>
        {!khulnasoftPage && <meta key="robots" name="robots" content="noindex" />}
        <title>{title}</title>
        <meta key="og:title" property="og:title" content={title} />
        <meta key="twitter:title" property="twitter:title" content={title} />
        <meta
          name="description"
          content={
            (khulnasoftPage &&
              (khulnasoftPage.data.pageDescription ||
                khulnasoftPage.data.description)) ||
            defaultDescription
          }
        />
      </Head>

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 16,
          padding: '0 20px',
        }}
      >
        <header
          css={{
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            borderBottom: '1px solid #CBCAB7',
            boxShadow:
              '0px 2px 2px rgba(0, 0, 0, 0.04), 0px 1px 11px rgba(0, 0, 0, 0.1)',
          }}
        >
          <KhulnasoftComponent
            codegen={USE_CODEGEN}
            renderLink={renderLink}
            name="docs-header"
            content={docsHeader}
          />
        </header>

        <div
          css={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'stretch',
            overflow: 'hidden',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
            margin: '0 auto',
            width: '100%',
            height: '100%',
            maxWidth: 1400,
          }}
        >
          <div
            css={{
              display: 'flex',
              flexGrow: 1,
              width: '100%',
              alignSelf: 'stretch',
            }}
          >
            <div
              css={{
                padding: '30px 50px 50px 50px',
                flexGrow: 1,
                width: '100%',
                borderRadius: 0,
                [verticalBreakpoint]: {
                  padding: 20,
                  margin: '10px 0',
                  borderRadius: 4,
                },
              }}
            >
              {khulnasoftPage || Khulnasoft.isEditing || Khulnasoft.isPreviewing ? (
                <KhulnasoftComponent
                  renderLink={renderLink}
                  key={khulnasoftPage?.id}
                  name="content-page"
                  codegen={USE_CODEGEN}
                  content={khulnasoftPage}
                />
              ) : (
                <>
                  <h3 css={{ marginTop: 20 }}>Doc not found!</h3>
                  <p
                    css={{
                      marginTop: 20,
                    }}
                  >
                    Try choosing another doc from the nav bar or{' '}
                    <a
                      css={{
                        color: 'steelblue',
                      }}
                      href="/c/docs/intro"
                    >
                      go to our docs homepage
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const results = await khulnasoft.getAll('content-page', {
    key: 'content-pages:all',
    fields: 'data.url',
    limit: 200,
    options: {
      noTargeting: true,
    },
  });

  const paths = results
    .filter(
      (item) =>
        item.data?.url?.startsWith('/c/') &&
        !item.data?.url?.startsWith('/c/docs'),
    )
    .map((item) => ({
      params: {
        content: (item.data?.url?.replace('/c/', '') || '').split('/'),
      },
    }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Don't target on url and device for better cache efficiency
  const targeting = { urlPath: '_', device: '_' } as any;
  const path = `/c/${(context.params?.content as string[])?.join('/') || ''}`;

  const [page, docsHeader] = await Promise.all([
    khulnasoft
      .get('content-page', {
        userAttributes: { ...targeting, urlPath: path },
        ...(!USE_CODEGEN
          ? {}
          : {
              format: 'react',
            }),
      })
      .promise(),
    khulnasoft
      .get('docs-header', {
        userAttributes: targeting,
        ...(!USE_CODEGEN
          ? {}
          : {
              format: 'react',
            }),
      })
      .promise(),
  ]);

  // If there is a Khulnasoft page for this URL, this will be an object, otherwise it'll be null
  return {
    revalidate: 1,
    props: { khulnasoftPage: page || null, docsHeader },
    notFound: !page,
  };
};

export default Content;
