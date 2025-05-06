/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * src/components/AnnouncementBar.tsx
 */
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-react';
import { useEffect, useState } from 'react';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL_NAME = 'announcement-bar';

export default function AnnouncementBar() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);

  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: KHULNASOFT_API_KEY,
      userAttributes: {
        urlPath: window.location.pathname,
      },
      options: getKhulnasoftSearchParams(new URL(location.href).searchParams),
    })
      .then((content) => {
        if (content) {
          setContent(content);
        }
      })
      .catch((err) => {
        console.log('Oops: ', err);
      });
  }, []);

  return (
    <>
      {content && (
        <Content
          content={content}
          model={MODEL_NAME}
          apiKey={KHULNASOFT_API_KEY}
        />
      )}

      {/* content coming from your app (or also Khulnasoft) */}
      <div>The rest of your page goes here</div>
    </>
  );
}
