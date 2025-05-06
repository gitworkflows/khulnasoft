import React from 'react';
import { khulnasoft, KhulnasoftComponent, Khulnasoft } from '@khulnasoft.com/react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Error from './_error';
import { renderLink } from '../functions/render-link';
import { defaultDescription, defaultTitle } from '../constants/seo-tags';
import { getKhulnasoftStaticPaths } from '../functions/get-khulnasoft-static-paths';
import { getKhulnasoftStaticProps } from '../functions/get-khulnasoft-static-props';
import { USE_CODEGEN } from '@/constants/use-codegen';

khulnasoft.init('YJIGb4i01jvw0SRdL5Bt');

if (USE_CODEGEN) {
  khulnasoft.env = process.env.NODE_ENV === 'development' ? 'dev' : 'test';
}

function LandingPage({ khulnasoftPage }: any /* TODO: types */) {
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

      {khulnasoftPage || Khulnasoft.isEditing || Khulnasoft.isPreviewing ? (
        <KhulnasoftComponent
          codegen={USE_CODEGEN}
          renderLink={renderLink}
          name="content-page"
          content={khulnasoftPage}
        />
      ) : (
        <>
          <Head>
            <meta name="robots" content="noindex" />
          </Head>

          <Error status={404} />
        </>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getKhulnasoftStaticPaths('content-page');
};

export const getStaticProps: GetStaticProps = async (context) => {
  return getKhulnasoftStaticProps('content-page', context);
};

export default LandingPage;
