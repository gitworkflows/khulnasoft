import React from 'react';
import { khulnasoft } from '@khulnasoft.com/react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
// This is a thin wrapper that does some content post-processing
// Its API is the same as Khulnasoft.com's `KhulnasoftComponent` component.
import KhulnasoftPageWrapper from '../components/KhulnasoftPageWrapper';

// This instructs Next.js to check for the `?amp=1` query string
export const config = { amp: true };

// Set this in your environment or in an `.env` file
khulnasoft.init(process.env.KHULNASOFT_PUBLIC_KEY);

export default function Page({ khulnasoftPage }) {
  const { title, description, image } = khulnasoftPage?.data || {};
  const boilerplate = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;
  return (
    <div>
      <Head>
        {
          // allows editing in client side while maintaining amp compatibility
          !khulnasoftPage && (
            <>
              <meta name="robots" content="noindex,nofollow" />
              <meta
                name="viewport"
                content="width=device-width,minimum-scale=1,initial-scale=1"
              ></meta>
              <link
                rel="preload"
                href="https://cdn.ampproject.org/v0.js"
                as="script"
              ></link>
              <script async="" src="https://cdn.ampproject.org/v0.js"></script>
              <style amp-boilerplate>{boilerplate}</style>
            </>
          )
        }
      </Head>
      {title && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title,
            description,
            locale: 'en-US',
            ...(image && {
              images: [
                {
                  url: image,
                  width: 800,
                  height: 600,
                  alt: title,
                },
              ],
            }),
          }}
        />
      )}
      <KhulnasoftPageWrapper content={khulnasoftPage} model="amp-page" ampMode />
    </div>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const page = await khulnasoft
    .get('amp-page', {
      req,
      res,
      noTraverse: false,
      userAttributes: {
        urlPath: '/' + (params?.path?.join('/') || ''),
      },
      cachebust: true,
      format: 'amp',
    })
    .promise();

  return { props: { khulnasoftPage: page || null } };
}
