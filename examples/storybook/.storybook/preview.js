import { addParameters, addDecorator } from '@storybook/react';
import { KhulnasoftComponent } from '@khulnasoft.com/react';
import { khulnasoftDecorator } from '@khulnasoft.com/storybook';
import '../src/khulnasoft-settings';

addDecorator(khulnasoftDecorator);

addParameters({
  khulnasoft: {
    component: KhulnasoftComponent,
    navigateOnDblClick: true,
  },
});
