import type { RegisteredComponent } from '@khulnasoft.com/sdk-vue';
import CustomHero from './CustomHero.vue';

const CustomHeroInfo: RegisteredComponent = {
  component: CustomHero,
  name: 'CustomHero',
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

export default CustomHeroInfo;
