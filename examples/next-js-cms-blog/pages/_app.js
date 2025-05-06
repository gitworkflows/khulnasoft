import '@/styles/index.css';
import { khulnasoft } from '@khulnasoft.com/react';
khulnasoft.init(process.env.NEXT_PUBLIC_KHULNASOFT_API_KEY);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
