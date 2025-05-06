import type {
  KhulnasoftContextInterface,
  KhulnasoftRenderState,
} from '../../context/types.js';
import { isBrowser } from '../is-browser.js';
import { isEditing } from '../is-editing.js';
import { getUserAttributes } from '../track/helpers.js';

export type EvaluatorArgs = Omit<ExecutorArgs, 'khulnasoft' | 'event'> & {
  event?: Event;
  isExpression?: boolean;
};
export type KhulnasoftGlobals = {
  isEditing: boolean | undefined;
  isBrowser: boolean | undefined;
  isServer: boolean | undefined;
  getUserAttributes: typeof getUserAttributes;
};

export type ExecutorArgs = Pick<
  KhulnasoftContextInterface,
  'localState' | 'context' | 'rootState' | 'rootSetState'
> & {
  code: string;
  khulnasoft: KhulnasoftGlobals;
  event: Event | undefined;
};

export type Executor = (args: ExecutorArgs) => any;

export type FunctionArguments = ReturnType<typeof getFunctionArguments>;

export const getFunctionArguments = ({
  khulnasoft,
  context,
  event,
  state,
}: Pick<ExecutorArgs, 'khulnasoft' | 'context' | 'event'> & {
  state: KhulnasoftRenderState;
}) => {
  return Object.entries({
    state,
    Khulnasoft: khulnasoft, // legacy
    khulnasoft,
    context,
    event,
  });
};

export const getKhulnasoftGlobals = (): KhulnasoftGlobals => ({
  isEditing: isEditing(),
  isBrowser: isBrowser(),
  isServer: !isBrowser(),
  getUserAttributes: () => getUserAttributes(),
});

export const parseCode = (
  code: string,
  { isExpression = true }: Pick<EvaluatorArgs, 'isExpression'>
) => {
  // Be able to handle simple expressions like "state.foo" or "1 + 1"
  // as well as full blocks like "var foo = "bar"; return foo"
  const useReturn =
    // we disable this for cases where we definitely don't want a return
    isExpression &&
    !(
      code.includes(';') ||
      code.includes(' return ') ||
      code.trim().startsWith('return ')
    );
  const useCode = useReturn ? `return (${code});` : code;

  return useCode;
};

export function flattenState({
  rootState,
  localState,
  rootSetState,
}: {
  rootState: Record<string | symbol, any>;
  localState: Record<string | symbol, any> | undefined;
  rootSetState: ((rootState: KhulnasoftRenderState) => void) | undefined;
}): KhulnasoftRenderState {
  return new Proxy(rootState, {
    get: (target, prop) => {
      if (localState && prop in localState) {
        return localState[prop];
      }

      const val = target[prop];
      if (typeof val === 'object' && val !== null) {
        return flattenState({
          rootState: val,
          localState: undefined,
          rootSetState: rootSetState
            ? (subState) => {
                target[prop] = subState;
                rootSetState(target);
              }
            : undefined,
        });
      }

      return val;
    },
    set: (target, prop, value) => {
      if (localState && prop in localState) {
        throw new Error(
          'Writing to local state is not allowed as it is read-only.'
        );
      }

      target[prop] = value;

      rootSetState?.(target);
      return true;
    },
  });
}
