import { khulnasoft } from '@khulnasoft.com/sdk';
import { RenderKhulnasoftContent } from '../../components/khulnasoft';
import { getAPIKey, getProps } from '@sdk/tests';

if (typeof window !== 'undefined') {
  const pathname = window.location.pathname;
  if (pathname.includes('can-track-false-pre-init')) {
    khulnasoft.canTrack = false;
  }
}

khulnasoft.init(getAPIKey());

type Next15Params = Promise<{ index: string[] }>;

export default async function Page(props: { params: Next15Params }) {
  const params = await props.params;
  const khulnasoftProps = await getProps({ pathname: '/' + (params?.index?.join('/') || '') });

  return <RenderKhulnasoftContent {...khulnasoftProps} />;
}
