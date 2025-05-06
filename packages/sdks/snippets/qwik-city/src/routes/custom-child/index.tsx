import { component$ } from '@khulnasoft.com/qwik';
import { routeLoader$ } from '@khulnasoft.com/qwik-city';
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  isPreviewing,
} from '@khulnasoft.com/sdk-qwik';
import { customHeroInfo } from '~/components/CustomHero';

const MODEL = 'custom-child';
const API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';

export const useCustomChild = routeLoader$(async ({ url }) => {
  return await fetchOneEntry({
    model: MODEL,
    apiKey: API_KEY,
    options: getKhulnasoftSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });
});

export default component$(() => {
  const content = useCustomChild();

  if (!content.value && !isPreviewing()) {
    return <div>404</div>;
  }
  return (
    <Content
      model={MODEL}
      content={content.value}
      apiKey={API_KEY}
      customComponents={[customHeroInfo]}
    />
  );
});
