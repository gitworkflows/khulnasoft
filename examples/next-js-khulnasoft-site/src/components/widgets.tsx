import { Khulnasoft } from '@khulnasoft.com/react';
import dynamic from 'next/dynamic';
import { carouselConfig } from '@khulnasoft.com/widgets/dist/lib/components/Carousel.config';
import { tabsConfig } from '@khulnasoft.com/widgets/dist/lib/components/Tabs.config';
import { accordionConfig } from '@khulnasoft.com/widgets/dist/lib/components/Accordion.config';
import { masonryConfig } from '@khulnasoft.com/widgets/dist/lib/components/Masonry.config';
import { codeBlockConfig } from './code-block.config';
import { docsSearchConfig } from './docs-search.config';
import { materialTableConfig } from './material-table.config';
import { tooltipConfig } from './tooltip.config';
import { materialTabsConfig } from './material-tabs.config';
import { codeSnippetsConfig } from './code-snippets.config';

Khulnasoft.registerComponent(
  dynamic(() =>
    import('./code-block').then((res) => res.CodeBlockComponent as any),
  ),
  codeBlockConfig,
);
Khulnasoft.registerComponent(
  dynamic(() =>
    import('./code-snippets').then((res) => res.CodeSnippets as any),
  ),
  codeSnippetsConfig,
);
Khulnasoft.registerComponent(
  dynamic(() => import('./docs-search').then((res) => res.DocsSearch as any)),
  docsSearchConfig,
);
Khulnasoft.registerComponent(
  dynamic(() =>
    import('./material-table').then((res) => res.MaterialTableComponent as any),
  ),
  materialTableConfig,
);
Khulnasoft.registerComponent(
  dynamic(() =>
    import('./material-tabs').then((res) => res.MaterialTabs as any),
  ),
  materialTabsConfig,
);

Khulnasoft.registerComponent(
  dynamic(() => import('./tooltip').then((res) => res.Tooltip as any)),
  tooltipConfig as any,
);

Khulnasoft.registerComponent(
  dynamic(() =>
    import('@khulnasoft.com/widgets/dist/lib/components/Carousel').then(
      (mod) => mod.CarouselComponent,
    ),
  ),
  carouselConfig,
);
Khulnasoft.registerComponent(
  dynamic(() =>
    import('@khulnasoft.com/widgets/dist/lib/components/Tabs').then(
      (mod) => mod.TabsComponent,
    ),
  ),
  tabsConfig,
);
Khulnasoft.registerComponent(
  dynamic(() =>
    import('@khulnasoft.com/widgets/dist/lib/components/Accordion').then(
      (mod) => mod.AccordionComponent,
    ),
  ),
  accordionConfig,
);
Khulnasoft.registerComponent(
  dynamic(() =>
    import('@khulnasoft.com/widgets/dist/lib/components/Masonry').then(
      (mod) => mod.MasonryComponent,
    ),
  ),
  masonryConfig,
);
