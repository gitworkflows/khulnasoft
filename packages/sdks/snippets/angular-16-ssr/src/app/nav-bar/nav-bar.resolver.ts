import { ResolveFn } from '@angular/router';
import { fetchOneEntry, type KhulnasoftContent } from '@khulnasoft.com/sdk-angular';

export const navBarResolver: ResolveFn<KhulnasoftContent> = async () => {
  const links = await fetchOneEntry({
    model: 'navigation-links',
    apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
  });

  return links || { data: { links: [] } };
};
