/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * src/routes/AnnouncementBar.tsx
 */
import { KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import { useEffect, useState } from 'react';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

const MODEL_NAME = 'announcement-bar';

export default function AnnouncementBar() {
  const [announcementBar, setAnnouncementBar] = useState();

  useEffect(() => {
    khulnasoft
      .get(MODEL_NAME, {
        url: window.location.pathname,
      })
      .promise()
      .then((announcementBar) => {
        setAnnouncementBar(announcementBar);
      });
  }, []);

  return (
    <>
      {/* Render the Khulnasoft announcement bar */}
      {announcementBar && (
        <KhulnasoftComponent model={MODEL_NAME} content={announcementBar} />
      )}
      {/* content coming from your app (or also Khulnasoft) */}
      <div>The rest of your page goes here</div>
    </>
  );
}
