import React from 'react';
import { ProductsList } from './ProductsList';
import { ProductsListKhulnasoftConfig } from './ProductsList.khulnasoft';
import { getDefaultProps } from '@khulnasoft.com/storybook';

const props = getDefaultProps(ProductsListKhulnasoftConfig);

export default {
  title: 'Products List',
  component: ProductsList,
  parameters: {
    khulnasoft: {
      config: ProductsListKhulnasoftConfig,
    },
  },
};

export const DefaultProductsList = () => <ProductsList {...props}></ProductsList>;
