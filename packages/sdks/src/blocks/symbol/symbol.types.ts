import type { KhulnasoftContent } from '../../types/khulnasoft-content.js';
import type {
  KhulnasoftComponentsProp,
  KhulnasoftDataProps,
  KhulnasoftLinkComponentProp,
} from '../../types/khulnasoft-props.js';

interface SymbolInfo {
  model?: string;
  entry?: string;
  data?: any;
  content?: KhulnasoftContent;
  inline?: boolean;
  dynamic?: boolean;
}

export interface SymbolProps
  extends KhulnasoftComponentsProp,
    KhulnasoftDataProps,
    KhulnasoftLinkComponentProp {
  symbol?: SymbolInfo;
  dataOnly?: boolean;
  dynamic?: boolean;
  attributes?: any;
  inheritState?: boolean;
  renderToLiquid?: boolean;
}
