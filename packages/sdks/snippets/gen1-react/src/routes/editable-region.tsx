import khulnasoft, { Khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react';
import { type KhulnasoftContent } from '@khulnasoft.com/sdk';
import { useEffect, useState } from 'react';
import CustomColumns from '../components/CustomColumns';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

Khulnasoft.registerComponent(CustomColumns, {
  name: 'MyColumns',
  inputs: [
    {
      name: 'column1',
      type: 'uiBlocks',
      defaultValue: [],
    },
    {
      name: 'column2',
      type: 'uiBlocks',
      defaultValue: [],
    },
  ],
});

export default function EditableRegion() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);

  useEffect(() => {
    khulnasoft
      .get('editable-regions', {
        url: window.location.pathname,
      })
      .promise()
      .then(setContent);
  }, []);

  if (!content) {
    return null;
  }

  return <KhulnasoftComponent content={content} model="editable-regions" />;
}
