/**
 * Quickstart snippet
 * snippets/gen1-nextjs/pages/[[...index]].tsx
 */
import { KhulnasoftComponent, khulnasoft, useIsPreviewing } from '@khulnasoft.com/react';
import type { KhulnasoftContent } from '@khulnasoft.com/sdk';
import type { GetStaticProps } from 'next';
import DefaultErrorPage from 'next/error';
import React from 'react';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');
khulnasoft.apiEndpoint = 'content';

export const getStaticProps: GetStaticProps = async () => {
  const urlPath = '/contentwithsymbol';

  const page = await khulnasoft
    .get('page', {
      userAttributes: {
        urlPath,
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

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function Page({ page }: { page: KhulnasoftContent | null }) {
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <h1>CORRECT</h1>
      {/* Render the Khulnasoft page */}
      <KhulnasoftComponent model="page" content={page || undefined} />
    </>
  );
}
