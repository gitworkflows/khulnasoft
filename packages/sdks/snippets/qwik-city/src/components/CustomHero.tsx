import { component$, Slot } from '@khulnasoft.com/qwik';
import type { RegisteredComponent } from '@khulnasoft.com/sdk-qwik';

export const CustomHero = component$(() => {
  return (
    <>
      <div>This is text from your component</div>
      <Slot />
    </>
  );
});

export const customHeroInfo: RegisteredComponent = {
  component: CustomHero,
  name: 'CustomHero',
  inputs: [],
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
