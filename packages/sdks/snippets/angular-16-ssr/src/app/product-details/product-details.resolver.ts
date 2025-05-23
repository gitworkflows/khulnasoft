import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { KhulnasoftContent, fetchOneEntry } from '@khulnasoft.com/sdk-angular';

export const productDetailsResolver: ResolveFn<KhulnasoftContent | null> = async (
  route: ActivatedRouteSnapshot
) => {
  const handle = route.paramMap.get('handle') || 'jacket';

  const productDetails = await fetchOneEntry({
    model: 'product-details',
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
    query: {
      'data.handle': handle,
    },
  });

  return productDetails;
};
