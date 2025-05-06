import { component$ } from '@khulnasoft.com/qwik';
import {
  Blocks,
  type KhulnasoftBlock,
  type RegisteredComponent,
} from '@khulnasoft.com/sdk-qwik';

export const CustomColumns = component$(
  (props: {
    column1: KhulnasoftBlock[];
    column2: KhulnasoftBlock[];
    khulnasoftBlock: KhulnasoftBlock;
  }) => {
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
  }
);

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
