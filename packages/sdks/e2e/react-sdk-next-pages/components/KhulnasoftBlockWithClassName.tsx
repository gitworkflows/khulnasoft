'use client';
import type { KhulnasoftBlock } from '@khulnasoft.com/sdk-react';
import { Blocks } from '@khulnasoft.com/sdk-react';

interface KhulnasoftBlockWithClassNameProps {
  khulnasoftBlock: KhulnasoftBlock;
  content: KhulnasoftBlock[];
  khulnasoftContext: any;
  khulnasoftComponents: any;
}

export const khulnasoftBlockWithClassNameCustomComponent = {
  name: 'KhulnasoftBlockWithClassName',
  component: KhulnasoftBlockWithClassName,
  isRSC: true,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
    khulnasoftContext: true,
    khulnasoftComponents: true,
  },
  inputs: [
    {
      name: 'content',
      type: 'uiBlocks',
      defaultValue: [
        {
          '@type': '@khulnasoft.com/sdk:Element',
          '@version': 2,
          id: 'khulnasoft-c6e179528dee4e62b337cf3f85d6496f',
          component: {
            name: 'Text',
            options: {
              text: 'Enter some text...',
            },
          },
          responsiveStyles: {
            large: {
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flexShrink: '0',
              boxSizing: 'border-box',
              marginTop: '20px',
              lineHeight: 'normal',
              height: 'auto',
            },
          },
        },
      ],
    },
  ],
};

export default function KhulnasoftBlockWithClassName(
  props: KhulnasoftBlockWithClassNameProps
) {
  return (
    <div>
      <Blocks
        parent={props.khulnasoftBlock?.id}
        path={`component.options.content`}
        context={props.khulnasoftContext}
        registeredComponents={props.khulnasoftComponents}
        blocks={props.content}
        className="test-class-name"
      />
    </div>
  );
}
