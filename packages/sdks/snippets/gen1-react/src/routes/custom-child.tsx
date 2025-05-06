import khulnasoft, {
  Khulnasoft,
  KhulnasoftComponent,
  withChildren,
} from '@khulnasoft.com/react';
import { type KhulnasoftContent } from '@khulnasoft.com/sdk';
import { useEffect, useState } from 'react';
import CustomHero from '../components/CustomHero';

khulnasoft.init('ee9f13b4981e489a9a1209887695ef2b');

const HeroWithKhulnasoftChildren = withChildren(CustomHero);
Khulnasoft.registerComponent(HeroWithKhulnasoftChildren, {
  name: 'CustomHero',
  canHaveChildren: true,
  defaultChildren: [
    {
      '@type': '@khulnasoft.com/sdk:Element',
      component: {
        name: 'Text',
        options: {
          text: 'This is Khulnasoft text',
        },
      },
    },
  ],
});

function CustomChild() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);
  useEffect(() => {
    khulnasoft
      .get('custom-child', {
        url: window.location.pathname,
      })
      .promise()
      .then(setContent);
  }, []);

  if (!content) {
    return null;
  }

  return <KhulnasoftComponent content={content} model="custom-child" />;
}

export default CustomChild;
