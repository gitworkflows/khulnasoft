import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { evaluate } from './evaluate/evaluate.js';

export function getBlockComponentOptions(
  block: KhulnasoftBlock,
  context: Pick<
    KhulnasoftContextInterface,
    'localState' | 'context' | 'rootState' | 'rootSetState'
  >
) {
  return {
    ...block.component?.options,
    ...(block as any).options,
    ...evaluateTextComponentTextOption(block, context),
  };
}

const evaluateTextComponentTextOption = (
  block: KhulnasoftBlock,
  context: Pick<
    KhulnasoftContextInterface,
    'localState' | 'context' | 'rootState' | 'rootSetState'
  >
) => {
  if (
    block.component?.name === 'Text' &&
    block.component.options?.text &&
    typeof block.component.options.text === 'string'
  ) {
    return {
      ...block.component.options,
      text: block.component.options.text.replace(
        /{{([^}]+)}}/g,
        (_match: string, group: string) =>
          evaluate({
            code: group,
            context,
            localState: context.localState,
            rootState: context.rootState,
            rootSetState: context.rootSetState,
          }) as string
      ),
    };
  }
};
