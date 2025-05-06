'use client';

import { Content, setClientUserAttributes } from '@khulnasoft.com/sdk-react';

// sets cookie eagerly before React loads to replace the winning variant
// in the DOM and to avoid layout shifts
setClientUserAttributes({
  device: 'tablet',
});

export default function ClientContent(props: any) {
  return <Content {...props} />;
}
