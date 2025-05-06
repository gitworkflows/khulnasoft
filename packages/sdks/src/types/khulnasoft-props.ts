import type { Signal } from '@khulnasoft.com/mitosis';
import type {
  KhulnasoftContextInterface,
  RegisteredComponents,
} from '../context/types.js';
import type { KhulnasoftBlock } from './khulnasoft-block.js';

export type KhulnasoftDataProps = {
  khulnasoftBlock: KhulnasoftBlock;
  khulnasoftContext: Signal<KhulnasoftContextInterface>;
};

export type KhulnasoftComponentsProp = {
  khulnasoftComponents: RegisteredComponents;
};

export type KhulnasoftLinkComponentProp = {
  khulnasoftLinkComponent?: any;
};

export type KhulnasoftNonceProp = {
  nonce: string;
};
