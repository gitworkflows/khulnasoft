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

export default async function SectionExample(props: PageProps) {
  const content = await khulnasoft
    .get('blog-article', {
      prerender: false,
    })
    .toPromise();

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      <div
        style={{
          background: 'purple',
          fontSize: 24,
          textAlign: 'center',
          height: 200,
          padding: 20,
        }}
      >
        Non khulnasoft content
      </div>
      {/* Render the Khulnasoft page */}
      <RenderKhulnasoftContent content={content} />
      <div
        style={{
          background: 'blue',
          fontSize: 14,
          textAlign: 'center',
          height: 200,
          padding: 20,
        }}
      >
        Non khulnasoft content
      </div>
    </>
  );
}
