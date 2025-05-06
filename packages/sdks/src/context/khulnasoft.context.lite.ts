import { createContext } from '@khulnasoft.com/mitosis';
import type { KhulnasoftContextInterface } from './types.js';

export default createContext<KhulnasoftContextInterface>(
  {
    content: null,
    context: {},
    localState: undefined,
    rootSetState: () => {},
    rootState: {},
    apiKey: null,
    apiVersion: undefined,
    componentInfos: {},
    inheritedStyles: {},
    BlocksWrapper: 'div',
    BlocksWrapperProps: {},
    nonce: '',
    model: '',
  },
  { reactive: true }
);
