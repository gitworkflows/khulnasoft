import * as React from 'react';
import {
  withKhulnasoft,
  KhulnasoftStore,
  KhulnasoftElement,
  KhulnasoftBlockComponent,
} from '@khulnasoft.com/react';

interface ConditionalTag extends Omit<KhulnasoftElement, 'children'> {
  meta: { renderIf: string };
}

interface WrapperTagProps {
  khulnasoftBlock: KhulnasoftElement;
  conditionalTags: ConditionalTag[];
  khulnasoftState: KhulnasoftStore;
}

function fastClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * WrapperTag represent a set of tags that wrap its children conditionally
 */
export const WrapperTag: React.FC<WrapperTagProps> = ({
  conditionalTags,
  khulnasoftBlock,
  khulnasoftState,
}) => {
  if (khulnasoftState.context?.shopify) {
    const liquid = khulnasoftState.context.shopify.liquid;
    const validTags = conditionalTags.filter(
      tag => liquid.render(tag.meta.renderIf, khulnasoftState.state) === 'true'
    );
    const tags = fastClone(validTags) as KhulnasoftElement[];

    if (tags.length === 0) {
      return <KhulnasoftBlockComponent block={khulnasoftBlock} />;
    }

    const head = tags[0];
    let node = head;
    let i = 0;
    while (node) {
      i++;
      if (tags[i]) {
        node.children = [tags[i]];
      }
      // A temporary tag, only needed for debugging reasons, doesn't play a role in rendering
      delete node.component;
      node = tags[i];
    }
    tags[tags.length - 1].children = khulnasoftBlock.children;

    return <KhulnasoftBlockComponent block={head} />;
  }
  return <></>;
};

withKhulnasoft(WrapperTag, {
  name: 'Shopify:WrapperTag',
  canHaveChildren: true,
  noWrap: true,
  hideFromInsertMenu: true,
});
