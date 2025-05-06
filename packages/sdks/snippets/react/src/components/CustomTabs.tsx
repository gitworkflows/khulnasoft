import {
  Blocks,
  KhulnasoftBlock,
  RegisteredComponent,
} from '@khulnasoft.com/sdk-react';
import { useState } from 'react';

interface TabProps {
  tabList?: { tabName: string; blocks: KhulnasoftBlock[] }[];
  khulnasoftBlock: KhulnasoftBlock;
}

export const CustomTabs = ({ tabList, khulnasoftBlock }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabList?.length) return null;

  return (
    <>
      <div className="tab-buttons">
        {tabList.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>

      <Blocks
        parent={khulnasoftBlock?.id}
        path={`tabList.${activeTab}.blocks`}
        blocks={tabList[activeTab].blocks}
      />
    </>
  );
};

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
