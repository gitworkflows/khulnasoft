import { useRouter } from 'next/router'
import { khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react'
import Head from 'next/head'
import { getLayoutProps } from '../helpers/get-layout-props'

import '../helpers/khulnasoft-settings'

export async function getServerSideProps() {
  return {
    props: {
      page: (await khulnasoft.get('page', { url: '/' }).promise()) || null,
      ...(await getLayoutProps()),
    },
  }
}

export default function ThemePreview(props: { page: any }) {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <KhulnasoftComponent model="page" content={props.page} />
    </>
  )
}
