import { KhulnasoftStore, onChange, withKhulnasoft } from '@khulnasoft.com/react';
import * as React from 'react';
import { AssignBlockProps } from '../interfaces/component-props';

export class AssignBlock extends React.Component<AssignBlockProps> {
  ran = false;

  constructor(props: AssignBlockProps) {
    super(props);
  }

  run() {
    const { expression, khulnasoftState } = this.props;

    if (expression && khulnasoftState) {
      if (khulnasoftState.context.shopify) {
        khulnasoftState.context.shopify.liquid.assign(expression, onChange.target(khulnasoftState.state));
        this.ran = true;
        return true;
      }
    }
    return false;
  }

  render() {
    this.run();
    return null;
  }
}

withKhulnasoft(AssignBlock, {
  name: 'Shopify:Assign',
  hideFromInsertMenu: true,
  noWrap: true,
  inputs: [
    {
      name: 'expression',
      type: 'javascript',
      // TODO: type: 'code', language: 'javascript'
    },
  ],
});
