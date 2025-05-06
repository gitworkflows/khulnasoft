import type { RegisteredComponent } from '@khulnasoft.com/sdk-svelte';
import CustomColumns from './CustomColumns.svelte';

export const CustomColumnsInfo: RegisteredComponent = {
  component: CustomColumns,
  name: 'MyColumns', // you can define your custom name for the component
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

  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
  },
};

export default CustomColumnsInfo;
