import { fetchOneEntry, GetContentOptions } from '@khulnasoft.com/sdk-react';

export const getProduct = (options: GetContentOptions) =>
  fetchOneEntry({
    query: {
      'data.price': {
        $nor: [{ $lt: 500 }, { $gt: 1000 }],
      },
    },
    ...options,
  });
