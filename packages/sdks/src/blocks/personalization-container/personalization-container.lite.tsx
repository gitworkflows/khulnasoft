import {
  For,
  onMount,
  onUnMount,
  Show,
  useMetadata,
  useRef,
  useStore,
  useTarget,
} from '@khulnasoft.com/mitosis';
import Blocks from '../../components/blocks/blocks.lite.jsx';
import InlinedScript from '../../components/inlined-script.lite.jsx';
import InlinedStyles from '../../components/inlined-styles.lite.jsx';
import { TARGET } from '../../constants/target.js';
import { getClassPropName } from '../../functions/get-class-prop-name.js';
import { isEditing } from '../../functions/is-editing.js';
import { isPreviewing } from '../../functions/is-previewing.js';
import { getDefaultCanTrack } from '../../helpers/canTrack.js';
import { userAttributesService } from '../../helpers/user-attributes.js';
import { filterAttrs } from '../helpers.js';
import {
  checkShouldRenderVariants,
  DEFAULT_INDEX,
  filterWithCustomTargeting,
  getBlocksToRender,
  getPersonalizationScript,
  getUpdateVisibilityStylesScript,
  SDKS_REQUIRING_RESET_APPROACH,
} from './helpers.js';
import type { PersonalizationContainerProps } from './personalization-container.types.js';
/**
 * This import is used by the Svelte SDK. Do not remove.
 */
import { setAttrs } from '../helpers.js';

useMetadata({
  rsc: {
    componentType: 'client',
  },
  qwik: {
    setUseStoreFirst: true,
  },
});

export default function PersonalizationContainer(
  props: PersonalizationContainerProps
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const state = useStore({
    userAttributes: userAttributesService.getUserAttributes(),
    scriptStr: getPersonalizationScript(
      props.variants,
      props.khulnasoftBlock?.id || 'none',
      props.khulnasoftContext.value?.rootState?.locale as string | undefined
    ),
    updateVisibilityStylesScript: getUpdateVisibilityStylesScript(
      props.variants,
      props.khulnasoftBlock?.id || 'none',
      props.khulnasoftContext.value?.rootState?.locale as string | undefined
    ),
    unsubscribers: [] as (() => void)[],
    shouldRenderVariants: checkShouldRenderVariants(
      props.variants,
      getDefaultCanTrack(props.khulnasoftContext.value?.canTrack)
    ),
    shouldResetVariants: false,
    get attrs() {
      return {
        ...useTarget({
          vue: filterAttrs(props.attributes, 'v-on:', false),
          svelte: filterAttrs(props.attributes, 'on:', false),
          default: props.attributes,
        }),
        ...useTarget({
          vue: filterAttrs(props.attributes, 'v-on:', true),
          svelte: filterAttrs(props.attributes, 'on:', true),
          default: {},
        }),
        [getClassPropName()]: `khulnasoft-personalization-container ${props.attributes[getClassPropName()] || ''}`,
      };
    },
    get filteredVariants() {
      return (props.variants || []).filter((variant) => {
        return filterWithCustomTargeting(
          {
            ...(props.khulnasoftContext.value?.rootState?.locale
              ? { locale: props.khulnasoftContext.value?.rootState?.locale }
              : {}),
            ...(state.userAttributes as any),
          },
          variant.query,
          variant.startDate,
          variant.endDate
        );
      });
    },
    get blocksToRender() {
      return getBlocksToRender({
        variants: props.variants,
        fallbackBlocks: props.khulnasoftBlock?.children,
        isHydrated: state.shouldResetVariants,
        filteredVariants: state.filteredVariants,
        previewingIndex: props.previewingIndex,
      });
    },
    get hideVariantsStyleString() {
      return (props.variants || [])
        .map(
          (_, index) =>
            `div[data-variant-id="${props.khulnasoftBlock?.id}-${index}"] { display: none !important; } `
        )
        .join('');
    },
  });

  onMount(() => {
    state.shouldResetVariants = true;

    const unsub = userAttributesService.subscribeOnUserAttributesChange(
      (attrs) => {
        state.userAttributes = attrs;
      },
      { fireImmediately: TARGET === 'qwik' }
    );

    if (!(isEditing() || isPreviewing())) {
      const variant = state.filteredVariants[0];

      if (rootRef) {
        rootRef.dispatchEvent(
          new CustomEvent('khulnasoft.variantLoaded', {
            detail: {
              variant: variant || DEFAULT_INDEX,
              content: props.khulnasoftContext.value?.content,
            },
            bubbles: true,
          })
        );

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && rootRef) {
              rootRef.dispatchEvent(
                new CustomEvent('khulnasoft.variantDisplayed', {
                  detail: {
                    variant: variant || DEFAULT_INDEX,
                    content: props.khulnasoftContext.value?.content,
                  },
                  bubbles: true,
                })
              );
            }
          });
        });

        observer.observe(rootRef);
      }
    }

    state.unsubscribers.push(unsub);
  });

  onUnMount(() => {
    state.unsubscribers.forEach((unsub) => unsub());
  });

  return (
    <div ref={rootRef} {...state.attrs}>
      <Show
        when={
          state.shouldResetVariants &&
          SDKS_REQUIRING_RESET_APPROACH.includes(TARGET)
        }
      >
        <Blocks
          blocks={state.blocksToRender.blocks}
          parent={props.khulnasoftBlock?.id}
          path={state.blocksToRender.path}
          context={props.khulnasoftContext}
          registeredComponents={props.khulnasoftComponents}
          BlocksWrapperProps={{
            ...props.khulnasoftContext.value?.BlocksWrapperProps,
            'data-variant-id': `${props.khulnasoftBlock?.id}-${state.blocksToRender.index}`,
          }}
        ></Blocks>
      </Show>
      <Show
        when={
          (!state.shouldResetVariants &&
            SDKS_REQUIRING_RESET_APPROACH.includes(TARGET)) ||
          !SDKS_REQUIRING_RESET_APPROACH.includes(TARGET)
        }
      >
        <Show when={state.shouldRenderVariants}>
          <InlinedStyles
            nonce={props.khulnasoftContext.value?.nonce || ''}
            styles={state.hideVariantsStyleString}
            id={`variants-styles-${props.khulnasoftBlock?.id}`}
          />
          <InlinedScript
            nonce={props.khulnasoftContext.value?.nonce || ''}
            scriptStr={state.updateVisibilityStylesScript}
            id={`variants-visibility-script-${props.khulnasoftBlock?.id}`}
          />
          <For each={props.variants}>
            {(variant, index) => (
              <Blocks
                key={`${props.khulnasoftBlock?.id}-${index}`}
                BlocksWrapperProps={{
                  ...props.khulnasoftContext.value?.BlocksWrapperProps,
                  'aria-hidden': true,
                  hidden: true,
                  'data-variant-id': `${props.khulnasoftBlock?.id}-${index}`,
                }}
                blocks={variant.blocks}
                parent={props.khulnasoftBlock?.id}
                path={`component.options.variants.${index}.blocks`}
                context={props.khulnasoftContext}
                registeredComponents={props.khulnasoftComponents}
              >
                <InlinedScript
                  nonce={props.khulnasoftContext.value?.nonce || ''}
                  scriptStr={state.scriptStr}
                  id={`variants-script-${props.khulnasoftBlock?.id}-${index}`}
                />
              </Blocks>
            )}
          </For>
        </Show>
        <Blocks
          blocks={state.blocksToRender.blocks}
          parent={props.khulnasoftBlock?.id}
          path={state.blocksToRender.path}
          context={props.khulnasoftContext}
          registeredComponents={props.khulnasoftComponents}
          BlocksWrapperProps={{
            ...props.khulnasoftContext.value?.BlocksWrapperProps,
            'data-variant-id': `${props.khulnasoftBlock?.id}-${state.blocksToRender.index}`,
          }}
        >
          <Show when={state.shouldRenderVariants}>
            <InlinedScript
              nonce={props.khulnasoftContext.value?.nonce || ''}
              scriptStr={state.scriptStr}
              id={`variants-script-${props.khulnasoftBlock?.id}-${DEFAULT_INDEX}`}
            />
          </Show>
        </Blocks>
      </Show>
    </div>
  );
}
