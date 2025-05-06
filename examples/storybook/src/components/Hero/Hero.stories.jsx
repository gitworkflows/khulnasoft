import React from 'react';
import { Hero } from './Hero';
import { HeroKhulnasoftConfig } from './Hero.khulnasoft';
import { getDefaultProps } from '@khulnasoft.com/storybook';
import Typography from '@material-ui/core/Typography';

const props = getDefaultProps(HeroKhulnasoftConfig);

export default {
  title: 'Hero',
  component: Hero,
  parameters: {
    khulnasoft: {
      config: HeroKhulnasoftConfig,
    },
  },
};

export const DefaultHero = () => (
  <div>
    <Typography align="center" variant="subtitle1">
      Double click to edit
    </Typography>
    <Hero {...props}></Hero>
  </div>
);
