import type { Signal } from '@khulnasoft.com/mitosis';
import {
  Show,
  onEvent,
  onInit,
  onMount,
  onUnMount,
  onUpdate,
  setContext,
  useMetadata,
  useRef,
  useState,
  useStore,
  useTarget,
} from '@khulnasoft.com/mitosis';
import khulnasoftContext from '../../../context/khulnasoft.context.lite.js';
import type { KhulnasoftContextInterface } from '../../../context/types.js';
import { evaluate } from '../../../functions/evaluate/index.js';
import { fastClone } from '../../../functions/fast-clone.js';
import { fetchOneEntry } from '../../../functions/get-content/index.js';
import { isBrowser } from '../../../functions/is-browser.js';
import { isEditing } from '../../../functions/is-editing.js';
import { isPreviewing } from '../../../functions/is-previewing.js';
import { logFetch } from '../../../functions/log-fetch.js';
import { createRegisterComponentMessage } from '../../../functions/register-component.js';
import { _track } from '../../../functions/track/index.js';
import { getInteractionPropertiesForEvent } from '../../../functions/track/interaction.js';
import { getDefaultCanTrack } from '../../../helpers/canTrack.js';
import { getCookieSync } from '../../../helpers/cookie.js';
import { postPreviewContent } from '../../../helpers/preview-lru-cache/set.js';
import { createEditorListener } from '../../../helpers/subscribe-to-editor.js';
import { setupBrowserForEditing } from '../../../scripts/init-editing.js';
import type { KhulnasoftContent } from '../../../types/khulnasoft-content.js';
import type { ComponentInfo } from '../../../types/components.js';
import type { Dictionary } from '../../../types/typescript.js';
import { triggerAnimation } from '../../block/animator.js';
import DynamicDiv from '../../dynamic-div.lite.jsx';
import type {
  KhulnasoftComponentStateChange,
  ContentProps,
} from '../content.types.js';
import { needsElementRefDivForEditing } from './enable-editor.helpers.js';
import { getWrapperClassName } from './styles.helpers.js';

useMetadata({
  qwik: {
    hasDeepStore: true,
  },
  elementTag: 'state.ContentWrapper',
});

type KhulnasoftEditorProps = Omit<
  ContentProps,
  | 'customComponents'
  | 'apiVersion'
  | 'isSsrAbTest'
  | 'blocksWrapper'
  | 'blocksWrapperProps'
  | 'linkComponent'
> & {
  khulnasoftContextSignal: Signal<KhulnasoftContextInterface>;
  setKhulnasoftContextSignal?: (signal: any) => any;
  children?: any;
};

export default function EnableEditor(props: KhulnasoftEditorProps) {
  /**
   * This var name is hard-coded in some Mitosis Plugins. Do not change.
   */
  const elementRef = useRef<HTMLDivElement>();
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);
  const state = useStore({
    mergeNewRootState(newData: Dictionary<any>) {
      const combinedState = {
        ...props.khulnasoftContextSignal.value.rootState,
        ...newData,
      };

      if (props.khulnasoftContextSignal.value.rootSetState) {
        props.khulnasoftContextSignal.value.rootSetState?.(combinedState);
      } else {
        props.khulnasoftContextSignal.value.rootState = combinedState;
      }
    },
    mergeNewContent(newContent: KhulnasoftContent) {
      const newContentValue = {
        ...props.khulnasoftContextSignal.value.content,
        ...newContent,
        data: {
          ...props.khulnasoftContextSignal.value.content?.data,
          ...newContent?.data,
        },
        meta: {
          ...props.khulnasoftContextSignal.value.content?.meta,
          ...newContent?.meta,
          breakpoints:
            newContent?.meta?.breakpoints ||
            props.khulnasoftContextSignal.value.content?.meta?.breakpoints,
        },
      };

      useTarget({
        rsc: () => {
          postPreviewContent({
            value: newContentValue,
            key: newContentValue.id!,
            url: window.location.pathname,
          });
        },
        default: () => {
          props.khulnasoftContextSignal.value.content = newContentValue;
        },
      });
    },
    get showContentProps() {
      return props.showContent ? {} : { hidden: true, 'aria-hidden': true };
    },
    ContentWrapper: useTarget({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reactNative: props.contentWrapper || ScrollView,
      angular: props.contentWrapper || DynamicDiv,
      default: props.contentWrapper || 'div',
    }),
    processMessage(event: MessageEvent): void {
      return createEditorListener({
        model: props.model,
        trustedHosts: props.trustedHosts,
        callbacks: {
          configureSdk: (messageContent) => {
            const { breakpoints, contentId } = messageContent;
            if (
              !contentId ||
              contentId !== props.khulnasoftContextSignal.value.content?.id
            ) {
              return;
            }
            if (breakpoints) {
              state.mergeNewContent({ meta: { breakpoints } });
            }
          },
          animation: (animation) => {
            triggerAnimation(animation);
          },
          contentUpdate: (newContent) => {
            state.mergeNewContent(newContent);
          },
          stateUpdate: (newState) => {
            state.mergeNewRootState(newState);
          },
        },
      })(event);
    },
    httpReqsData: {} as { [key: string]: boolean },
    httpReqsPending: {} as { [key: string]: boolean },

    clicked: false,

    onClick(event: any) {
      if (props.khulnasoftContextSignal.value.content) {
        const variationId =
          props.khulnasoftContextSignal.value.content?.testVariationId;
        const contentId = props.khulnasoftContextSignal.value.content?.id;
        _track({
          apiHost: props.apiHost,
          type: 'click',
          canTrack: getDefaultCanTrack(props.canTrack),
          contentId,
          apiKey: props.apiKey,
          variationId: variationId !== contentId ? variationId : undefined,
          ...getInteractionPropertiesForEvent(event),
          unique: !state.clicked,
        });
      }

      if (!state.clicked) {
        state.clicked = true;
      }
    },

    runHttpRequests() {
      const requests: { [key: string]: string } =
        props.khulnasoftContextSignal.value.content?.data?.httpRequests ?? {};

      Object.entries(requests).forEach(([key, url]) => {
        if (!url) return;

        // request already in progress
        if (state.httpReqsPending[key]) return;

        // request already completed, and not in edit mode
        if (state.httpReqsData[key] && !isEditing()) return;

        state.httpReqsPending[key] = true;
        const evaluatedUrl = url.replace(/{{([^}]+)}}/g, (_match, group) =>
          String(
            evaluate({
              code: group,
              context: props.context || {},
              localState: undefined,
              rootState: props.khulnasoftContextSignal.value.rootState,
              rootSetState: props.khulnasoftContextSignal.value.rootSetState,
            })
          )
        );

        logFetch(evaluatedUrl);

        fetch(evaluatedUrl)
          .then((response) => response.json())
          .then((json) => {
            state.mergeNewRootState({ [key]: json });
            state.httpReqsData[key] = true;
          })
          .catch((err) => {
            console.error('error fetching dynamic data', url, err);
          })
          .finally(() => {
            state.httpReqsPending[key] = false;
          });
      });
    },
    emitStateUpdate() {
      if (isEditing()) {
        window.dispatchEvent(
          new CustomEvent<KhulnasoftComponentStateChange>(
            'khulnasoft:component:stateChange',
            {
              detail: {
                state: fastClone(props.khulnasoftContextSignal.value.rootState),
                ref: {
                  name: props.model,
                },
              },
            }
          )
        );
      }
    },
  });

  setContext(khulnasoftContext, props.khulnasoftContextSignal);

  onUpdate(() => {
    useTarget({
      rsc: () => {},
      default: () => {
        if (props.content) {
          state.mergeNewContent(props.content);
        }
      },
    });
  }, [props.content]);

  onUnMount(() => {
    if (isBrowser()) {
      window.removeEventListener('message', state.processMessage);
      window.removeEventListener(
        'khulnasoft:component:stateChangeListenerActivated',
        state.emitStateUpdate
      );
    }
  });

  onEvent(
    'initeditingbldr',
    () => {
      window.addEventListener('message', state.processMessage);

      setupBrowserForEditing({
        ...(props.locale ? { locale: props.locale } : {}),
        ...(props.enrich ? { enrich: props.enrich } : {}),
        ...(props.trustedHosts ? { trustedHosts: props.trustedHosts } : {}),
        modelName: props.model ?? '',
        apiKey: props.apiKey,
      });
      Object.values<ComponentInfo>(
        props.khulnasoftContextSignal.value.componentInfos
      ).forEach((registeredComponent) => {
        if (
          !registeredComponent.models?.length ||
          registeredComponent.models.includes(props.model)
        ) {
          const message = createRegisterComponentMessage(registeredComponent);
          window.parent?.postMessage(message, '*');
        }
      });
      window.addEventListener(
        'khulnasoft:component:stateChangeListenerActivated',
        state.emitStateUpdate
      );
    },
    elementRef,
    true
  );

  onEvent(
    'initpreviewingbldr',
    () => {
      const searchParams = new URL(location.href).searchParams;
      const searchParamPreviewModel = searchParams.get('khulnasoft.preview');
      const searchParamPreviewId = searchParams.get(
        `khulnasoft.overrides.${searchParamPreviewModel}`
      );
      const previewApiKey =
        searchParams.get('apiKey') || searchParams.get('khulnasoft.space');

      /**
       * Make sure that:
       * - the preview model name is the same as the one we're rendering, since there can be multiple models rendered
       *  at the same time, e.g. header/page/footer.
       * - the API key is the same, since we don't want to preview content from other organizations.
       * - if there is content, that the preview ID is the same as that of the one we receive.
       *
       * TO-DO: should we only update the state when there is a change?
       **/
      if (
        searchParamPreviewModel === 'KHULNASOFT_STUDIO' ||
        (searchParamPreviewModel === props.model &&
          previewApiKey === props.apiKey &&
          (!props.content || searchParamPreviewId === props.content.id))
      ) {
        fetchOneEntry({
          model: props.model,
          apiKey: props.apiKey,
          apiVersion: props.khulnasoftContextSignal.value.apiVersion,
          ...(searchParamPreviewModel === 'KHULNASOFT_STUDIO' &&
          props.context?.symbolId
            ? { query: { id: props.context.symbolId } }
            : {}),
        }).then((content) => {
          if (content) {
            state.mergeNewContent(content);
          }
        });
      }
    },
    elementRef,
    true
  );

  /**
   * To initialize previewing and editing, SDKs need to send and receive events
   * to/from visual editor.
   * - in React/hydration frameworks, we just shove all that code into `useEffect(() => {}, [])` (onMount)
   * - in Qwik, we have no hydration step. And we want to avoid eagerly executing code as much as possible
   *
   * Our workaround for Qwik is:
   *
   * - instead of `useVisibleTask$()`, we listen to`useOn('qvisible')` which will have a reference to the root element of the component.
   *   - never use `props.*` or `state.*` inside of the event handler for `'qvisible'`. This guarantees that we are not making the user download a ton of data.
   *   - instead, of you need any data, set it as a data attribute on the root element, and then read those attributes via the element ref (2nd argument of qvisible event handler).
   *   - move heavy editing and previwing logic behind `customEvent` dispatches, guaranteeing that production qwik sdk load time will be perfect (no hydration, no eager code besides tracking impression)
   */
  onMount(() => {
    useTarget({
      qwik: () => {
        if (hasExecuted) return;
      },
    });
    if (isBrowser()) {
      useTarget({
        qwik: () => {
          setHasExecuted(true);
        },
      });
      if (isEditing() && !props.isNestedRender) {
        useTarget({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          solid: () => INJECT_EDITING_HOOK_HERE,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          reactNative: () => INJECT_EDITING_HOOK_HERE,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          react: () => INJECT_EDITING_HOOK_HERE,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          angular: () => INJECT_EDITING_HOOK_HERE,
          default: () => {
            if (elementRef) {
              elementRef.dispatchEvent(new CustomEvent('initeditingbldr'));
            }
          },
        });
      }

      const shouldTrackImpression = useTarget({
        qwik:
          elementRef.attributes.getNamedItem('shouldTrack')?.value === 'true',
        default:
          props.khulnasoftContextSignal.value.content &&
          getDefaultCanTrack(props.canTrack),
      });
      const winningVariantId = getCookieSync({
        name: `khulnasoft.tests.${props.khulnasoftContextSignal.value.content?.id}`,
        canTrack: true,
      });
      const variationId = useTarget({
        qwik: elementRef.attributes.getNamedItem('variationId')?.value,
        default: props.khulnasoftContextSignal.value.content?.testVariationId,
      });

      if (shouldTrackImpression && variationId === winningVariantId) {
        const contentId = useTarget({
          qwik: elementRef.attributes.getNamedItem('contentId')?.value,
          default: props.khulnasoftContextSignal.value.content?.id,
        });
        const apiKeyProp = useTarget({
          qwik: elementRef.attributes.getNamedItem('apiKey')?.value,
          default: props.apiKey,
        });

        _track({
          apiHost: props.apiHost,
          type: 'impression',
          canTrack: true,
          contentId,
          apiKey: apiKeyProp!,
          variationId:
            winningVariantId !== contentId ? winningVariantId : undefined,
        });
      }

      /**
       * Override normal content in preview mode.
       * We ignore this when editing, since the edited content is already being sent from the editor via post messages.
       */
      if (isPreviewing() && !isEditing()) {
        useTarget({
          rsc: () => {},
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          solid: () => INJECT_PREVIEWING_HOOK_HERE,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          reactNative: () => INJECT_PREVIEWING_HOOK_HERE,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          react: () => INJECT_PREVIEWING_HOOK_HERE,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          angular: () => INJECT_PREVIEWING_HOOK_HERE,
          default: () => {
            if (elementRef) {
              elementRef.dispatchEvent(new CustomEvent('initpreviewingbldr'));
            }
          },
        });
      }
    }
  });

  onInit(() => {
    state.runHttpRequests();
    state.emitStateUpdate();
  });

  onUpdate(() => {
    state.emitStateUpdate();
  }, [props.khulnasoftContextSignal.value.rootState]);

  onUpdate(() => {
    if (props.data) {
      state.mergeNewRootState(props.data);
    }
  }, [props.data]);

  onUpdate(() => {
    if (props.locale) {
      state.mergeNewRootState({ locale: props.locale });
    }
  }, [props.locale]);

  return (
    <Show
      when={
        props.khulnasoftContextSignal.value.content ||
        needsElementRefDivForEditing()
      }
    >
      <state.ContentWrapper
        {...useTarget({
          qwik: {
            apiKey: props.apiKey,
            contentId: props.khulnasoftContextSignal.value.content?.id,
            variationId:
              props.khulnasoftContextSignal.value.content?.testVariationId,
            shouldTrack: String(
              props.khulnasoftContextSignal.value.content &&
                getDefaultCanTrack(props.canTrack)
            ),
          },
          default: {},
        })}
        ref={elementRef}
        onClick={(event: any) => state.onClick(event)}
        khulnasoft-content-id={props.khulnasoftContextSignal.value.content?.id}
        khulnasoft-model={props.model}
        className={getWrapperClassName(
          props.content?.testVariationId || props.content?.id
        )}
        // content exists: render div and display: undefined
        // content does not exist but isEditing/isPreviewing: render div and display: 'none'
        // once inline editing kicks in, it will populate the content and re-render, so display style will be removed
        style={{
          display:
            !props.khulnasoftContextSignal.value.content &&
            needsElementRefDivForEditing()
              ? 'none'
              : undefined,
        }}
        {...useTarget({
          reactNative: {
            // currently, we can't set the actual ID here.
            // we don't need it right now, we just need to identify content divs for testing.
            dataSet: { 'khulnasoft-content-id': '' },
          },
          default: {},
        })}
        {...state.showContentProps}
        {...props.contentWrapperProps}
      >
        {props.children}
      </state.ContentWrapper>
    </Show>
  );
}
