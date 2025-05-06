/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * app/announcements/[...slug]/page.tsx
 */
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  isEditing,
  isPreviewing,
} from '@khulnasoft.com/sdk-react-nextjs';

interface PageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

const apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
const model = 'announcement-bar';

export default async function Page(props: PageProps) {
  const urlPath = '/announcements/' + (props.params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    apiKey,
    model,
    options: getKhulnasoftSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  const canShowContent =
    content ||
    isPreviewing(props.searchParams) ||
    isEditing(props.searchParams);

  return (
    <>
      {/* Your header coming from Khulnasoft */}
      {canShowContent ? (
        <Content content={content} apiKey={apiKey} model={model} />
      ) : (
        <div>Announcement Bar not Found</div>
      )}
      {/* Your content coming from your app (or also Khulnasoft) */}
      <div>The rest of your page goes here</div>
    </>
  );
}
