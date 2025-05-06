import { Links, Meta, Scripts, useCatch, useLoaderData, useParams } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { KhulnasoftComponent, khulnasoft, Khulnasoft } from '@khulnasoft.com/react';
import { getAPIKey, getProps } from '@sdk/tests';
import { useEffect } from 'react';

import '@khulnasoft.com/widgets';

khulnasoft.init(getAPIKey());

export const loader: LoaderFunction = async ({ params }) =>
  await getProps({ pathname: `/${params.slug || ''}` });

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Error: {caught.status}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h3>
          Error: {caught.status} - {caught.statusText}
        </h3>
        <p>
          Make sure you have this page published on{' '}
          <a target="_blank" href="https://khulnasoft.com/content" rel="noreferrer">
            Khulnasoft.com
          </a>
        </p>
        <Scripts />
      </body>
    </html>
  );
}

export default function Page() {
  const props = useLoaderData<ReturnType<typeof getProps>>();
  const params = useParams();

  if (props?.apiVersion) {
    khulnasoft.apiVersion = props?.apiVersion;
  }

  if (props?.apiEndpoint) {
    khulnasoft.apiEndpoint = props.apiEndpoint;
    delete props.apiEndpoint;
  }

  useEffect(() => {
    if (
      window.location.pathname.includes('get-query') ||
      window.location.pathname.includes('get-content')
    ) {
      khulnasoft
        .get('', {
          ...props,
          ...props['options'],
        })
        .promise()
        .then();
    }
    if (typeof window !== 'undefined') {
      Khulnasoft.registerAction({
        name: 'test-action',
        kind: 'function',
        id: 'test-action-id',
        inputs: [
          {
            name: 'actionName',
            type: 'string',
            required: true,
            helperText: 'Action name',
          },
        ],
        action: () => {
          return `console.log("function call") `;
        },
      });
    }
  }, []);

  // only enable tracking if we're not in the `/can-track-false` and `symbol-tracking` test route
  useEffect(() => {
    if (!params.slug?.includes('can-track-false') && !params.slug?.includes('symbol-tracking')) {
      khulnasoft.canTrack = true;
    }
  }, [params.slug]);

  return props?.content ? <KhulnasoftComponent {...props} /> : <div>Content Not Found.</div>;
}
