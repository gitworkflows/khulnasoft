import { khulnasoft } from '@khulnasoft.com/react';
import type { GetContentOptions } from '@khulnasoft.com/sdk';

export const getProduct = (options: GetContentOptions) =>
  khulnasoft.get('product', {
    query: { 'data.price': { $gte: 700 } },
    ...options,
  });
