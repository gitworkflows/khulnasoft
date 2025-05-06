import '@assets/main.css'
import type { AppProps } from 'next/app'
import { khulnasoft } from '@khulnasoft.com/react'
import khulnasoftConfig from '@config/khulnasoft'
import Layout from '@components/common/Layout'

khulnasoft.init(khulnasoftConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
