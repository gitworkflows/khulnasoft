import khulnasoft, {
  Khulnasoft,
  KhulnasoftBlockComponent,
  KhulnasoftElement,
  KhulnasoftStore,
  stringToFunction,
  withKhulnasoft,
} from '@khulnasoft.com/react';
import * as React from 'react';
import { ConditionBlockProps } from '../interfaces/component-props';

export class ConditionBlock extends React.Component<ConditionBlockProps> {
  private getMatchingBranch(branches = this.props.branches) {
    if (!(branches && branches.length)) {
      return null;
    }

    for (let i = 0; i < branches.length; i++) {
      const branch = branches[i];
      const isLast = i === branches.length - 1;
      if (isLast && !branch.expression) {
        return { index: i, blocks: branch.blocks };
      }
      const fn = stringToFunction(branch.expression || '');
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
      if (result) {
        return { index: i, blocks: branch.blocks };
      }
    }
    return null;
  }

  render() {
    const result = this.getMatchingBranch();
    if (!result) {
      return null;
    }

    return result.blocks.map(block => <KhulnasoftBlockComponent key={block.id} block={block} />);
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

withKhulnasoft(ConditionBlock, {
  name: 'Shopify:Condition',
  hideFromInsertMenu: true,
  noWrap: true,
  inputs: [
    {
      name: 'branches',
      type: 'array',
      subFields: [
        {
          name: 'expression',
          type: 'javascript',
        },
        {
          name: 'blocks',
          type: 'array',
          hideFromUI: true,
          defaultValue: [defaultBlock],
        },
      ],
    },
  ],
});
