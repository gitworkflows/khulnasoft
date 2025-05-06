import { khulnasoftBlockWithClassNameComponentConfig } from '@/components/KhulnasoftBlockWithClassName';
import ClientContent from '@/components/ClientContent';
import {
  Content,
  _processContentResult,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-react';
import { getProps } from '@sdk/tests';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<Record<string, string>>;
}

// Pages are Server Components by default
export default async function Page(props: PageProps) {
  const urlPath = '/' + ((await props.params)?.slug?.join('/') || '');

  const khulnasoftProps = await getProps({
    pathname: urlPath,
    _processContentResult,
    options: getKhulnasoftSearchParams(await props.searchParams),
    fetchOneEntry,
  });

  if (!khulnasoftProps.content) {
    return (
      <>
        <h1>404</h1>
        <p>Make sure you have your content published at khulnasoft.com.</p>
      </>
    );
  }

  khulnasoftProps.customComponents = [khulnasoftBlockWithClassNameComponentConfig];

  if (urlPath === '/variant-containers') {
    return <ClientContent {...khulnasoftProps} />;
  }

  return <Content {...khulnasoftProps} />;
}

export const revalidate = 4;
