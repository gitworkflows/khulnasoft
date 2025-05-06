/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * snippets/gen1-remix/app/routes/announcements.$slug.tsx
 */
import { KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const announcementBar = await khulnasoft
    .get('announcement-bar', {
      userAttributes: {
        urlPath: `/announcements/${params.slug ? params.slug : ''}`,
      },
    })
    .toPromise();

  const isPreviewing = new URL(request.url).searchParams.has('khulnasoft.preview');

  if (!announcementBar && !isPreviewing) {
    return {
      announcementBar: null,
    };
  }

  return {
    announcementBar,
  };
};

export default function Page() {
  const { announcementBar } = useLoaderData<typeof loader>();

  return (
    <>
      {announcementBar && (
        <KhulnasoftComponent model="announcement-bar" content={announcementBar} />
      )}
      {/* content coming from your app (or also Khulnasoft) */}
      <div>The rest of your page goes here</div>
    </>
  );
}
