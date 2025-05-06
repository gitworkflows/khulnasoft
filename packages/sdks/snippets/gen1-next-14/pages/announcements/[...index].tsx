/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * snippets/gen1-nextjs/pages/announcements/[...index].tsx
 */
import { KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import type { KhulnasoftContent } from '@khulnasoft.com/sdk';
import type { GetStaticProps } from 'next';
import React from 'react';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urlPath =
    '/announcements/' +
    (Array.isArray(params?.index)
      ? params.index.join('/')
      : params?.index || '');

  const announcementBar = await khulnasoft
    .get('announcement-bar', {
      userAttributes: {
        urlPath,
      },
    })
    .promise();

  return {
    props: {
      announcementBar: announcementBar || null,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function Page({
  announcementBar,
}: {
  announcementBar: KhulnasoftContent | null;
}) {
  return (
    <>
      {announcementBar && (
        <KhulnasoftComponent model="announcement-bar" content={announcementBar} />
      )}
      {/* content coming from your app (or also Khulnasoft) */}
      <div>The rest of your page goes here</div>
    </>
  );
}
