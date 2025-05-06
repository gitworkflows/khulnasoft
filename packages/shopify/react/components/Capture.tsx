import { KhulnasoftStore, onChange, withKhulnasoft } from '@khulnasoft.com/react';
import * as React from 'react';
import { CaptureBlockProps } from '../interfaces/component-props';

export class CaptureBlock extends React.Component<CaptureBlockProps> {
  ran = false;
  constructor(props: CaptureBlockProps) {
    super(props);
  }

  run() {
    const { expression, variableName, khulnasoftState } = this.props;

    if (expression && khulnasoftState?.context?.shopify) {
      onChange.target(khulnasoftState.state)[variableName] =
        khulnasoftState.context.shopify.liquid.render(expression, khulnasoftState.state);

      this.ran = true;
      return true;
    }

    return false;
  }

  render() {
    this.run();
    return null;
  }
}

withKhulnasoft(CaptureBlock, {
  name: 'Shopify:Capture',
  hideFromInsertMenu: true,
  noWrap: true,
  inputs: [
    {
      name: 'expression',
      type: 'javascript',
    },
  ],
});
