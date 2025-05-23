import {
  Show,
  onInit,
  setContext,
  useMetadata,
  useState,
  useStore,
  useTarget,
} from '@khulnasoft.com/mitosis';
import { getDefaultRegisteredComponents } from '../../constants/khulnasoft-registered-components.js';
import { TARGET } from '../../constants/target.js';
import ComponentsContext from '../../context/components.context.lite.js';
import type {
  KhulnasoftContextInterface,
  KhulnasoftRenderState,
  RegisteredComponents,
} from '../../context/types.js';
import { evaluate } from '../../functions/evaluate/evaluate.js';
import { serializeIncludingFunctions } from '../../functions/register-component.js';
import { logger } from '../../helpers/logger.js';
import type { ComponentInfo } from '../../types/components.js';
import type { Dictionary } from '../../types/typescript.js';
import Blocks from '../blocks/blocks.lite.jsx';
import { getUpdateVariantVisibilityScript } from '../content-variants/helpers.js';
import DynamicDiv from '../dynamic-div.lite.jsx';
import InlinedScript from '../inlined-script.lite.jsx';
import EnableEditor from './components/enable-editor.lite.jsx';
import ContentStyles from './components/styles.lite.jsx';
import {
  getContentInitialValue,
  getRootStateInitialValue,
} from './content.helpers.js';
import type { ContentProps } from './content.types.js';
import { wrapComponentRef } from './wrap-component-ref.js';

useMetadata({
  qwik: {
    hasDeepStore: true,
  },
  rsc: {
    componentType: 'server',
  },
});

export default function ContentComponent(props: ContentProps) {
  const state = useStore({
    scriptStr: getUpdateVariantVisibilityScript({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      variationId: props.content?.testVariationId!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      contentId: props.content?.id!,
    }),
    contentSetState: (newRootState: KhulnasoftRenderState) => {
      khulnasoftContextSignal.value.rootState = newRootState;
    },

    registeredComponents: [
      ...getDefaultRegisteredComponents(),
      ...(props.customComponents || []),
    ].reduce<RegisteredComponents>(
      (acc, { component, ...info }) => ({
        ...acc,
        [info.name]: {
          component: useTarget({
            vue: wrapComponentRef(component),
            default: component,
          }),
          ...serializeIncludingFunctions(info),
        },
      }),
      {}
    ),
  });

  const [khulnasoftContextSignal, setKhulnasoftContextSignal] =
    useState<KhulnasoftContextInterface>(
      {
        content: getContentInitialValue({
          content: useTarget({
            /**
             * Temporary workaround until https://github.com/KhulnasoftIO/qwik/pull/5013 is merged.
             */
            qwik: JSON.parse(JSON.stringify(props.content || {})),
            default: props.content,
          }),
          data: props.data,
        }),
        localState: undefined,
        rootState: getRootStateInitialValue({
          content: props.content,
          data: props.data,
          locale: props.locale,
        }),
        rootSetState: useTarget({
          qwik: undefined,
          rsc: undefined,
          default: state.contentSetState,
        }),
        context: props.context || {},
        canTrack: props.canTrack,
        apiKey: props.apiKey,
        apiVersion: props.apiVersion,
        componentInfos: [
          ...getDefaultRegisteredComponents(),
          ...(props.customComponents || []),
        ].reduce<Dictionary<ComponentInfo>>(
          (acc, { component: _, ...info }) => ({
            ...acc,
            [info.name]: serializeIncludingFunctions(info),
          }),
          {}
        ),
        inheritedStyles: {},
        BlocksWrapper: useTarget({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          reactNative: props.blocksWrapper || ScrollView,
          angular: props.blocksWrapper || DynamicDiv,
          default: props.blocksWrapper || 'div',
        }),
        BlocksWrapperProps: props.blocksWrapperProps || {},
        nonce: props.nonce || '',
        model: props.model,
      },
      { reactive: true }
    );

  setContext(ComponentsContext, {
    registeredComponents: state.registeredComponents,
  });

  onInit(() => {
    if (!props.apiKey) {
      logger.error(
        'No API key provided to `Content` component. This can cause issues. Please provide an API key using the `apiKey` prop.'
      );
    }

    // run any dynamic JS code attached to content
    const jsCode = khulnasoftContextSignal.value.content?.data?.jsCode;

    if (jsCode) {
      evaluate({
        code: jsCode,
        context: props.context || {},
        localState: undefined,
        rootState: khulnasoftContextSignal.value.rootState,
        rootSetState: (newState) => {
          useTarget({
            vue: () => {
              khulnasoftContextSignal.value.rootState = newState;
            },
            solid: () => {
              khulnasoftContextSignal.value.rootState = newState;
            },
            react: () => {
              Object.assign(khulnasoftContextSignal.value.rootState, newState);
            },
            reactNative: () => {
              khulnasoftContextSignal.value.rootState = newState;
            },
            rsc: () => {
              khulnasoftContextSignal.value.rootState = newState;
            },
            default: () => {
              khulnasoftContextSignal.value.rootSetState?.(newState);
            },
          });
        },
        isExpression: false,
      });
    }
  });

  return (
    <EnableEditor
      apiHost={props.apiHost}
      nonce={props.nonce}
      content={props.content}
      data={props.data}
      model={props.model}
      context={props.context}
      apiKey={props.apiKey}
      canTrack={props.canTrack}
      locale={props.locale}
      enrich={props.enrich}
      showContent={props.showContent}
      khulnasoftContextSignal={khulnasoftContextSignal}
      contentWrapper={props.contentWrapper}
      contentWrapperProps={props.contentWrapperProps}
      trustedHosts={props.trustedHosts}
      isNestedRender={props.isNestedRender}
      {...useTarget({
        // eslint-disable-next-line object-shorthand
        react: { setKhulnasoftContextSignal: setKhulnasoftContextSignal },
        reactNative: {
          // eslint-disable-next-line object-shorthand
          setKhulnasoftContextSignal: setKhulnasoftContextSignal,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          strictStyleMode: props.strictStyleMode,
        },
        // eslint-disable-next-line object-shorthand
        solid: { setKhulnasoftContextSignal: setKhulnasoftContextSignal },
        default: {},
      })}
    >
      <Show when={props.isSsrAbTest}>
        <InlinedScript
          scriptStr={state.scriptStr}
          id="khulnasoftio-variant-visibility"
          nonce={props.nonce || ''}
        />
      </Show>
      <Show when={TARGET !== 'reactNative'}>
        <ContentStyles
          nonce={props.nonce || ''}
          isNestedRender={props.isNestedRender}
          contentId={khulnasoftContextSignal.value.content?.id}
          cssCode={khulnasoftContextSignal.value.content?.data?.cssCode}
          customFonts={khulnasoftContextSignal.value.content?.data?.customFonts}
        />
      </Show>
      <Blocks
        blocks={khulnasoftContextSignal.value.content?.data?.blocks}
        context={khulnasoftContextSignal}
        registeredComponents={state.registeredComponents}
        linkComponent={props.linkComponent}
      />
    </EnableEditor>
  );
}
