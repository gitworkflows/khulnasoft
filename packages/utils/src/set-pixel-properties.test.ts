import { KhulnasoftContent } from '@khulnasoft.com/sdk';
import { setPixelProperties } from './set-pixel-properties';

test('Set Alt on pixel properties', async () => {
  const content: KhulnasoftContent = {
    data: {
      blocks: [
        {
          id: 'khulnasoft-pixel-test',
          '@type': '@khulnasoft.com/sdk:Element',
          tagName: 'img',
          properties: {
            role: 'presentation',
            'aria-hidden': 'true',
            src: `https://cdn.khulnasoft.com/api/v1/pixel?apiKey=`,
          },
          responsiveStyles: {
            large: {
              height: '0',
              width: '0',
              display: 'inline-block',
              opacity: '0',
              overflow: 'hidden',
              pointerEvents: 'none',
            },
          },
        },
      ],
    },
  };
  setPixelProperties(content, { alt: 'Alt text' });
  expect(content.data?.blocks?.[0].properties?.alt).toBe('Alt text');
});

test('should not alter src on pixel properties', async () => {
  const content: KhulnasoftContent = {
    data: {
      blocks: [
        {
          id: 'khulnasoft-pixel-test',
          '@type': '@khulnasoft.com/sdk:Element',
          tagName: 'img',
          properties: {
            role: 'presentation',
            'aria-hidden': 'true',
            src: `https://cdn.khulnasoft.com/api/v1/pixel?apiKey=`,
          },
          responsiveStyles: {
            large: {
              height: '0',
              width: '0',
              display: 'inline-block',
              opacity: '0',
              overflow: 'hidden',
              pointerEvents: 'none',
            },
          },
        },
      ],
    },
  };
  setPixelProperties(content, { src: 'my source ... ' });
  expect(content.data?.blocks?.[0].properties?.src).toBe(
    `https://cdn.khulnasoft.com/api/v1/pixel?apiKey=`
  );
});
