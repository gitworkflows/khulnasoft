import {
  onUpdate,
  setContext,
  useMetadata,
  useState,
} from '@khulnasoft.com/mitosis';
import KhulnasoftContext from '../../../context/khulnasoft.context.lite.js';
import type { KhulnasoftContextInterface } from '../../../context/types.js';
import type { BlockProps } from '../block.lite.jsx';
import Block from '../block.lite.jsx';

type Props = Omit<BlockProps, 'context'> & {
  repeatContext: KhulnasoftContextInterface;
};

useMetadata({
  options: {
    vue: {
      asyncComponentImports: true,
    },
  },
  rsc: {
    componentType: 'server',
  },
});

/**
 * We can't make this a generic `ProvideContext` function because Vue 2 won't support root slots, e.g.
 *
 * ```vue
 * <template>
 *  <slot></slot>
 * </template>
 * ```
 */
export default function RepeatedBlock(props: Props) {
  const [store] = useState(props.repeatContext, { reactive: true });

  setContext(KhulnasoftContext, store);

  onUpdate(() => {
    store.value = props.repeatContext;
  }, [props.repeatContext]);

  return (
    <Block
      block={props.block}
      context={store}
      registeredComponents={props.registeredComponents}
      linkComponent={props.linkComponent}
    />
  );
}
