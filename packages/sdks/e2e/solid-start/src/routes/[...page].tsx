import { Content, _processContentResult } from '@khulnasoft.com/sdk-solid';
import { getProps } from '@sdk/tests';
import { Show, createResource } from 'solid-js';
import { Title, useLocation, useRouteData } from 'solid-start';
import KhulnasoftBlockWithClassName from '~/components/KhulnasoftBlockWithClassName';

const khulnasoftBlockWithClassNameCustomComponent = {
  name: 'KhulnasoftBlockWithClassName',
  component: KhulnasoftBlockWithClassName,
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
    khulnasoftContext: true,
    khulnasoftComponents: true,
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

export function routeData() {
  const location = useLocation();
  const [props] = createResource(() => {
    return getProps({ pathname: location.pathname, _processContentResult });
  });

  return { props };
}

export default function App() {
  const { props } = useRouteData<typeof routeData>();

  return (
    <main>
      <Title>Hello World</Title>
      <Show when={props} fallback={<div>Content Not Found</div>}>
        <Content
          {...props()}
          customComponents={[khulnasoftBlockWithClassNameCustomComponent]}
        />
      </Show>
    </main>
  );
}
