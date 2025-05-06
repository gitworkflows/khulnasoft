import { KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import type { KhulnasoftContent } from '@khulnasoft.com/sdk';
import { Khulnasoft } from '@khulnasoft.com/sdk';
import { Links, Meta, Scripts, useCatch, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import khulnasoftConfig from '../../khulnasoftConfig.json';

khulnasoft.init(khulnasoftConfig.apiKey);

export const loader: LoaderFunction = async ({ params }) => {
  const page = await khulnasoft
    .get('page', {
      userAttributes: {
        urlPath: `/${params['*']}`,
      },
    })
    .toPromise();

  const isPreviewing = Khulnasoft.isEditing || Khulnasoft.isPreviewing;

  if (!page && !isPreviewing) {
    throw new Response('Page Not Found', {
      status: 404,
      statusText:
        "We couldn't find this page, please check your url path and if the page is published on Khulnasoft.com.",
    });
  }

  return page;
};

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
  const page: KhulnasoftContent = useLoaderData<KhulnasoftContent>();

  return (
    <div>
      <h3>Welcome to the Khulnasoft.com + Remix starter</h3>
      <KhulnasoftComponent model="page" content={page} />
    </div>
  );
}
