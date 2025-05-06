import type { Signal } from '@khulnasoft.com/mitosis';
import type {
  KhulnasoftContextInterface,
  RegisteredComponents,
} from '../../../../context/types.js';
import { getBlockProperties } from '../../../../functions/get-block-properties.js';
import type { KhulnasoftBlock } from '../../../../types/khulnasoft-block.js';
import type { KhulnasoftDataProps } from '../../../../types/khulnasoft-props.js';
import type { InteractiveElementProps } from '../interactive-element.lite.jsx';

type ComponentOptions = KhulnasoftDataProps & {
  [index: string]: any;
  attributes?: {
    [index: string]: any;
  };
};

export interface ComponentProps {
  componentRef: any;
  componentOptions: ComponentOptions;
  blockChildren: KhulnasoftBlock[];
  context: Signal<KhulnasoftContextInterface>;
  registeredComponents: RegisteredComponents;
  linkComponent: any;
  khulnasoftBlock: KhulnasoftBlock;
  includeBlockProps: boolean;
  isInteractive: boolean | undefined;
}

export const getWrapperProps = ({
  componentOptions,
  khulnasoftBlock,
  context,
  componentRef,
  includeBlockProps,
  isInteractive,
  contextValue,
}: Omit<ComponentProps, 'blockChildren' | 'registeredComponents'> & {
  contextValue: KhulnasoftContextInterface;
}) => {
  const wrapperPropsWithAttributes = {
    ...componentOptions,
    /**
     * If `noWrap` is set to `true`, then the block's props/attributes are provided to the
     * component itself directly. Otherwise, they are provided to the wrapper element.
     */
    ...(includeBlockProps
      ? {
          attributes: getBlockProperties({
            block: khulnasoftBlock,
            context: contextValue,
          }),
        }
      : {}),
  };

  const interactiveElementProps: InteractiveElementProps = {
    Wrapper: componentRef,
    block: khulnasoftBlock,
    context,
    wrapperProps: componentOptions,
    includeBlockProps,
  };

  return isInteractive ? interactiveElementProps : wrapperPropsWithAttributes;
};
