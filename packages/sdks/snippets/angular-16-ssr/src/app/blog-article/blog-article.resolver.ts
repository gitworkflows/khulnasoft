import type { ResolveFn } from '@angular/router';
import { KhulnasoftContent, fetchOneEntry } from '@khulnasoft.com/sdk-angular';

export const blogArticleResolver: ResolveFn<
  KhulnasoftContent | null
> = async () => {
  return fetchOneEntry({
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
    model: 'blog-article',
    query: {
      'data.handle': 'new-product-line',
    },
  });
};
