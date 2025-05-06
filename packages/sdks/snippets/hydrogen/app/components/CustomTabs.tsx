import {useState} from 'react';
import {
  Blocks,
  type KhulnasoftBlock,
  type RegisteredComponent,
} from '@khulnasoft.com/sdk-react';

interface CustomTabsProps {
  tabList: Array<{
    tabName: string;
    blocks: KhulnasoftBlock[];
  }>;
  khulnasoftBlock: KhulnasoftBlock;
}

export function CustomTabs({tabList, khulnasoftBlock}: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabList?.length) return null;

  return (
    <>
      {tabList.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(i)}
          className={activeTab === i ? 'active' : ''}
        >
          {tab.tabName}
        </button>
      ))}

      <Blocks
        parent={khulnasoftBlock.id}
        path={`tabList.${activeTab}.blocks`}
        blocks={tabList[activeTab].blocks}
      />
    </>
  );
}

export const customTabsInfo: RegisteredComponent = {
  name: 'TabFields',
  component: CustomTabs,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
  },
  inputs: [
    {
      name: 'tabList',
      type: 'list',
      subFields: [
        {name: 'tabName', type: 'string'},
        {name: 'blocks', type: 'uiBlocks', defaultValue: []},
      ],
    },
  ],
};
