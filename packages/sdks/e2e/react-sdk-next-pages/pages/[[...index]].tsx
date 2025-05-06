import { HydrationOverlay } from '@khulnasoft.com/react-hydration-overlay';
import { Content } from '@khulnasoft.com/sdk-react';
import { getAllPathnames, getProps } from '@sdk/tests';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import React from 'react';
import { khulnasoftBlockWithClassNameCustomComponent } from '../components/KhulnasoftBlockWithClassName';
import Hello from '../components/Hello';

export async function getStaticProps(x: GetStaticPropsContext<StaticProps>) {
  const pathname = x.params?.index ? `/${x.params.index.join('/')}` : '/';
  const props = await getProps({ pathname });

  if (pathname === '/override-base-url') {
    console.log('static props', {
      textComponent: props?.content?.data?.blocks?.[0]?.component,
      pathname,
      props: JSON.stringify(props, null, 2),
    });
  }

  return {
    props,
  };
}

type StaticProps = { index: string[] };

export function getStaticPaths(): GetStaticPathsResult<StaticProps> {
  return {
    paths: getAllPathnames('react-sdk-next-pages').map((path) => {
      const output: StaticProps = {
        index: path === '/' ? [] : path.split('/').filter(Boolean),
      };

      return { params: output };
    }),
    fallback: true,
  };
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Page(props: PageProps & { apiVersion: any }) {
  return (
    <HydrationOverlay>
      {props ? (
        <Content
          {...props}
          customComponents={[
            {
              name: 'Hello',
              component: Hello,
              inputs: [],
            },
            khulnasoftBlockWithClassNameCustomComponent,
          ]}
        />
      ) : (
        <div>Content Not Found</div>
      )}
    </HydrationOverlay>
  );
}
