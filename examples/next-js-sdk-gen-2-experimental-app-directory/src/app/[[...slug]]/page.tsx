import { Content, fetchOneEntry, getKhulnasoftSearchParams } from '@khulnasoft.com/sdk-react-nextjs';

interface MyPageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

const apiKey = 'f1a790f8c3204b3b8c5c1795aeac4660';

export default async function Page(props: MyPageProps) {
  // NOTE: the import must be inside the Page component itself.
  const { initializeNodeRuntime } = await import('@khulnasoft.com/sdk-react-nextjs/node/init');
  initializeNodeRuntime();

  const urlPath = '/' + (props.params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    model: 'page',
    apiKey,
    options: getKhulnasoftSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  return <Content content={content} model="page" apiKey={apiKey} />;
}
export const revalidate = 1;
