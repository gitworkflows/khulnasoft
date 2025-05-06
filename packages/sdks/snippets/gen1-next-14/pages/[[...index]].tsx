/**
 * Quickstart snippet
 * snippets/gen1-nextjs/pages/[[...index]].tsx
 */
import { KhulnasoftComponent, khulnasoft, useIsPreviewing } from '@khulnasoft.com/react';
import type { KhulnasoftContent } from '@khulnasoft.com/sdk';
import type { GetStaticProps } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import React from 'react';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = await khulnasoft
    .get('page', {
      userAttributes: {
        urlPath: '/' + ((params?.index as string[])?.join('/') || ''),
      },
    })
    .promise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
};

export async function getStaticPaths() {
  const pages = await khulnasoft.getAll('page', {
    fields: 'data.url',
    options: { noTargeting: true },
  });

  return {
    paths: pages
      .map((page) => `${page.data?.url}`)
      .filter((url) => url !== '/' && !url.includes('favicon')),
    fallback: 'blocking',
  };
}

export default function Page({ page }: { page: KhulnasoftContent | null }) {
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      {/* Render the Khulnasoft page */}
      <KhulnasoftComponent model="page" content={page || undefined} />
    </>
  );
}
