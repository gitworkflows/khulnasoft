import { khulnasoft } from '@khulnasoft.com/react';
import type { GetContentOptions } from '@khulnasoft.com/sdk';

export const getProduct = (options: GetContentOptions) =>
  khulnasoft.get('contact-record', {
    query: { 'data.surname': { $regex: 'ha.*', $options: 'i' } },
    ...options,
  });
