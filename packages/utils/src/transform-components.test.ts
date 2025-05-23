import { KhulnasoftContent } from '@khulnasoft.com/sdk';
import { transformComponents } from './transform-components';

test('Transforms components name and options', async () => {
  const content: KhulnasoftContent = {
    data: {
      blocks: [
        {
          '@type': '@khulnasoft.com/sdk:Element',
          component: {
            name: 'Products',
            options: {
              category: 'women',
            },
          },
        },
      ],
    },
  };
  const result = transformComponents(content, {
    Products: {
      name: 'ProductsV2',
      props: {
        collection: 'category',
      },
    },
  });
  expect(result.data!.blocks![0].component!.options.collection).toBe('women');
  expect(result.data!.blocks![0].component!.name).toBe('ProductsV2');
});
