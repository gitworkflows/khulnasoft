import type { RegisteredComponent } from '@khulnasoft.com/sdk-svelte';
import CustomHero from './CustomHero.svelte';

export const customHeroInfo: RegisteredComponent = {
  component: CustomHero,
  name: 'CustomHero', // you can change this to anything you want
  canHaveChildren: true,
  defaultChildren: [
    {
      '@type': '@khulnasoft.com/sdk:Element',
      component: {
        name: 'Text',
        options: {
          text: 'This is Khulnasoft text',
        },
      },
    },
  ],
};
