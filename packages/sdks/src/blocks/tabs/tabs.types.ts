import type { KhulnasoftBlock } from '../../types/khulnasoft-block.js';
import type {
  KhulnasoftComponentsProp,
  KhulnasoftDataProps,
  KhulnasoftLinkComponentProp,
} from '../../types/khulnasoft-props.js';

export interface TabsProps
  extends KhulnasoftComponentsProp,
    KhulnasoftLinkComponentProp,
    KhulnasoftDataProps {
  tabs: {
    label: KhulnasoftBlock[];
    content: KhulnasoftBlock[];
  }[];
  khulnasoftBlock: KhulnasoftBlock;
  defaultActiveTab?: number;
  collapsible?: boolean;
  tabHeaderLayout?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  activeTabStyle?: any;
}
