import { Khulnasoft } from '@khulnasoft.com/react';
import { CustomColumns } from './CustomColumns';

Khulnasoft.registerComponent(CustomColumns, {
  name: 'Custom Columns',
  description: 'Example of a custom column with editing regions',
  inputs: [
    {
      name: 'columns',
      type: 'array',
      defaultValue: [
        {
          image:
            'https://cdn.khulnasoft.com/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          blocks: [
            {
              '@type': '@khulnasoft.com/sdk:Element',
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
                  textAlign: 'center',
                },
              },
            },
          ],
        },
        {
          image:
            'https://cdn.khulnasoft.com/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          blocks: [
            {
              '@type': '@khulnasoft.com/sdk:Element',
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
                  textAlign: 'center',
                },
              },
            },
          ],
        },
      ],
      subFields: [
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
          required: true,
          defaultValue:
            'https://cdn.khulnasoft.com/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
        },
        {
          name: 'blocks',
          type: 'blocks',
          hideFromUI: true,
          helperText: 'This is an editable region where you can drag and drop blocks.',
          defaultValue: [
            {
              '@type': '@khulnasoft.com/sdk:Element',
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
                  textAlign: 'center',
                },
              },
            },
          ],
        },
      ],
    },
  ],
});
