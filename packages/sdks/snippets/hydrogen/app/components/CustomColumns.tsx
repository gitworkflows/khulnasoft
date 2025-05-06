import {
  Blocks,
  type KhulnasoftBlock,
  type RegisteredComponent,
} from '@khulnasoft.com/sdk-react';

interface CustomColumnsProps {
  column1: KhulnasoftBlock[];
  column2: KhulnasoftBlock[];
  khulnasoftBlock: KhulnasoftBlock;
}

export function CustomColumns({
  column1,
  column2,
  khulnasoftBlock,
}: CustomColumnsProps) {
  return (
    <>
      <Blocks blocks={column1} path="column1" parent={khulnasoftBlock.id} />
      <Blocks blocks={column2} path="column2" parent={khulnasoftBlock.id} />
    </>
  );
}

export const customColumnsInfo: RegisteredComponent = {
  name: 'MyColumns',
  component: CustomColumns,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
  },
  inputs: [
    {name: 'column1', type: 'uiBlocks', defaultValue: []},
    {name: 'column2', type: 'uiBlocks', defaultValue: []},
  ],
};
