import { khulnasoft } from '@khulnasoft.com/react';
import type { GetContentOptions } from '@khulnasoft.com/sdk';

export const getProduct = (options: GetContentOptions) =>
  khulnasoft.get('contact-record', {
    query: { 'data.preferredName': { $exists: true } },
    ...options,
  });
