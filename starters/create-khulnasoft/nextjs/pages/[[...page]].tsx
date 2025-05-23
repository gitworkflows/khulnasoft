import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { KhulnasoftComponent, Khulnasoft, khulnasoft } from '@khulnasoft.com/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

export async function getStaticProps({ params }: GetStaticPropsContext<{ page: string[] }>) {
  const page = await khulnasoft
    .get('page', {
      userAttributes: {
        urlPath: '/' + (params?.page?.join('/') || ''),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const pages = await khulnasoft.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  });

  return {
    paths: pages.map(page => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const isLive = !Khulnasoft.isEditing && !Khulnasoft.isPreviewing;
  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <KhulnasoftComponent model="page" content={page} />
    </>
  );
}
