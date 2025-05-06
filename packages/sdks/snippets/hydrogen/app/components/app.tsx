/**
 * Quickstart snippet
 * snippets/hydrogen/app/components/app.tsx
 */

import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-react';
import type {LoaderFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {useNonce} from '@shopify/hydrogen';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const model = 'page';

export const khulnasoftLoader: LoaderFunction = async ({params, request}) => {
  try {
    const pathname = `/${params['*'] || ''}`;
    const url = new URL(request.url);

    const content = await fetchOneEntry({
      model,
      apiKey: KHULNASOFT_API_KEY,
      userAttributes: {
        urlPath: pathname,
      },
      options: getKhulnasoftSearchParams(url.searchParams),
    });
    return {content, model};
  } catch (e) {
    console.error(e);
    return {content: null};
  }
};

export default function KhulnasoftPage() {
  const {content, model} = useLoaderData<{content: any; model: string}>();
  const nonce = useNonce();

  return (
    <div>
      {content && (
        <Content
          model={model}
          apiKey={KHULNASOFT_API_KEY}
          content={content}
          nonce={nonce}
        />
      )}
      <div>The rest of your page goes here</div>
    </div>
  );
}
