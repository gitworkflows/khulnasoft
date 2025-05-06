import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { khulnasoft, Khulnasoft, withChildren } from '@khulnasoft.com/react';
import { Header } from '../components/Header';
import { ShoesViewer } from '../components/ShoesViewer';
import { SourceCodeLink } from '../components/SourceCodeLink';

// Initialize khulnasoft with your apiKey
khulnasoft.init('YOUR_PUBLIC_KEY');

// Register Header component so it's available in the drag-and-drop tool
Khulnasoft.registerComponent(Header, {
  name: 'Header',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'subtitle',
      type: 'string',
    },
  ],
});

// Register ModelView component as dragable component in the khulnasoft editor
Khulnasoft.registerComponent(ShoesViewer, {
  name: 'Shoes',
  inputs: [
    {
      name: 'nuShoes',
      type: 'number',
      friendlyName: 'Number of shoes',
      defaultValue: 100,
    },
    {
      name: 'ambientLight',
      type: 'number',
      friendlyName: 'Ambient light intensity',
      defaultValue: 0.5,
    },
  ],
});

// Register ModelView component as dragable component in the khulnasoft editor
Khulnasoft.registerComponent(withChildren(SourceCodeLink), {
  name: 'SourceCodeLink',
  inputs: [
    {
      name: 'fileName',
      type: 'string',
      required: true,
    },
    {
      name: 'line',
      type: 'number',
    },
    {
      name: 'column',
      type: 'number',
    },
  ],
  hideFromInsertMenu: true,
  canHaveChildren: true,
  defaultChildren: [
    {
      '@type': '@khulnasoft.com/sdk:Element',
      component: { name: 'Text', options: { text: 'Open source code' } },
    },
  ],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
