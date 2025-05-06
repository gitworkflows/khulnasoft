import { KhulnasoftContent } from '@khulnasoft.com/sdk';
import { getAsyncProps } from './get-async-props';

test('Adds async props', async () => {
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
  await getAsyncProps(content, {
    async Products(props) {
      return {
        data: props.category,
      };
    },
  });
  expect(content.data!.blocks![0].component!.options.data).toBe('women');
});
