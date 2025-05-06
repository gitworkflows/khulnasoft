import React from 'react';
import { ReviewsSlider } from './ReviewsSlider';
import { ReviewsSliderKhulnasoftConfig } from './ReviewsSlider.khulnasoft';
import { getDefaultProps } from '@khulnasoft.com/storybook';
const props = getDefaultProps(ReviewsSliderKhulnasoftConfig);

export default {
  title: 'Reviews Slider',
  component: ReviewsSlider,
  parameters: {
    khulnasoft: {
      config: ReviewsSliderKhulnasoftConfig,
    },
  },
};

export const DefaultReviewsSlider = () => <ReviewsSlider {...props}></ReviewsSlider>;
