// routes/advanced-child.tsx
import { Khulnasoft, KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CustomColumns } from './components/CustomColumns';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

Khulnasoft.registerComponent(CustomColumns, {
  name: 'MyColumns',
  inputs: [
    {
      name: 'column1',
      type: 'uiBlocks',
      defaultValue: [],
    },
    {
      name: 'column2',
      type: 'uiBlocks',
      defaultValue: [],
    },
  ],
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const page = await khulnasoft
    .get('editable-regions', {
      userAttributes: {
        urlPath: `/${request.url.split('/').pop()}`,
      },
    })
    .toPromise();

  return { page };
};

export default function EditableRegionsPage() {
  const { page } = useLoaderData<typeof loader>();

  return <KhulnasoftComponent model="editable-regions" content={page} />;
}
