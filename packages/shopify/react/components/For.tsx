import {
  KhulnasoftStore,
  withKhulnasoft,
  KhulnasoftStoreContext,
  KhulnasoftBlockComponent,
  KhulnasoftElement,
  Khulnasoft,
} from '@khulnasoft.com/react';
import React, { useState } from 'react';

interface ForBlockProps {
  repeat: {
    itemName: string;
    collection: string;
  };
  khulnasoftState?: KhulnasoftStore;
  khulnasoftBlock?: KhulnasoftElement;
}

export function ForBlock(props: ForBlockProps) {
  let arrayItems: any[] = [];
  const { repeat, khulnasoftState } = props;

  const collectionPath = repeat.collection;
  const collectionName = (collectionPath || '').trim().split('(')[0].trim().split('.').slice(-1)[0];

  const itemName = repeat.itemName || (collectionName ? collectionName + 'Item' : 'item');

  if (itemName && collectionName && khulnasoftState && Khulnasoft.isBrowser) {
    if (khulnasoftState.context.shopify) {
      const renderedItems = khulnasoftState.context.shopify.liquid.get(
        collectionPath,
        khulnasoftState.state
      );

      if (Array.isArray(renderedItems)) {
        arrayItems = renderedItems;
      }
    }
  }

  return arrayItems?.map((item, index) => {
    const scopedState: any = {
      forloop: {
        index0: index,
        index: index + 1,
        first: index === 0,
        last: index === arrayItems.length - 1,
        length: arrayItems.length,
        rindex: arrayItems.length - index,
        rindex0: arrayItems.length - index - 1,
      },
    };

    // add the itemName (ie "product") to the state so the children can access
    scopedState[itemName] = item;

    return (
      <KhulnasoftStoreContext.Consumer key={index}>
        {store => (
          <KhulnasoftStoreContext.Provider
            value={{
              ...store,
              state: {
                ...store.state,
                ...scopedState,
              },
            }}
          >
            {props.khulnasoftBlock?.children?.map(item => (
              <KhulnasoftBlockComponent block={item} key={item.id} />
            ))}
          </KhulnasoftStoreContext.Provider>
        )}
      </KhulnasoftStoreContext.Consumer>
    );
  });
}

withKhulnasoft(ForBlock, {
  name: 'Shopify:For',
  hideFromInsertMenu: true,
  noWrap: true,
  inputs: [
    {
      name: 'expression',
      type: 'javascript',
    },
  ],
});
