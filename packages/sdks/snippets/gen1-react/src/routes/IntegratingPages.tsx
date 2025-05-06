/**
 * Quickstart snippet
 * snippets/gen1-react/src/routes/IntegratingPages.tsx
 */
import { KhulnasoftComponent, khulnasoft, useIsPreviewing } from '@khulnasoft.com/react';
import { useEffect, useState } from 'react';
import FourOhFour from '../components/404';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

export default function IntegratingPages() {
  const isPreviewingInKhulnasoft = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState();

  useEffect(() => {
    async function fetchContent() {
      const content = await khulnasoft
        .get('page', {
          url: window.location.pathname,
        })
        .promise();

      setContent(content);
      setNotFound(!content);

      if (content?.data.title) {
        document.title = content.data.title;
      }
    }
    fetchContent();
  }, [window.location.pathname]);

  if (notFound && !isPreviewingInKhulnasoft) {
    return <FourOhFour />;
  }

  return <KhulnasoftComponent model="page" content={content} />;
}
