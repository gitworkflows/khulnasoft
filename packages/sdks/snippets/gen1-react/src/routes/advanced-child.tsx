import khulnasoft, { Khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react';
import { type KhulnasoftContent } from '@khulnasoft.com/sdk';
import { useEffect, useState } from 'react';
import CustomTabs from '../components/CustomTabs';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

Khulnasoft.registerComponent(CustomTabs, {
  name: 'TabFields',
  inputs: [
    {
      name: 'tabList',
      type: 'array',
      subFields: [
        {
          name: 'tabName',
          type: 'string',
        },
        {
          name: 'blocks',
          type: 'uiBlocks',
          defaultValue: [],
        },
      ],
    },
  ],
});

export default function AdvancedChild() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);

  useEffect(() => {
    khulnasoft
      .get('advanced-child', {
        url: window.location.pathname,
      })
      .promise()
      .then(setContent);
  }, []);

  if (!content) {
    return null;
  }

  return <KhulnasoftComponent content={content} model="advanced-child" />;
}
