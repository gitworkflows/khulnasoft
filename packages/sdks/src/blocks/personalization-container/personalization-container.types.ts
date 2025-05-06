import type { KhulnasoftBlock } from '../../types/khulnasoft-block.js';
import type {
  KhulnasoftComponentsProp,
  KhulnasoftDataProps,
} from '../../types/khulnasoft-props.js';
import type { Query } from './helpers.js';

export type PersonalizationContainerProps = {
  children?: any;
  attributes?: any;
  previewingIndex?: number | null;
  variants?: Array<{
    blocks: KhulnasoftBlock[];
    query: Query[];
    startDate?: string;
    endDate?: string;
  }>;
} & KhulnasoftDataProps &
  KhulnasoftComponentsProp;
