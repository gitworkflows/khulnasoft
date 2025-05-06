import { fetchOneEntry, GetContentOptions } from '@khulnasoft.com/sdk-react';

export const getProduct = (options: GetContentOptions) =>
  fetchOneEntry({
    query: { 'data.employmentDate': { $type: Date } },
    ...options,
  });
