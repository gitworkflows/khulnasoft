import {
  onMount,
  onUpdate,
  useMetadata,
  useStore,
  useTarget,
} from '@khulnasoft.com/mitosis';
import ContentVariants from '../../components/content-variants/index.js';
import type { KhulnasoftContent } from '../../types/khulnasoft-content.js';
import { filterAttrs } from '../helpers.js';
/**
 * This import is used by the Svelte SDK. Do not remove.
 */

import DynamicDiv from '../../components/dynamic-div.lite.jsx';
import { getClassPropName } from '../../functions/get-class-prop-name.js';
import type { Nullable } from '../../types/typescript.js';
import { setAttrs } from '../helpers.js';
import { fetchSymbolContent } from './symbol.helpers.js';
import type { SymbolProps } from './symbol.types.js';

useMetadata({
  rsc: {
    componentType: 'server',
  },
});

export default function Symbol(props: SymbolProps) {
  const state = useStore({
    get blocksWrapper() {
      return useTarget({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        reactNative: View,
        angular: DynamicDiv,
        default: 'div',
      });
    },
    get contentWrapper() {
      return useTarget({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        reactNative: View,
        angular: DynamicDiv,
        default: 'div',
      });
    },
    get className() {
      return [
        ...useTarget({
          reactNative: [],
          default: [props.attributes[getClassPropName()]],
        }),
        'khulnasoft-symbol',
        props.symbol?.inline ? 'khulnasoft-inline-symbol' : undefined,
        props.symbol?.dynamic || props.dynamic
          ? 'khulnasoft-dynamic-symbol'
          : undefined,
      ]
        .filter(Boolean)
        .join(' ');
    },

    contentToUse: useTarget<Nullable<KhulnasoftContent>>({
      default: props.symbol?.content,
      rsc: (async () =>
        props.symbol?.content ||
        (await fetchSymbolContent({
          symbol: props.symbol,
          khulnasoftContextValue: props.khulnasoftContext.value,
        }))) as Nullable<KhulnasoftContent>,
    }),
    symbolEntry: props.symbol?.entry,
    setContent() {
      if (state.contentToUse && state.symbolEntry === props.symbol?.entry)
        return;

      fetchSymbolContent({
        symbol: props.symbol,
        khulnasoftContextValue: props.khulnasoftContext.value,
      }).then((newContent) => {
        if (newContent) {
          state.contentToUse = newContent;
          state.symbolEntry = props.symbol?.entry;
        }
      });
    },
  });

  onUpdate(() => {
    state.setContent();
  }, [props.symbol]);

  onMount(() => {
    useTarget({
      react: () => {},
      reactNative: () => {},
      solid: () => {},
      angular: () => {},

      default: () => {
        state.setContent();
      },
    });
  });

  return (
    <div
      {...useTarget({
        vue: filterAttrs(props.attributes, 'v-on:', false),
        svelte: filterAttrs(props.attributes, 'on:', false),
        default: {},
      })}
      {...useTarget({
        vue: filterAttrs(props.attributes, 'v-on:', true),
        svelte: filterAttrs(props.attributes, 'on:', true),
        default: props.attributes,
      })}
      className={state.className}
      {...useTarget({
        reactNative: { dataSet: { class: state.className } },
        default: {},
      })}
    >
      <ContentVariants
        nonce={props.khulnasoftContext.value.nonce}
        isNestedRender
        apiVersion={props.khulnasoftContext.value.apiVersion}
        apiKey={props.khulnasoftContext.value.apiKey!}
        context={{
          ...props.khulnasoftContext.value.context,
          symbolId: props.khulnasoftBlock?.id,
        }}
        customComponents={Object.values(props.khulnasoftComponents)}
        data={{
          ...props.symbol?.data,
          ...props.khulnasoftContext.value.localState,
          ...state.contentToUse?.data?.state,
        }}
        canTrack={props.khulnasoftContext.value.canTrack}
        model={props.symbol?.model ?? ''}
        content={state.contentToUse}
        linkComponent={props.khulnasoftLinkComponent}
        blocksWrapper={state.blocksWrapper}
        contentWrapper={state.contentWrapper}
      />
    </div>
  );
}
