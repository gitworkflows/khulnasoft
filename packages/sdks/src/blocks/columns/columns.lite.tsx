import {
  For,
  Show,
  useMetadata,
  useStore,
  useTarget,
} from '@khulnasoft.com/mitosis';
import Blocks from '../../components/blocks/blocks.lite.jsx';
import DynamicDiv from '../../components/dynamic-div.lite.jsx';
import DynamicRenderer from '../../components/dynamic-renderer/dynamic-renderer.lite.jsx';
import InlinedStyles from '../../components/inlined-styles.lite.jsx';
import type { SizeName } from '../../constants/device-sizes.js';
import { getSizesForBreakpoints } from '../../constants/device-sizes.js';
import { TARGET } from '../../constants/target.js';
import { deoptSignal } from '../../functions/deopt.js';
import { getClassPropName } from '../../functions/get-class-prop-name.js';
import { mapStyleObjToStrIfNeeded } from '../../functions/get-style.js';
import type { Dictionary } from '../../types/typescript.js';
import type { Column, ColumnProps } from './columns.types.js';
import { getColumnsClass } from './helpers.js';

type CSSVal = string | number;

useMetadata({
  rsc: {
    componentType: 'server',
  },
  qwik: {
    setUseStoreFirst: true,
  },
});

export default function Columns(props: ColumnProps) {
  const state = useStore({
    get gutterSize() {
      return typeof props.space === 'number' ? props.space || 0 : 20;
    },
    get cols() {
      return props.columns || [];
    },
    get stackAt() {
      return props.stackColumnsAt || 'tablet';
    },
    getTagName(column: Column) {
      return column.link
        ? props.khulnasoftLinkComponent ||
            useTarget({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              reactNative: BaseText,
              default: 'a',
            })
        : useTarget({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            reactNative: View,
            angular: DynamicDiv,
            default: 'div',
          });
    },
    getWidth(index: number) {
      return state.cols[index]?.width || 100 / state.cols.length;
    },
    getColumnCssWidth(index: number) {
      const width = state.getWidth(index);

      const subtractWidth =
        state.gutterSize * (state.cols.length - 1) * (width / 100);

      return `calc(${width}% - ${subtractWidth}px)`;
    },

    getTabletStyle({
      stackedStyle,
      desktopStyle,
    }: {
      stackedStyle: CSSVal;
      desktopStyle: CSSVal;
    }): CSSVal {
      return state.stackAt === 'tablet' ? stackedStyle : desktopStyle;
    },

    getMobileStyle({
      stackedStyle,
      desktopStyle,
    }: {
      stackedStyle: CSSVal;
      desktopStyle: CSSVal;
    }): CSSVal {
      return state.stackAt === 'never' ? desktopStyle : stackedStyle;
    },

    get flexDir(): 'row' | 'column' | 'column-reverse' {
      return props.stackColumnsAt === 'never'
        ? 'row'
        : props.reverseColumnsWhenStacked
          ? 'column-reverse'
          : 'column';
    },

    columnsCssVars(): Dictionary<string> {
      return useTarget({
        reactNative: {
          flexDirection: state.flexDir as 'row' | 'column' | 'column-reverse',
        },
        default: {
          '--flex-dir': state.flexDir,
          '--flex-dir-tablet': state.getTabletStyle({
            stackedStyle: state.flexDir,
            desktopStyle: 'row',
          }),
        } as Dictionary<string>,
      });
    },

    columnCssVars(index: number): Dictionary<string> {
      const gutter = index === 0 ? 0 : state.gutterSize;

      const width = state.getColumnCssWidth(index);
      const gutterPixels = `${gutter}px`;
      const mobileWidth = '100%';
      const mobileMarginLeft = 0;

      const marginLeftKey = useTarget({
        react: 'marginLeft',
        rsc: 'marginLeft',
        default: 'margin-left',
      });

      const sharedStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      };

      return useTarget({
        reactNative: {
          ...sharedStyles,
          marginLeft: props.stackColumnsAt === 'never' ? gutter : 0,
        } as any as Dictionary<string>,
        default: {
          ...sharedStyles,
          width,
          [marginLeftKey]: gutterPixels,
          '--column-width-mobile': state.getMobileStyle({
            stackedStyle: mobileWidth,
            desktopStyle: width,
          }),
          '--column-margin-left-mobile': state.getMobileStyle({
            stackedStyle: mobileMarginLeft,
            desktopStyle: gutterPixels,
          }),
          '--column-width-tablet': state.getTabletStyle({
            stackedStyle: mobileWidth,
            desktopStyle: width,
          }),
          '--column-margin-left-tablet': state.getTabletStyle({
            stackedStyle: mobileMarginLeft,
            desktopStyle: gutterPixels,
          }),
        } as Dictionary<string>,
      });
    },

    getWidthForBreakpointSize(size: SizeName) {
      const breakpointSizes = getSizesForBreakpoints(
        props.khulnasoftContext.value.content?.meta?.breakpoints || {}
      );

      return breakpointSizes[size].max;
    },

    columnsStyles(): string {
      const childColumnDiv = useTarget({
        angular: `.${props.khulnasoftBlock.id}-breakpoints .khulnasoft-column:first-of-type`,
        default: `.${props.khulnasoftBlock.id}-breakpoints > .khulnasoft-column`,
      });
      return `
        @media (max-width: ${state.getWidthForBreakpointSize('medium')}px) {
          .${props.khulnasoftBlock.id}-breakpoints {
            flex-direction: var(--flex-dir-tablet);
            align-items: stretch;
          }

          ${childColumnDiv} {
            width: var(--column-width-tablet) !important;
            margin-left: var(--column-margin-left-tablet) !important;
          }
        }

        @media (max-width: ${state.getWidthForBreakpointSize('small')}px) {
          .${props.khulnasoftBlock.id}-breakpoints {
            flex-direction: var(--flex-dir);
            align-items: stretch;
          }

          ${childColumnDiv} {
            width: var(--column-width-mobile) !important;
            margin-left: var(--column-margin-left-mobile) !important;
          }
        },
      `;
    },

    getAttributes(column: any, index: number) {
      return {
        ...useTarget({
          reactNative: {
            dataSet: { 'khulnasoft-block-name': 'khulnasoft-column' },
          },
          default: {},
        }),
        ...(column.link ? { href: column.link } : {}),
        [getClassPropName()]: 'khulnasoft-column',
        style: mapStyleObjToStrIfNeeded(state.columnCssVars(index)),
      };
    },
  });

  return (
    <div
      class={getColumnsClass(props.khulnasoftBlock?.id)}
      css={{
        display: 'flex',
        lineHeight: 'normal',
        height: '100%',
      }}
      style={state.columnsCssVars()}
      {...useTarget({
        reactNative: {
          dataSet: { 'khulnasoft-block-name': 'khulnasoft-columns' },
        },
        default: {},
      })}
    >
      <Show when={TARGET !== 'reactNative'}>
        {/**
         * Need to use style tag for column and columns style instead of using the
         * respective 'style' or 'css' attributes because the rules now contain
         * "dynamic" media query values based on custom breakpoints.
         * Adding them directly otherwise leads to Mitosis and TS errors.
         */}
        <InlinedStyles
          styles={state.columnsStyles()}
          id="khulnasoftio-columns"
          nonce={props.khulnasoftContext.value.nonce}
        />
      </Show>

      <For each={props.columns}>
        {(column, index) => (
          <DynamicRenderer
            key={index}
            TagName={state.getTagName(column)}
            actionAttributes={{}}
            attributes={state.getAttributes(column, index)}
          >
            <Blocks
              blocks={useTarget({
                /**
                 * Workaround until https://github.com/KhulnasoftIO/qwik/issues/5017 is fixed.
                 */
                qwik: deoptSignal(column.blocks),
                default: column.blocks,
              })}
              path={`columns.${index}.blocks`}
              parent={props.khulnasoftBlock.id}
              styleProp={useTarget({
                solid: {
                  'flex-grow': '1',
                },
                reactNative: {
                  flexGrow: 1,
                },
                default: {
                  flexGrow: '1',
                },
              })}
              context={props.khulnasoftContext}
              registeredComponents={props.khulnasoftComponents}
              linkComponent={props.khulnasoftLinkComponent}
            />
          </DynamicRenderer>
        )}
      </For>
    </div>
  );
}
