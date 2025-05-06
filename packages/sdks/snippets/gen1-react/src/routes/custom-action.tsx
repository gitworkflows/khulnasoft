import khulnasoft, { Khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react';
import { type KhulnasoftContent } from '@khulnasoft.com/sdk';
import { useEffect, useState } from 'react';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');
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

function CustomAction() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);
  useEffect(() => {
    khulnasoft
      .get('custom-action', {
        url: window.location.pathname,
      })
      .promise()
      .then(setContent);
  }, []);

  if (!content) {
    return null;
  }

  return <KhulnasoftComponent content={content} model="custom-action" />;
}

export default CustomAction;
