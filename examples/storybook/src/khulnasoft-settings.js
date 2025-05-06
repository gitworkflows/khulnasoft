import { Khulnasoft, khulnasoft } from '@khulnasoft.com/react';

// Be sure to import all of your components where you use <KhulnasoftComponent /> so they are
// bundled and accessible
import './components/ProductsList/ProductsList.khulnasoft';
import './components/Hero/Hero.khulnasoft';
import './components/TripleColumns/TripleColumns.khulnasoft';
import './components/DoubleColumns/DoubleColumns.khulnasoft';
import './components/Review/Review.khulnasoft';
import './components/ReviewsSlider/ReviewsSlider.khulnasoft';
import './components/Button/Button.khulnasoft';
import './components/Heading/Heading.khulnasoft';
import './components/HeroWithChildren/HeroWithChildren.khulnasoft';
import './components/DynamicColumns/DynamicColumns.khulnasoft';
import './components/ProductsListWithServerSideData/ProductsListWithServerSideData.khulnasoft';

// Add your public apiKey here
const YOUR_KEY = '7f7bbcf72a1a4d72bac5daa359e7befd';
khulnasoft.init(YOUR_KEY);

// Remove this to allow all built-in components to be used too
const OVERRIDE_INSERT_MENU = false;

if (OVERRIDE_INSERT_MENU) {
  // (optionally) use this to hide all default built-in components and fully manage
  // the insert menu components and sections yourself
  Khulnasoft.register('editor.settings', { customInsertMenu: true });
}

// (optionally) set these to add your own sections of components arranged as you choose.
// this can be used with or without `customInsertMenu` above

Khulnasoft.register('insertMenu', {
  name: 'Simple components',
  items: [
    { name: 'Hero' },
    { name: 'Double Columns' },
    { name: 'Triple Columns' },
    { name: 'Dynamic Columns' },
  ],
});

Khulnasoft.register('insertMenu', {
  name: 'Dynamic components',
  items: [
    { name: 'Hero With Children' },
    { name: 'Products List' },
    { name: 'Reviews Slider' },
    { name: 'Products List SSR' },

    // More advanced
    {
      name: 'Hero With Children Alt',
      item: {
        component: {
          name: 'Hero With Children',
          options: {
            image:
              'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F349738e6805b481ab6c50bda7e24445e',
            height: 400,
          },
        },
        children: [
          // Supply alternate children
          {
            '@type': '@khulnasoft.com/sdk:Element',
            component: {
              name: 'Heading',
              options: {
                text: 'You can edit the contents of this example!',
                type: 'h4',
              },
            },
          },
        ],
      },
    },
  ],
});

Khulnasoft.register('insertMenu', {
  name: 'Blocks',
  items: [
    { name: 'Button' },
    { item: 'Heading', name: 'Heading 1' },

    // More advanced
    {
      name: 'Heading 2',
      // heading alt
      item: {
        '@type': '@khulnasoft.com/sdk:Element',
        component: {
          name: 'Heading',
          options: {
            text: 'I am an h2',
            type: 'h2',
          },
        },
      },
    },
    {
      name: 'Heading 3',
      // heading alt 2
      item: {
        '@type': '@khulnasoft.com/sdk:Element',
        component: {
          name: 'Heading',
          options: {
            text: 'I am am h3',
            type: 'h3',
          },
        },
      },
    },
  ],
});
