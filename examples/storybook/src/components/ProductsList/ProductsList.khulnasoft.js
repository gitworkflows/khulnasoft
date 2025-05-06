import { Khulnasoft } from '@khulnasoft.com/react';
import { ProductsList } from './ProductsList';
export const ProductsListKhulnasoftConfig = {
  name: 'Products List',
  inputs: [
    {
      name: 'url',
      type: 'string',
      advanced: true,
      defaultValue: 'https://api.shopstyle.com/api/v2/products',
    },
    {
      name: 'category',
      type: 'string',
      defaultValue: 'womens-fashion',
      enum: [
        {
          label: 'Women',
          value: 'womens-fashion',
        },
        {
          label: 'Mens',
          value: 'mens-clothes',
        },
        {
          label: 'Kids',
          value: 'kids-and-baby',
        },
        {
          label: 'home',
          value: 'living',
        },
      ],
    },
    {
      name: 'amount',
      type: 'number',
      defaultValue: 20,
    },
    {
      name: 'size',
      type: 'string',
      defaultValue: 'Medium',
      enum: ['Small', 'Medium', 'Large'],
    },
  ],
};

Khulnasoft.registerComponent(ProductsList, ProductsListKhulnasoftConfig);
