import { Khulnasoft } from '@khulnasoft.com/react';

import { CarouselComponent } from './components/Carousel';
import { TabsComponent } from './components/Tabs';
import { AccordionComponent } from './components/Accordion';
import { MasonryComponent } from './components/Masonry';
import { carouselConfig } from './components/Carousel.config';
import { tabsConfig } from './components/Tabs.config';
import { accordionConfig } from './components/Accordion.config';
import { masonryConfig } from './components/Masonry.config';

Khulnasoft.registerComponent(CarouselComponent, carouselConfig);
Khulnasoft.registerComponent(TabsComponent, tabsConfig);
Khulnasoft.registerComponent(AccordionComponent, accordionConfig);
Khulnasoft.registerComponent(MasonryComponent, masonryConfig);
