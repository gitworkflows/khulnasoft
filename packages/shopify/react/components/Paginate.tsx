import {
  KhulnasoftStore,
  withKhulnasoft,
  KhulnasoftStoreContext,
  KhulnasoftBlockComponent,
  KhulnasoftElement,
} from '@khulnasoft.com/react';
import * as React from 'react';

interface AssignBlockProps {
  expression?: string;
  limit?: string;
  khulnasoftState?: KhulnasoftStore;
  khulnasoftBlock?: KhulnasoftElement;
}

export function PaginateBlock(props: AssignBlockProps) {
  const defaultPaginationLimit = 15;
  const { expression, khulnasoftState, limit } = props;
  let paginate: any = {};

  if (
    expression &&
    khulnasoftState?.context?.shopify &&
    khulnasoftState.state.collection?.products?.length
  ) {
    const totalProducts = khulnasoftState.state.collection.products_count;
    const itemLimit =
      khulnasoftState.context.shopify.liquid.get(limit, khulnasoftState.state) || defaultPaginationLimit;

    let currentPage = 1;
    if (khulnasoftState.state.location.query.page) {
      // this is undefined, should probably add support to query params on location
      currentPage = parseInt(khulnasoftState.state.location.query.page, 10) || currentPage;
    } else if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      currentPage = parseInt(urlParams.get('page') || '1', 10);
    }

    paginate = {
      current_page: currentPage,
      current_offset: currentPage * itemLimit,
      items: khulnasoftState.state.collection.products.length,
      parts: [],
      next: {},
      previous: {},
      page_size: itemLimit,
      pages: Math.ceil(totalProducts / itemLimit),
      expression: khulnasoftState.context.shopify.liquid.render(expression, khulnasoftState.state),
    };

    if (currentPage < paginate.pages) {
      paginate.next.url = `?page=${currentPage + 1}`;
    }

    if (currentPage > 1) {
      paginate.previous.url = `?page=${currentPage - 1}`;
    }
  }

  return (
    <KhulnasoftStoreContext.Consumer>
      {store => (
        <KhulnasoftStoreContext.Provider
          value={{
            ...store,
            state: {
              ...store.state,
              paginate,
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
}

withKhulnasoft(PaginateBlock, {
  name: 'Shopify:Paginate',
  hideFromInsertMenu: true,
  noWrap: true,
  inputs: [
    {
      name: 'expression',
      type: 'javascript',
    },
  ],
});
