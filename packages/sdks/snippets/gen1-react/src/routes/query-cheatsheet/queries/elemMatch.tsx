import { khulnasoft } from '@khulnasoft.com/react';
import type { GetContentOptions } from '@khulnasoft.com/sdk';

export const getProduct = (options: GetContentOptions) =>
  khulnasoft.get('contact-record', {
    query: { 'data.regions': { $elemMatch: { location: 'US West' } } },
    ...options,
  });
