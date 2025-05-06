import { fetchOneEntry, GetContentOptions } from '@khulnasoft.com/sdk-react';

export const getProduct = (options: GetContentOptions) =>
  fetchOneEntry({
    query: {
      'data.surname': {
        $or: [{ $eq: 'Moore' }, { $in: ['Moor', 'More'] }],
      },
    },
    ...options,
  });
