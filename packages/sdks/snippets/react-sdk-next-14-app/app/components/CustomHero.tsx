// app/components/CustomHero.tsx
'use client';

import type { RegisteredComponent } from '@khulnasoft.com/sdk-react';
import type { PropsWithChildren } from 'react';

const CustomHero = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div>This is text from your component</div>
      {children}
    </>
  );
};

export const customHeroInfo: RegisteredComponent = {
  name: 'CustomHero',
  component: CustomHero,
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
