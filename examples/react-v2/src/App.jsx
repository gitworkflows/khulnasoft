import { Content, fetchOneEntry, isPreviewing } from '@khulnasoft.com/sdk-react';
import { useEffect, useState } from 'react';

// TODO: enter your public API key
const KHULNASOFT_PUBLIC_API_KEY = 'f1a790f8c3204b3b8c5c1795aeac4660'; // ggignore

function App() {
  const [content, setContent] = useState(undefined);

  useEffect(() => {
    fetchOneEntry({
      model: 'page',
      apiKey: KHULNASOFT_PUBLIC_API_KEY,
      userAttributes: {
        urlPath: window.location.pathname || '/',
      },
    })
      .then(content => {
        if (content) {
          setContent(content);
        }
      })
      .catch(err => {
        console.log('something went wrong while fetching Khulnasoft Content: ', err);
      });
  }, []);

  const shouldRenderKhulnasoftContent = content || isPreviewing();

  return shouldRenderKhulnasoftContent ? (
    <Content content={content} model="page" apiKey={KHULNASOFT_PUBLIC_API_KEY} />
  ) : (
    <div>Content Not Found</div>
  );
}

export default App;
