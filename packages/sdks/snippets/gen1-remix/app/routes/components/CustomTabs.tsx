import { KhulnasoftBlocks, KhulnasoftElement } from '@khulnasoft.com/react';

import { useState } from 'react';

type TabProps = {
  tabList: { tabName: string; blocks: React.ReactNode[] }[];
  khulnasoftBlock: KhulnasoftElement;
};

export default function CustomTabs({ tabList, khulnasoftBlock }: TabProps) {
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

      <KhulnasoftBlocks
        parentElementId={khulnasoftBlock?.id}
        dataPath={`tabList.${activeTab}.blocks`}
        blocks={tabList[activeTab].blocks}
      />
    </>
  );
}
