import React, { useEffect, useRef } from 'react';
import { KhulnasoftElement, Khulnasoft } from '@khulnasoft.com/sdk';
import { KhulnasoftBlockComponent, withKhulnasoft } from '@khulnasoft.com/react';

const refs: Record<string, Element> = {};

if (Khulnasoft.isBrowser) {
  try {
    Array.from(document.querySelectorAll('.khulnasoft-static-content')).forEach(el => {
      const id = (el as HTMLDivElement).dataset.khulnasoftStaticId;
      if (id) {
        refs[id] = el;
      }
    });
  } catch (err) {
    console.error('Khulnasoft replace nodes error:', err);
  }
}

interface StaticContentProps {
  khulnasoftBlock?: KhulnasoftElement;
}

const StaticContentComponent: React.SFC<StaticContentProps> = props => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Khulnasoft.isEditing || Khulnasoft.isPreviewing) {
      return;
    }

    const blockId = props.khulnasoftBlock?.id;
    if (blockId && refs[blockId] && ref.current) {
      ref.current.parentNode?.replaceChild(refs[blockId], ref.current);
    }
  }, []);

  return (
    <div
      className="khulnasoft-static-content"
      data-khulnasoft-static-id={props.khulnasoftBlock?.id}
      ref={ref}
    >
      {(Khulnasoft.isEditing || Khulnasoft.isPreviewing || Khulnasoft.isServer) &&
        props.khulnasoftBlock?.children &&
        props.khulnasoftBlock.children.map((block, index) => (
          <KhulnasoftBlockComponent key={index + block.id!} block={block} />
        ))}
    </div>
  );
};

export const StaticContent = withKhulnasoft(StaticContentComponent, {
  name: 'Shopify:StaticContent',
  canHaveChildren: true,
  image:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fa21e7dbe14b5404fb5ef1a4a2808fe7e',
  description: 'Advanced component that preserves server rendered nodes, use with caution',
  defaultStyles: {
    // height: '200px',
    // how to disable styling
    marginTop: '0px',
    paddingBottom: '20px',
  },
  defaultChildren: [
    {
      '@type': '@khulnasoft.com/sdk:Element',
      responsiveStyles: {
        large: {
          textAlign: 'center',
        },
      },
      component: {
        name: 'Text',
        options: {
          text: '<p>wrap content that should be static</p>',
        },
      },
    },
  ],
});
