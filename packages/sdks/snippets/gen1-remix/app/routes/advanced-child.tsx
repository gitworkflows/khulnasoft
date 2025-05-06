// routes/advanced-child.tsx
import { Khulnasoft, KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import CustomTabs from './components/CustomTabs';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

Khulnasoft.registerComponent(CustomTabs, {
  name: 'TabFields',
  inputs: [
    {
      name: 'tabList',
      type: 'array',
      subFields: [
        {
          name: 'tabName',
          type: 'string',
        },
        {
          name: 'blocks',
          type: 'uiBlocks',
          defaultValue: [],
        },
      ],
    },
  ],
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const page = await khulnasoft
    .get('advanced-child', {
      userAttributes: {
        urlPath: `/${request.url.split('/').pop()}`,
      },
    })
    .toPromise();

  return { page };
};

export default function AdvancedChildPage() {
  const { page } = useLoaderData<typeof loader>();

  return <KhulnasoftComponent model="advanced-child" content={page} />;
}
