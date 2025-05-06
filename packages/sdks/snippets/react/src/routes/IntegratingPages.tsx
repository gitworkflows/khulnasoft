/**
 * Quickstart snippet
 * snippets/react/src/routes/IntegratingPages.tsx
 */
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  isPreviewing,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-react';
import { useEffect, useState } from 'react';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL_NAME = 'page';

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function App() {
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState<KhulnasoftContent | null>(null);

  // get the page content from Khulnasoft
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
        setNotFound(!content);
      })
      .catch((err) => {
        console.log('Oops: ', err);
      });
  }, []);

  // If no page is found, return
  // a 404 page from your code.
  if (notFound && !isPreviewing()) {
    return <div>404</div>;
  }

  // return the page when found
  return (
    <Content content={content} model={MODEL_NAME} apiKey={KHULNASOFT_API_KEY} />
  );
}
