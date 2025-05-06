import type { Component } from 'solid-js';
import { createResource, Show } from 'solid-js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { _processContentResult, Content } from '@khulnasoft.com/sdk-solid';
import { getProps } from '@sdk/tests';
import KhulnasoftBlockWithClassName from './components/KhulnasoftBlockWithClassName';

const khulnasoftBlockWithClassNameCustomComponent = {
  name: 'KhulnasoftBlockWithClassName',
  component: KhulnasoftBlockWithClassName,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
  },
  inputs: [
    {
      name: 'content',
      type: 'uiBlocks',
      defaultValue: [
        {
          '@type': '@khulnasoft.com/sdk:Element',
          '@version': 2,
          id: 'khulnasoft-c6e179528dee4e62b337cf3f85d6496f',
          component: {
            name: 'Text',
            options: {
              text: 'Enter some text...',
            },
          },
          responsiveStyles: {
            large: {
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flexShrink: '0',
              boxSizing: 'border-box',
              marginTop: '20px',
              lineHeight: 'normal',
              height: 'auto',
            },
          },
        },
      ],
    },
  ],
};

const App: Component = () => {
  const [props] = createResource(() => getProps({ _processContentResult }));

  return (
    <Show
      when={!props.loading && !props.error}
      fallback={<div>Content Not Found</div>}
    >
      {() => {
        const propsForContent = props();
        propsForContent.customComponents = [
          khulnasoftBlockWithClassNameCustomComponent,
        ];
        return <Content {...propsForContent} />;
      }}
    </Show>
  );
};

export default App;
