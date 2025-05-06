import { ResolveFn, RouterStateSnapshot } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { KhulnasoftContent, fetchOneEntry } from '@khulnasoft.com/sdk-angular';

export const advancedChildResolver: ResolveFn<KhulnasoftContent | null> = async (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return await fetchOneEntry({
    model: 'page',
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
    userAttributes: {
      urlPath: state.url,
    },
  });
};
