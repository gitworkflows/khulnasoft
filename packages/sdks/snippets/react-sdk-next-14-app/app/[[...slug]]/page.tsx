/**
 * Quickstart snippet
 * snippets/nextjs-app-dir-client/app/[[...slug]].tsx
 * Uses @khulnasoft.com/sdk-react
 */
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  isPreviewing,
} from '@khulnasoft.com/sdk-react';

interface PageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

const PUBLIC_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';

export default async function Page(props: PageProps) {
  const urlPath = '/' + (props.params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    options: getKhulnasoftSearchParams(props.searchParams),
    apiKey: PUBLIC_API_KEY,
    model: 'page',
    userAttributes: { urlPath },
  });

  const canShowContent = content || isPreviewing(props.searchParams);

  if (!canShowContent) {
    return (
      <>
        <h1>404</h1>
        <p>Make sure you have your content published at Khulnasoft.com.</p>
      </>
    );
  }
  return <Content content={content} apiKey={PUBLIC_API_KEY} model="page" />;
}
