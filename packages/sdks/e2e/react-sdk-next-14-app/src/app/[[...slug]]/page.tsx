import KhulnasoftBlockWithClassName from '@/components/KhulnasoftBlockWithClassName';
import {
  Content,
  _processContentResult,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-react';
import { getProps } from '@sdk/tests';

const khulnasoftBlockWithClassNameCustomComponent = {
  name: 'KhulnasoftBlockWithClassName',
  component: KhulnasoftBlockWithClassName,
  isRSC: true,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
    khulnasoftContext: true,
    khulnasoftComponents: true,
  },
  inputs: [
    {
      name: 'content',
      type: 'uiBlocks',
      defaultValue: [
        {
          '@type': '@khulnasoft.com/sdk:Element',
          '@version': 2,
          id: 'khulnasoft-c6e179528dee4e62b337cf3f85d6496f',
          component: {
            name: 'Text',
            options: {
              text: 'Enter some text...',
            },
          },
          responsiveStyles: {
            large: {
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flexShrink: '0',
              boxSizing: 'border-box',
              marginTop: '20px',
              lineHeight: 'normal',
              height: 'auto',
            },
          },
        },
      ],
    },
  ],
};

interface PageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

// Pages are Server Components by default
export default async function Page(props: PageProps) {
  const urlPath = '/' + (props.params?.slug?.join('/') || '');

  const khulnasoftProps = await getProps({
    pathname: urlPath,
    _processContentResult,
    options: getKhulnasoftSearchParams(props.searchParams),
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

  khulnasoftProps.customComponents = [khulnasoftBlockWithClassNameCustomComponent];

  return <Content {...khulnasoftProps} />;
}

export const revalidate = 4;
