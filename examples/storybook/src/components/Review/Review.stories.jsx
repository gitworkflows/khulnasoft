import React from 'react';
import { Review } from './Review';
import { ReviewKhulnasoftConfig } from './Review.khulnasoft';
import { getDefaultProps } from '@khulnasoft.com/storybook';

const props = getDefaultProps(ReviewKhulnasoftConfig);

export default {
  title: 'Review',
  component: Review,
  parameters: {
    khulnasoft: {
      config: ReviewKhulnasoftConfig,
    },
  },
};

export const DefaultReview = () => <Review {...props}></Review>;
