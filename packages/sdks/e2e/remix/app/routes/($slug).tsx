import { Content } from '@khulnasoft.com/sdk-react';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProps } from '@sdk/tests';
import KhulnasoftBlockWithClassName from '~/components/KhulnasoftBlockWithClassName';

const khulnasoftBlockWithClassNameCustomComponent = {
  name: 'KhulnasoftBlockWithClassName',
  component: KhulnasoftBlockWithClassName,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
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

export const loader: LoaderFunction = async ({ params }) => {
  const { initializeNodeRuntime } = await import(
    '@khulnasoft.com/sdk-react/node/init'
  );

  await initializeNodeRuntime();
  return await getProps({ pathname: `/${params.slug || ''}` });
};

export default function Page() {
  const khulnasoftProps = useLoaderData<ReturnType<typeof getProps>>();

  khulnasoftProps.customComponents = [khulnasoftBlockWithClassNameCustomComponent];

  return khulnasoftProps?.content ? (
    <Content {...khulnasoftProps} />
  ) : (
    <div>Content Not Found.</div>
  );
}
