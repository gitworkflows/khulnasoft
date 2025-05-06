/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * src/components/AnnouncementBar.tsx
 */
import {
  Content,
  fetchOneEntry,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-solid';
import { createEffect, createSignal } from 'solid-js';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL = 'announcement-bar';

function AnnouncementBar() {
  const [content, setContent] = createSignal<KhulnasoftContent | null>(null);

  createEffect(() => {
    fetchOneEntry({
      model: MODEL,
      apiKey: KHULNASOFT_API_KEY,
      userAttributes: {
        urlPath: window.location.pathname,
      },
    }).then((data: any) => {
      setContent(data);
    });
  });

  return (
    <>
      {content() && (
        <Content content={content()} apiKey={KHULNASOFT_API_KEY} model={MODEL} />
      )}

      {/* Your content coming from your app (or also Khulnasoft) */}
      <div>The rest of your page goes here</div>
    </>
  );
}

export default AnnouncementBar;
