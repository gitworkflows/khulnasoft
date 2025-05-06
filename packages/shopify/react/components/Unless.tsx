import khulnasoft, {
  Khulnasoft,
  KhulnasoftBlockComponent,
  stringToFunction,
  withKhulnasoft,
} from '@khulnasoft.com/react';
import * as React from 'react';
import { UnlessBlockProps } from '../interfaces/component-props';

export class UnlessBlock extends React.Component<UnlessBlockProps> {
  private getMatchingBlocks() {
    const { expression, unlessBlocks, elseBlocks } = this.props;
    if (!expression) {
      return unlessBlocks;
    }
    const fn = stringToFunction(expression);
    const result = fn(
      this.props.khulnasoftState && this.props.khulnasoftState.state,
      null,
      this.props.khulnasoftBlock,
      khulnasoft,
      null,
      this.props.khulnasoftState!.update,
      Khulnasoft,
      this.props.khulnasoftState?.context
    );
    return result ? elseBlocks : unlessBlocks;
  }

  render() {
    const blocks = this.getMatchingBlocks();
    if (!blocks) {
      return null;
    }

    return blocks.map(block => <KhulnasoftBlockComponent key={block.id} block={block} />);
  }
}

const defaultBlock = {
  '@type': '@khulnasoft.com/sdk:Element',
  responsiveStyles: {
    large: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flexShrink: '0',
      position: 'relative',
      marginTop: '30px',
      textAlign: 'center',
      lineHeight: 'normal',
      height: 'auto',
    },
  },
  component: {
    name: 'Text',
    options: {
      text: '<p>Enter some text...</p>',
    },
  },
};

withKhulnasoft(UnlessBlock, {
  name: 'Shopify:Unless',
  hideFromInsertMenu: true,
  noWrap: true,
  inputs: [
    {
      name: 'expression',
      type: 'javascript',
    },
    {
      name: 'unlessBlocks',
      type: 'array',
      hideFromUI: true,
      defaultValue: [defaultBlock],
    },
    {
      name: 'elseBlocks',
      type: 'array',
      hideFromUI: true,
      defaultValue: [defaultBlock],
    },
  ],
});
