import type { KhulnasoftBlock } from '../../types/khulnasoft-block.js';
import type {
  KhulnasoftComponentsProp,
  KhulnasoftDataProps,
  KhulnasoftLinkComponentProp,
} from '../../types/khulnasoft-props.js';

export type Column = {
  blocks: KhulnasoftBlock[];
  width?: number;
  link?: string;
};

type StackColumnsAt = 'tablet' | 'mobile' | 'never';

export interface ColumnProps
  extends KhulnasoftComponentsProp,
    KhulnasoftLinkComponentProp,
    KhulnasoftDataProps {
  columns?: Column[];
  space?: number;
  stackColumnsAt?: StackColumnsAt;
  reverseColumnsWhenStacked?: boolean;
}
