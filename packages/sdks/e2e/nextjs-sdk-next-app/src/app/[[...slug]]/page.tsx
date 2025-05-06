import KhulnasoftBlockWithClassName from '@/components/KhulnasoftBlockWithClassName';
import Hello, { fromClientModuleHelloInfo } from '@/components/Hello';
import CatFacts from '@/components/MyTextBox/CatFacts';
import {
  Content,
  _processContentResult,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-react-nextjs';
import { getProps } from '@sdk/tests';
import MyTextBox from '../../components/MyTextBox/MyTextBox';
import { componentInfo } from '../../components/MyTextBox/component-info';

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

interface MyPageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

// Pages are Server Components by default
export default async function Page(props: MyPageProps) {
  // NOTE: the import must be inside the Page component itself.
  const { initializeNodeRuntime } = await import(
    '@khulnasoft.com/sdk-react-nextjs/node/init'
  );
  initializeNodeRuntime();

  const urlPath = '/' + (props.params?.slug?.join('/') || '');

  const khulnasoftProps = await getProps({
    pathname: urlPath,
    _processContentResult,
    options: getKhulnasoftSearchParams(props.searchParams),
    fetchOneEntry,
  });

  if (!khulnasoftProps) {
    return (
      <>
        <h1>404</h1>
        <p>Make sure you have your content published at khulnasoft.com.</p>
      </>
    );
  }

  return (
    <Content
      {...khulnasoftProps}
      customComponents={[
        {
          component: Hello,
          name: 'Hello',
          inputs: [],
        },
        fromClientModuleHelloInfo,
        {
          ...componentInfo,
          component: MyTextBox,
        },
        {
          name: 'CatFacts',
          component: CatFacts,
          isRSC: true,
          inputs: [
            {
              name: 'text',
              type: 'text',
              defaultValue: 'default text',
            },
          ],
        },
        khulnasoftBlockWithClassNameCustomComponent,
      ]}
    />
  );
}
export const revalidate = 1;

// TO-DO: this breaks the build.
// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   return getAllPathnames('gen2').map((path) => ({
//     slug: path === '/' ? null : path.split('/').filter(Boolean),
//   }));
// }
