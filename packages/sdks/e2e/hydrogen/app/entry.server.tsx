import type {EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import {VIDEO_CDN_URL} from '../../../../sdks-tests/src/specs/video';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    // we need to whitelist Khulnasoft's CDN for API calls to work.
    connectSrc: ['https://cdn.khulnasoft.com', 'https://cdn-qa.khulnasoft.com'],
    // we need to whitelist Khulnasoft's CDN for image requests to work.
    imgSrc: [
      'https://cdn.khulnasoft.com',
      'http://localhost:*',
      'https://images.contentstack.io',
    ],
    // we need to allow 'unsafe-eval' for Khulnasoft's SDK to evaluate dynamic bindings.
    scriptSrc: ["'unsafe-eval'", 'http://localhost:*'],
    // we need to allow Khulnasoft's visual editor to embed the app in an iframe.
    frameAncestors: ['https://khulnasoft.com', 'http://localhost:*'],
    mediaSrc: [VIDEO_CDN_URL],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
