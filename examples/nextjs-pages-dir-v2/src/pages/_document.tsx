import { Head, Html, Main, NextScript } from 'next/document';

import { initializeNodeRuntime } from '@khulnasoft.com/sdk-react/node/init';
initializeNodeRuntime();

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
