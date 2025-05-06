import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import {
  KhulnasoftContent,
  fetchOneEntry,
  getKhulnasoftSearchParams,
} from '@khulnasoft.com/sdk-angular';

export const announcementBarResolver: ResolveFn<KhulnasoftContent | null> = (
  route: ActivatedRouteSnapshot
) => {
  const urlPath = `/${route.url.join('/')}`;
  const searchParams = getKhulnasoftSearchParams(route.queryParams);

  return fetchOneEntry({
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
    model: 'announcement-bar',
    userAttributes: {
      urlPath,
    },
    options: searchParams,
  });
};
