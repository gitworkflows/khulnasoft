import { component$, useSignal } from '@khulnasoft.com/qwik';
import {
  Blocks,
  type KhulnasoftBlock,
  type RegisteredComponent,
} from '@khulnasoft.com/sdk-qwik';

interface TabProps {
  tabList: Array<{ tabName: string; blocks: KhulnasoftBlock[] }>;
  khulnasoftBlock: KhulnasoftBlock;
}

export const CustomTabs = component$((props: TabProps) => {
  const activeTab = useSignal(0);

  return (
    <div class="dynamic-slots">
      {props.tabList.map((tab, index) => (
        <button
          key={index}
          class={`tab-button ${activeTab.value === index ? 'active' : ''}`}
          onClick$={() => (activeTab.value = index)}
        >
          {tab.tabName}
        </button>
      ))}

      <Blocks
        parent={props.khulnasoftBlock?.id}
        path={`tabList.${activeTab.value}.blocks`}
        blocks={props.tabList[activeTab.value].blocks}
      />
    </div>
  );
});

export const customTabsInfo: RegisteredComponent = {
  component: CustomTabs,
  name: 'TabFields',
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
  },
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
};
