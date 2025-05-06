/**
 * Quickstart snippet
 * snippets/solidjs/src/App.tsx
 */
import {
  Content,
  fetchOneEntry,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-solid';
import { createEffect, createSignal } from 'solid-js';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';

function App() {
  const [content, setContent] = createSignal<KhulnasoftContent | null>(null);

  createEffect(() => {
    fetchOneEntry({
      model: 'page',
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
      {content() ? (
        <Content content={content()} apiKey={KHULNASOFT_API_KEY} model="page" />
      ) : (
        <div>Not found</div>
      )}
    </>
  );
}

export default App;
