/**
 * Quickstart snippet
 * snippets/gen1-remix/app/routes/_index.tsx
 */
import { KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const page = await khulnasoft
    .get('page', {
      userAttributes: {
        urlPath: `/${params.slug ? params.slug : ''}`,
      },
    })
    .promise();

  const isPreviewing = new URL(request.url).searchParams.has('khulnasoft.preview');

  if (!page && !isPreviewing) {
    throw new Response('Page Not Found', {
      status: 404,
      statusText:
        "We couldn't find this page, please check your url path and if the page is published on Khulnasoft.com.",
    });
  }

  return { page };
};

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  return <KhulnasoftComponent model="page" content={page} />;
}
