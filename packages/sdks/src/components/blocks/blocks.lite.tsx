import {
  For,
  Show,
  useContext,
  useMetadata,
  useTarget,
} from '@khulnasoft.com/mitosis';
import KhulnasoftContext from '../../context/khulnasoft.context.lite.js';
import ComponentsContext from '../../context/components.context.lite.js';
import Block from '../block/block.lite.jsx';
import BlocksWrapper from './blocks-wrapper.lite.jsx';
import type { BlocksProps } from './blocks.types.js';

useMetadata({
  rsc: {
    componentType: 'server',
  },
});

export default function Blocks(props: BlocksProps) {
  const khulnasoftContext = useContext(KhulnasoftContext);
  const componentsContext = useContext(ComponentsContext);

  return (
    <BlocksWrapper
      blocks={props.blocks}
      parent={props.parent}
      path={props.path}
      styleProp={props.styleProp}
      BlocksWrapper={useTarget({
        rsc: props.context?.value?.BlocksWrapper,
        default:
          props.context?.value?.BlocksWrapper ||
          khulnasoftContext.value?.BlocksWrapper,
      })}
      BlocksWrapperProps={
        props.BlocksWrapperProps ||
        useTarget({
          rsc: props.context?.value?.BlocksWrapperProps,
          default:
            props.context?.value?.BlocksWrapperProps ||
            khulnasoftContext.value?.BlocksWrapperProps,
        })
      }
      classNameProp={props.className}
    >
      {props.children}
      <Show when={props.blocks}>
        <For each={props.blocks}>
          {(block) => (
            <Block
              key={block.id}
              block={block}
              context={useTarget({
                rsc: props.context,
                default: props.context || khulnasoftContext,
              })}
              registeredComponents={useTarget({
                rsc: props.registeredComponents,
                default:
                  props.registeredComponents ||
                  componentsContext?.registeredComponents,
              })}
              linkComponent={props.linkComponent}
            />
          )}
        </For>
      </Show>
    </BlocksWrapper>
  );
}
