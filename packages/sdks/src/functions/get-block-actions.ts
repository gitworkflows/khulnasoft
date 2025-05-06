import { TARGET } from '../constants/target.js';
import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { getEventHandlerName } from './event-handler-name.js';
import { createEventHandler } from './get-block-actions-handler.js';

type Actions = { [index: string]: (event: Event) => any };

export function getBlockActions(
  options: {
    block: KhulnasoftBlock;
    stripPrefix?: boolean;
  } & Pick<
    KhulnasoftContextInterface,
    'localState' | 'context' | 'rootState' | 'rootSetState'
  >
): Actions {
  const obj: Actions = {};
  const optionActions = options.block.actions ?? {};

  for (const key in optionActions) {
    // eslint-disable-next-line no-prototype-builtins
    if (!optionActions.hasOwnProperty(key)) {
      continue;
    }
    const value = optionActions[key];

    let eventHandlerName = getEventHandlerName(key);

    if (options.stripPrefix) {
      switch (TARGET) {
        case 'vue':
          eventHandlerName = eventHandlerName.replace('v-on:', '');
          break;
        case 'svelte':
          eventHandlerName = eventHandlerName.replace('on:', '');
          break;
      }
    }

    obj[eventHandlerName] = createEventHandler(value, options);
  }

  return obj;
}
