'use client';
import React from 'react';
import { KhulnasoftElement } from '@khulnasoft.com/sdk';
import { KhulnasoftBlock } from '../components/khulnasoft-block.component';

/**
 * Higher order component for passing Khulnasoft.com styles and attributes directly
 * to the component child without wrapping
 *
 * Useful when you need styles etc applied directly to the component without a
 * wrapping element (e.g. div), and you are already forwarding all props and attributes
 * (e.g. <YourComponent {...props} />)
 *
 * 👉 Important: make sure you always add props.className,
 * even if you supply a className too
 *
 * @example
 * ```tsx
 *
 *    const MyButton = props => <Button
 *      {...props}
 *      className={'my-button ' + (props.className || '')}>
 *      Hello there!
 *    </Button>
 *
 *    const ButtonWithKhulnasoftChildren = noWrap(MyButton)
 *
 *    Khulnasoft.registerComponent(ButtonWithKhulnasoftChildren, {
 *      name: 'MyButton',
 *    })
 * ```
 */
export const noWrap = <P extends object>(Component: React.ComponentType<P>) => {
  const HOC = React.forwardRef((props: React.PropsWithChildren<P> & { attributes?: any }, ref) => {
    const finalProps = {
      ...props,
      ...props.attributes,
    };
    // getting type errors due to `@types/react` version mismatches. Can safely ignore.
    // @ts-ignore
    return <Component {...finalProps} ref={ref} />;
  });
  (HOC as any).khulnasoftOptions = {
    noWrap: true,
  };

  return HOC;
};
