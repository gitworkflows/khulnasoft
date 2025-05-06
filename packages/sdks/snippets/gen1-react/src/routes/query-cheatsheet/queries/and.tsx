import { khulnasoft } from '@khulnasoft.com/react';
import type { GetContentOptions } from '@khulnasoft.com/sdk';

export const getProduct = (options: GetContentOptions) =>
  khulnasoft.get('product', {
    query: {
      'data.price': {
        $and: [{ $lt: 1000 }, { $gt: 500 }],
      },
    },
    ...options,
  });
