'use client';
import { khulnasoft, Khulnasoft } from '@khulnasoft.com/sdk';
import { KhulnasoftComponent } from '@khulnasoft.com/react';
import DefaultErrorPage from 'next/error';
import { getAPIKey } from '@sdk/tests';
import { useEffect } from 'react';

import '@khulnasoft.com/widgets/dist/lib/khulnasoft-widgets-async';
import { usePathname } from 'next/navigation';

khulnasoft.init(getAPIKey());

if (typeof window !== 'undefined') {
  if (
    window.location.pathname.includes('can-track-false') ||
    window.location.pathname.includes('symbol-tracking')
  ) {
    khulnasoft.canTrack = false;
  }

  if (window.location.pathname.includes('variant-containers')) {
    khulnasoft.setUserAttributes({
      device: 'tablet',
    });
  }
}

type KhulnasoftPageProps = any;

export function RenderKhulnasoftContent(props: KhulnasoftPageProps) {
  const pathname = usePathname();

  if (props?.apiEndpoint) {
    khulnasoft.apiEndpoint = props.apiEndpoint;
  }

  useEffect(() => {
    if (pathname.includes('get-query')) {
      khulnasoft
        .get('', {
          ...props,
          ...props['options'],
        })
        .promise()
        .then();
    } else if (pathname.includes('get-content')) {
      khulnasoft
        .get('', {
          ...props,
          ...props['options'],
        })
        .promise()
        .then();
    } else if (pathname.includes('with-fetch-options')) {
      khulnasoft
        .get('', {
          ...props,
          fetchOptions: {
            method: 'POST',
            body: JSON.stringify({
              test: 'test',
            }),
          },
        })
        .promise()
        .then();
    }
    Khulnasoft.registerAction({
      name: 'test-action',
      kind: 'function',
      id: 'test-action-id',
      inputs: [
        {
          name: 'actionName',
          type: 'string',
          required: true,
          helperText: 'Action name',
        },
      ],
      action: () => {
        return `console.log("function call")`;
      },
    });
  }, []);

  return props.content ? <KhulnasoftComponent {...props} /> : <DefaultErrorPage statusCode={404} />;
}
