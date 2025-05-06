import { fetchOneEntry, GetContentOptions } from '@khulnasoft.com/sdk-react';

export const getProduct = (options: GetContentOptions) =>
  fetchOneEntry({
    query: { 'data.department': { $not: 'Marketing' } },
    ...options,
  });
