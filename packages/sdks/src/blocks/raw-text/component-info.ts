import type { ComponentInfo } from '../../types/components.js';

export const componentInfo: ComponentInfo = {
  name: 'Khulnasoft:RawText',
  hideFromInsertMenu: true,

  inputs: [
    {
      name: 'text',
      bubble: true,
      type: 'longText',
      required: true,
    },
  ],
};
