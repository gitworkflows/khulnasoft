import { KhulnasoftContent, Content, fetchOneEntry } from '@khulnasoft.com/sdk-react';
import { useEffect, useState } from 'react';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL_NAME = 'collection-hero';

export default function ProductHero() {
  const [productHero, setProductHero] = useState<KhulnasoftContent | null>(null);

  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: KHULNASOFT_API_KEY,
      userAttributes: { urlPath: window.location.pathname },
    }).then((data) => {
      setProductHero(data);
    });
  }, []);

  return (
    <>
      {productHero && (
        <Content
          content={productHero}
          model={MODEL_NAME}
          apiKey={KHULNASOFT_API_KEY}
        />
      )}
    </>
  );
}
