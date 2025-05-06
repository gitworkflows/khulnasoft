import React from 'react';
import { KhulnasoftElement } from '@khulnasoft.com/sdk';
import { StateProvider, withKhulnasoft } from '@khulnasoft.com/react';

interface ThemeProviderProps {
  khulnasoftBlock: KhulnasoftElement;
  state: any;
}

const ThemeProviderComponent: React.FC<ThemeProviderProps> = props => <StateProvider {...props} />;

export const ThemeProvider = withKhulnasoft(ThemeProviderComponent, {
  name: 'Shopify:ThemeProvider',
  canHaveChildren: true,
  static: true,
  hideFromInsertMenu: true,
});
