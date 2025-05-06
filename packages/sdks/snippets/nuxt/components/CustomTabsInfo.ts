import type { RegisteredComponent } from '@khulnasoft.com/sdk-vue';
import CustomTabs from './CustomTabs.vue';

export const CustomTabsInfo: RegisteredComponent = {
  component: CustomTabs,
  name: 'TabFields',
  inputs: [
    {
      name: 'tabList',
      type: 'list',
      subFields: [
        {
          name: 'tabName',
          type: 'string',
        },
        {
          name: 'blocks',
          type: 'uiBlocks',
          defaultValue: [],
        },
      ],
    },
  ],
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
  },
};

export default CustomTabsInfo;
