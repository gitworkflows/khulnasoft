import { khulnasoft } from '@khulnasoft.com/react';
import type { GetContentOptions } from '@khulnasoft.com/sdk';

export const getProduct = (options: GetContentOptions) =>
  khulnasoft.get('contact-record', {
    query: {
      'data.surname': {
        $or: [{ $eq: 'Moore' }, { $in: ['Moor', 'More'] }],
      },
    },
    ...options,
  });
