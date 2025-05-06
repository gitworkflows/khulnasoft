import React from 'react';
import { KhulnasoftElement } from '@khulnasoft.com/sdk';
import { StateProvider, withKhulnasoft } from '@khulnasoft.com/react';

interface StateProviderProps {
  khulnasoftBlock: KhulnasoftElement;
  state: any;
  schema: any;
}

const ShopifySectionComponent: React.FC<StateProviderProps> = props => {
  const { schema, ...stateProviderProps } = props;
  return (
    <div
      id={`shopify-section-${schema.class?.replace('-section', '')}`}
      className={`shopify-section ${schema.class}`}
    >
      <StateProvider {...stateProviderProps} />
    </div>
  );
};

export const ShopifySection = withKhulnasoft(ShopifySectionComponent, {
  name: 'Shopify:Section',
  canHaveChildren: true,
  static: true,
  hideFromInsertMenu: true,
});
