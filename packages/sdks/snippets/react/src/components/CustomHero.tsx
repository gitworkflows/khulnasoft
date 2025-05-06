import { RegisteredComponent } from '@khulnasoft.com/sdk-react';
import { ReactNode } from 'react';

interface CustomHeroProps {
  children: ReactNode;
}

const CustomHero = (props: CustomHeroProps) => {
  return (
    <>
      <div>This is text from your component</div>

      {props.children}
    </>
  );
};

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
