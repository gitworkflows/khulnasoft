import {Content} from '@khulnasoft.com/sdk-react';
import type {LoaderFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {getProps} from '@sdk/tests';
import {useNonce} from '@shopify/hydrogen';
import KhulnasoftBlockWithClassName from './KhulnasoftBlockWithClassName';

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

export const khulnasoftLoader: LoaderFunction = async ({params}) => {
  try {
    const pathname = `/${params['*'] || ''}`;
    return await getProps({pathname});
  } catch (e) {
    console.error(e);
    return {content: null};
  }
};

export default function KhulnasoftPage() {
  const khulnasoftProps = useLoaderData<ReturnType<typeof getProps>>();
  khulnasoftProps.customComponents = [khulnasoftBlockWithClassNameCustomComponent];
  const nonce = useNonce();

  return khulnasoftProps?.content ? (
    <Content nonce={nonce} {...khulnasoftProps} />
  ) : (
    <div>Content Not Found.</div>
  );
}
