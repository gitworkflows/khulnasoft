import CustomHero from '@/components/custom-components/custom-hero/CustomHero.vue';
import type { RegisteredComponent } from '@khulnasoft.com/sdk-vue';

const customHeroInfo: RegisteredComponent = {
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

export default customHeroInfo;
