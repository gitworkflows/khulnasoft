import type { BlocksWrapperProps } from '../components/blocks/blocks-wrapper.lite.jsx';
import type { ApiVersion } from '../types/api-version.js';
import type { KhulnasoftContent } from '../types/khulnasoft-content.js';
import type { ComponentInfo } from '../types/components.js';
import type { Dictionary, Nullable } from '../types/typescript.js';
import type { ComponentReference } from './component-reference-types.js';
import type { ExtraContextTypes } from './extra-context-types.js';

export type RegisteredComponent = ComponentInfo & {
  component: ComponentReference;
};

export type RegisteredComponents = Dictionary<RegisteredComponent>;

export type KhulnasoftRenderState = Record<string, unknown>;

export type KhulnasoftRenderContext = Record<string, unknown>;

export interface KhulnasoftContextInterface
  extends Pick<BlocksWrapperProps, 'BlocksWrapper' | 'BlocksWrapperProps'>,
    ExtraContextTypes {
  content: Nullable<KhulnasoftContent>;
  context: KhulnasoftRenderContext;
  /**
   * The state of the application.
   *
   * NOTE: see `localState` below to understand how it is different from `rootState`.
   */
  rootState: KhulnasoftRenderState;
  /**
   * Some frameworks have a `setState` function which needs to be invoked to notify
   * the framework of state change. (other frameworks don't in which case it is `undefined')
   */
  rootSetState: ((rootState: KhulnasoftRenderState) => void) | undefined;
  /**
   * The local state of the current component. This is different from `rootState` in that
   * it can be a child state created by a repeater containing local state.
   * The `rootState` is where all of the state mutations are actually stored.
   */
  localState: KhulnasoftRenderState | undefined;
  apiKey: string | null;
  apiVersion: ApiVersion | undefined;
  componentInfos: Dictionary<ComponentInfo>;
  // Used to recursively store all CSS coming from a parent that would apply to a Text block
  inheritedStyles: Record<string, unknown>;
  nonce: string;
  model: string;
  canTrack?: boolean;
}
