import { USE_CODEGEN } from '@/constants/use-codegen';
import { khulnasoft } from '@khulnasoft.com/react';
import { GetStaticPropsContext } from 'next';

export const getKhulnasoftStaticProps = async (
  modelName: string,
  context: GetStaticPropsContext,
) => {
  const path = `/${(context.params?.page as string[])?.join('/') || ''}`;
  // Don't target on url and device for better cache efficiency
  const targeting = { urlPath: '_', device: '_' } as any;

  const page = await khulnasoft
    .get(modelName, {
      userAttributes: { ...targeting, urlPath: path },
      ...(!USE_CODEGEN
        ? {}
        : {
            format: 'react',
          }),
    })
    .promise();

  // If there is a Khulnasoft page for this URL, this will be an object, otherwise it'll be null
  return {
    props: { khulnasoftPage: page || null },
    revalidate: true,
    notFound: !page,
  };
};
