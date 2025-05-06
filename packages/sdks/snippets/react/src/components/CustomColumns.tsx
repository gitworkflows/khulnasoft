import {
  Blocks,
  KhulnasoftBlock,
  RegisteredComponent,
} from '@khulnasoft.com/sdk-react';

interface CustomColumnsProps {
  column1: KhulnasoftBlock[];
  column2: KhulnasoftBlock[];
  khulnasoftBlock: KhulnasoftBlock;
}

const CustomColumns = (props: CustomColumnsProps) => {
  return (
    <>
      <Blocks
        blocks={props.column1}
        path="column1"
        parent={props.khulnasoftBlock.id}
      />

      <Blocks
        blocks={props.column2}
        path="column2"
        parent={props.khulnasoftBlock.id}
      />
    </>
  );
};

export const customColumnsInfo: RegisteredComponent = {
  name: 'MyColumns',
  component: CustomColumns,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
  },
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
};
