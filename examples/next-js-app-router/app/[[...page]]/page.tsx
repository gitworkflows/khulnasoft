import React from 'react';
import { khulnasoft } from '@khulnasoft.com/sdk';
import Head from 'next/head';
import { RenderKhulnasoftContent } from '@/components/khulnasoft';

// Replace with your Public API Key
khulnasoft.init('YJIGb4i01jvw0SRdL5Bt');

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const content = await khulnasoft
    .get('page', {
      userAttributes: {
        urlPath: '/' + (props?.params?.page?.join('/') || ''),
      },
      prerender: false,
    })
    .toPromise();

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      {/* Render the Khulnasoft page */}
      <RenderKhulnasoftContent content={content} />
    </>
  );
}
