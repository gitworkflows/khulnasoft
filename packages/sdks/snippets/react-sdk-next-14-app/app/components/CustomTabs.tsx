// app/components/CustomTabs.tsx

'use client';
import type {
  KhulnasoftBlock,
  RegisteredComponent,
  RegisteredComponents,
} from '@khulnasoft.com/sdk-react';
import { Blocks } from '@khulnasoft.com/sdk-react';
import { useState } from 'react';

type CustomTabsProps = {
  tabList: {
    tabName: string;
    blocks: KhulnasoftBlock[];
  }[];
  khulnasoftBlock: KhulnasoftBlock;
  khulnasoftComponents: RegisteredComponents; // Required to avoid hydration errors
};

export function CustomTabs({
  tabList,
  khulnasoftBlock,
  khulnasoftComponents,
}: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {tabList?.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={activeTab === index ? 'active' : ''}
        >
          {tab.tabName}
        </button>
      ))}

      <Blocks
        parent={khulnasoftBlock.id}
        path={`tabList.${activeTab}.blocks`}
        blocks={tabList[activeTab].blocks}
        registeredComponents={khulnasoftComponents} // Required: Prevents hydration errors and "Component not found" errors
      />
    </>
  );
}

export const customTabsInfo: RegisteredComponent = {
  name: 'TabFields',
  component: CustomTabs,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
    khulnasoftComponents: true, // Required: Helps pass registered components to <Blocks/> component
  },
  inputs: [
    {
      name: 'tabList',
      type: 'list',
      subFields: [
        { name: 'tabName', type: 'string' },
        { name: 'blocks', type: 'uiBlocks', defaultValue: [] },
      ],
    },
  ],
};
