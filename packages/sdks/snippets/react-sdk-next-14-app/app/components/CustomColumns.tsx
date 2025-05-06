// app/components/CustomColumns.tsx
'use client';

import {
  Blocks,
  type KhulnasoftBlock,
  type RegisteredComponent,
  type RegisteredComponents,
} from '@khulnasoft.com/sdk-react';

type CustomColumnsProps = {
  column1: KhulnasoftBlock[];
  column2: KhulnasoftBlock[];
  khulnasoftBlock: KhulnasoftBlock;
  khulnasoftComponents: RegisteredComponents;
};

export function CustomColumns({
  column1,
  column2,
  khulnasoftBlock,
  khulnasoftComponents,
}: CustomColumnsProps) {
  return (
    <>
      <Blocks
        blocks={column1}
        path="column1"
        parent={khulnasoftBlock.id}
        registeredComponents={khulnasoftComponents} // Required: Helps pass registered components to <Blocks/> component
      />
      <Blocks
        blocks={column2}
        path="column2"
        parent={khulnasoftBlock.id}
        registeredComponents={khulnasoftComponents} // Required: Helps pass registered components to <Blocks/> component
      />
    </>
  );
}

export const customColumnsInfo: RegisteredComponent = {
  name: 'MyColumns',
  component: CustomColumns,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
    khulnasoftComponents: true, // Required: Helps pass registered components to <Blocks/> component
  },
  inputs: [
    { name: 'column1', type: 'uiBlocks', defaultValue: [] },
    { name: 'column2', type: 'uiBlocks', defaultValue: [] },
  ],
};
