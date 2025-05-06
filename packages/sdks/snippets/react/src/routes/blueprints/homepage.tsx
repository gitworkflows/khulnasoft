import {
  KhulnasoftContent,
  Content,
  fetchOneEntry,
  isPreviewing,
} from '@khulnasoft.com/sdk-react';
import { useEffect, useState } from 'react';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL_NAME = 'homepage';

export default function Homepage() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);

  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: KHULNASOFT_API_KEY,
    }).then((content) => setContent(content));
  }, []);

  if (!content && !isPreviewing()) {
    return <div>404</div>;
  }

  return (
    <Content apiKey={KHULNASOFT_API_KEY} model={MODEL_NAME} content={content} />
  );
}
