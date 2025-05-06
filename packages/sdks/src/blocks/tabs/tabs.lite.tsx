import { For, Show, useStore, useTarget } from '@khulnasoft.com/mitosis';
import Blocks from '../../components/blocks/blocks.lite.jsx';
import type { KhulnasoftBlock } from '../../types/khulnasoft-block.js';
import type { TabsProps } from './tabs.types.js';

export default function Tabs(props: TabsProps) {
  const state = useStore({
    activeTab: props.defaultActiveTab ? props.defaultActiveTab - 1 : 0,
    activeTabContent(active: number): KhulnasoftBlock[] | undefined {
      return props.tabs && props.tabs[active].content;
    },
    onClick(index: number) {
      if (index === state.activeTab && props.collapsible) {
        state.activeTab = -1;
      } else {
        state.activeTab = index;
      }
    },
  });

  return (
    <div>
      <div
        class="khulnasoft-tabs-wrap"
        style={{
          display: 'flex',
          flexDirection: useTarget({
            reactNative: 'row' as 'row' | 'column' | 'column-reverse',
            default: 'row',
          }),
          justifyContent: props.tabHeaderLayout || 'flex-start',
          overflow: useTarget({
            reactNative: 'scroll' as 'scroll' | 'visible' | 'hidden',
            default: 'auto',
          }),
        }}
      >
        <For each={props.tabs}>
          {(tab, index) => (
            <span
              key={index}
              class={`khulnasoft-tab-wrap ${state.activeTab === index ? 'khulnasoft-tab-active' : ''}`}
              style={{
                ...(state.activeTab === index ? props.activeTabStyle : {}),
              }}
              onClick={() => state.onClick(index)}
            >
              <Blocks
                parent={props.khulnasoftBlock.id}
                path={`tabs.${index}.label`}
                blocks={tab.label}
                context={props.khulnasoftContext}
                registeredComponents={props.khulnasoftComponents}
                linkComponent={props.khulnasoftLinkComponent}
              />
            </span>
          )}
        </For>
      </div>
      {/* Display blocks for the active tab's content */}
      <Show when={state.activeTabContent(state.activeTab)}>
        <div>
          <Blocks
            parent={props.khulnasoftBlock.id}
            path={`tabs.${state.activeTab}.content`}
            blocks={state.activeTabContent(state.activeTab)}
            context={props.khulnasoftContext}
            registeredComponents={props.khulnasoftComponents}
            linkComponent={props.khulnasoftLinkComponent}
          />
        </div>
      </Show>
    </div>
  );
}
