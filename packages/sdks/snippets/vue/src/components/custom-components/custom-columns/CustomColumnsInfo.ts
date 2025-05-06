import CustomColumns from '@/components/custom-components/custom-columns/CustomColumns.vue';
import type { RegisteredComponent } from '@khulnasoft.com/sdk-vue';

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
