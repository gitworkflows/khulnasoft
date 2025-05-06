import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { KhulnasoftComponent, khulnasoft, useIsPreviewing } from '@khulnasoft.com/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import khulnasoftConfig from '@config/khulnasoft'
// loading widgets dynamically to reduce bundle size, will only be included in bundle when is used in the content
import '@khulnasoft.com/widgets/dist/lib/khulnasoft-widgets-async'
import '../components/Heading'

khulnasoft.init(khulnasoftConfig.apiKey)

export async function getStaticProps({
  params,
  locale, // Get active locale from context
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await khulnasoft
      .get('page', {
        userAttributes: {
          urlPath: '/' + (params?.page?.join('/') || ''),
        },
        options: {
          locale, // Automatically resolve the locale on localized inputs at build time
        },
      })
      .toPromise()) || null

  return {
    props: {
      page,
      locale,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await khulnasoft.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function Page({
  page,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const isPreviewingInKhulnasoft = useIsPreviewing()
  const show404 = !page && !isPreviewingInKhulnasoft

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!page && <meta name="robots" content="noindex" />}
      </Head>
      {show404 ? (
        <DefaultErrorPage statusCode={404} />
      ) : (
        // Pass active locale to preview resolved locale content client-side in Visual Editor
        <KhulnasoftComponent model="page" content={page} locale={locale} />
      )}
    </>
  )
}
