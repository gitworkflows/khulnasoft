import type { Signal } from '@khulnasoft.com/mitosis';
import type {
  KhulnasoftContextInterface,
  RegisteredComponents,
} from '../../context/types.js';
import type { BlocksWrapperProps } from './blocks-wrapper.lite';

export type BlocksProps = Partial<
  Omit<BlocksWrapperProps, 'BlocksWrapper' | 'classNameProp'>
> & {
  context?: Signal<KhulnasoftContextInterface>;
  registeredComponents?: RegisteredComponents;
  linkComponent?: any;
  className?: string;
};
