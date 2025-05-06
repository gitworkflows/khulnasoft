import { useMetadata, useTarget } from '@khulnasoft.com/mitosis';
import Blocks from '../../components/blocks/blocks.lite.jsx';
import { deoptSignal } from '../../functions/deopt.js';
import type { KhulnasoftBlock } from '../../types/khulnasoft-block.js';
import type {
  KhulnasoftComponentsProp,
  KhulnasoftDataProps,
} from '../../types/khulnasoft-props.js';

export type DropzoneProps = KhulnasoftDataProps &
  KhulnasoftComponentsProp & {
    name: string;
    attributes: any;
  };

useMetadata({
  rsc: {
    componentType: 'server',
  },
});

export default function Slot(props: DropzoneProps) {
  return (
    <div
      style={{
        pointerEvents: 'auto',
      }}
      {...(!props.khulnasoftContext.value.context?.symbolId && {
        'khulnasoft-slot': props.name,
      })}
    >
      <Blocks
        parent={props.khulnasoftContext.value.context?.symbolId as string}
        path={`symbol.data.${props.name}`}
        blocks={useTarget({
          /**
           * Workaround until https://github.com/KhulnasoftIO/qwik/issues/5017 is fixed.
           */
          qwik: deoptSignal(
            props.khulnasoftContext.value.rootState?.[props.name]
          ) as KhulnasoftBlock[],
          default: props.khulnasoftContext.value.rootState?.[
            props.name
          ] as KhulnasoftBlock[],
        })}
        context={props.khulnasoftContext}
        registeredComponents={props.khulnasoftComponents}
      />
    </div>
  );
}
