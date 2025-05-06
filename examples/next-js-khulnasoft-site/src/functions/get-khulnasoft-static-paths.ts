import { khulnasoft } from '@khulnasoft.com/react';

export const getKhulnasoftStaticPaths = async (modelName: string) => {
  const results = await khulnasoft.getAll(modelName, {
    key: 'pages:all',
    fields: 'data.url',
    limit: 200,
    options: {
      noTargeting: true,
    },
  });

  const paths = results
    .filter((item) => !item.data?.url?.startsWith('/c/'))
    .filter((item) => item.data?.url !== '/')
    .map((item) => ({
      params: { page: (item.data?.url?.replace('/', '') || '_').split('/') },
    }));

  return {
    paths,
    fallback: true,
  };
};
