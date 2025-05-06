import type { AppProps } from 'next/app'

import { khulnasoft } from '@khulnasoft.com/react'
import khulnasoftConfig from '@config/khulnasoft'
khulnasoft.init(khulnasoftConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
