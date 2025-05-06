import type { KhulnasoftBlock } from '../../types/khulnasoft-block.js';
import type {
  KhulnasoftComponentsProp,
  KhulnasoftDataProps,
  KhulnasoftLinkComponentProp,
} from '../../types/khulnasoft-props.js';

export interface AccordionProps
  extends KhulnasoftComponentsProp,
    KhulnasoftLinkComponentProp,
    KhulnasoftDataProps {
  items: {
    title: KhulnasoftBlock[];
    detail: KhulnasoftBlock[];
  }[];
  oneAtATime?: boolean;
  grid?: boolean;
  gridRowWidth?: string;
  useChildrenForItems?: boolean;
}
