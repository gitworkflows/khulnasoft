import { $ } from '@khulnasoft.com/qwik';
import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { evaluate } from './evaluate/index.js';

export function createEventHandler(
  value: string,
  options: { block: KhulnasoftBlock } & Pick<
    KhulnasoftContextInterface,
    'localState' | 'context' | 'rootState' | 'rootSetState'
  >
): (event: Event) => any {
  return $((event: Event) =>
    evaluate({
      code: value,
      context: options.context,
      localState: options.localState,
      rootState: options.rootState,
      rootSetState: options.rootSetState,
      event,
    })
  );
}
