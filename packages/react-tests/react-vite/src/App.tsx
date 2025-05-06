import { Khulnasoft, KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import { getAPIKey, getProps, PAGES } from '@sdk/tests';
import { useEffect, useState } from 'react';

import '@khulnasoft.com/widgets';
import { ComponentWithLocalizedSubfields } from './components/ComponentWithLocalizedSubfields';

if (typeof window !== 'undefined') {
  const pathname = window.location.pathname;
  if (pathname.includes('can-track-false-pre-init')) {
    khulnasoft.canTrack = false;
  }
}

khulnasoft.init(getAPIKey());

// default to not tracking, and re-enable when appropriate
khulnasoft.canTrack = false;

if (
  typeof window !== 'undefined' &&
  !window.location.pathname.includes('can-track-false') &&
  !window.location.pathname.includes('symbol-tracking')
) {
  khulnasoft.canTrack = true;
}
Khulnasoft.registerComponent(ComponentWithLocalizedSubfields, {
  name: 'ComponentWithLocalizedSubfields',
  inputs: [
    {
      name: 'texts',
      type: 'array',
      subFields: [
        {
          name: 'text1',
          type: 'text',
        },
        {
          name: 'text2',
          type: 'text',
        },
      ],
    },
  ],
});

if (typeof window !== 'undefined') {
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
      return `console.log("function call") `;
    },
  });
}

function App() {
  const [props, setProps] = useState<any>(undefined);

  useEffect(() => {
    getProps({ sdk: 'oldReact' }).then(resp => {
      setProps(resp);
      if (
        window.location.pathname.includes('get-query') ||
        window.location.pathname.includes('get-content')
      ) {
        if (resp?.apiEndpoint) {
          khulnasoft.apiEndpoint = resp.apiEndpoint;
        }
        khulnasoft
          .get('', {
            ...resp,
            ...resp['options'],
          })
          .promise()
          .then();
      }
    });
  }, []);

  if (props?.apiVersion) {
    khulnasoft.apiVersion = props?.apiVersion;
  }

  if (props?.apiEndpoint) {
    khulnasoft.apiEndpoint = props.apiEndpoint;
  }

  if (props?.trustedHosts) {
    Khulnasoft.trustedHosts = props.trustedHosts;
  }

  return PAGES[window.location.pathname]?.isGen1VisualEditingTest ? (
    <KhulnasoftComponent model="page" {...props} />
  ) : props ? (
    <KhulnasoftComponent {...props} />
  ) : (
    <div>Content Not Found</div>
  );
}

export default App;
