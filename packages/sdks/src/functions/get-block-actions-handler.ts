import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { evaluate } from './evaluate/index.js';

type Options = {
  block: KhulnasoftBlock;
} & Pick<
  KhulnasoftContextInterface,
  'localState' | 'context' | 'rootState' | 'rootSetState'
>;

type EventHandler = (event: Event) => any;

export const createEventHandler =
  (value: string, options: Options): EventHandler =>
  (event) =>
    evaluate({
      code: value,
      context: options.context,
      localState: options.localState,
      rootState: options.rootState,
      rootSetState: options.rootSetState,
      event,
      isExpression: false,
    });
