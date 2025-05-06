import React from 'react';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { KhulnasoftComponent } from '@khulnasoft.com/react';

export function Collection() {
  return (
    <>
      <KhulnasoftComponent model="collection-hero" />
      <ProductsList />
    </>
  );
}
