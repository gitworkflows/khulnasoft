/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useContext } from 'react';
import { Khulnasoft } from '@khulnasoft.com/sdk';
import { KhulnasoftBlocks } from '../components/khulnasoft-blocks.component';
import { KhulnasoftStoreContext } from '../store/khulnasoft-store';

Khulnasoft.registerComponent(Slot, {
  name: 'Slot',
  description: 'Allow child blocks to be inserted into this content when used as a Symbol',
  docsLink: 'https://www.khulnasoft.com/c/docs/symbols-with-blocks',
  image:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F3aad6de36eae43b59b52c85190fdef56',

  // Maybe wrap this for canHaveChildren so bind children to this hm
  inputs: [{ name: 'name', type: 'string', required: true, defaultValue: 'children' }],
});

type DropzoneProps = {
  name: string;
};

export function Slot(props: DropzoneProps) {
  const { name } = props;
  const context = useContext(KhulnasoftStoreContext);

  const isEditingThisSlot = !context.context.symbolId;

  return (
    <div
      css={{
        pointerEvents: 'auto',
      }}
      {...(isEditingThisSlot && {
        'khulnasoft-slot': name,
      })}
    >
      <KhulnasoftBlocks
        child
        parentElementId={context.context.symbolId}
        dataPath={`symbol.data.${name}`}
        blocks={context.state[name] || []}
      />
    </div>
  );
}
