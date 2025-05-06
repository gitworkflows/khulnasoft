/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * src/routes/announcements/[...index]/index.tsx
 */
import { component$ } from '@khulnasoft.com/qwik';
import { routeLoader$ } from '@khulnasoft.com/qwik-city';
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-qwik';

export const KHULNASOFT_PUBLIC_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
export const KHULNASOFT_MODEL = 'announcement-bar';

export const useKhulnasoftContent = routeLoader$(async ({ url }) => {
  const announcementBar = await fetchOneEntry({
    model: KHULNASOFT_MODEL,
    apiKey: KHULNASOFT_PUBLIC_API_KEY,
    options: getKhulnasoftSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  return announcementBar;
});

export default component$(() => {
  const announcement = useKhulnasoftContent();

  return (
    <>
      {announcement.value && (
        <Content
          model={KHULNASOFT_MODEL}
          content={announcement.value}
          apiKey={KHULNASOFT_PUBLIC_API_KEY}
        />
      )}

      {/* Your content coming from your app (or also Khulnasoft) */}
      <div>The rest of your page goes here</div>
    </>
  );
});
