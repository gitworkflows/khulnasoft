import { $, component$, useOnDocument } from '@khulnasoft.com/qwik';
import { routeLoader$ } from '@khulnasoft.com/qwik-city';
import {
  Content,
  _processContentResult,
  setClientUserAttributes,
} from '@khulnasoft.com/sdk-qwik';
import { getProps } from '@sdk/tests';
import KhulnasoftBlockWithClassName from '~/components/KhulnasoftBlockWithClassName';
import { Description } from '~/components/Description';
import { Hello } from '~/components/Hello';

const khulnasoftBlockWithClassNameCustomComponent = {
  name: 'KhulnasoftBlockWithClassName',
  component: KhulnasoftBlockWithClassName,
  isRSC: true,
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

const CUSTOM_COMPONENTS = [
  {
    name: 'Hello',
    component: Hello,
    inputs: [],
  },
  {
    name: 'Description',
    component: Description,
    inputs: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Hello',
      },
    ],
  },
];

export const useKhulnasoftContentLoader = routeLoader$(async (event) => {
  const data = await getProps({
    pathname: event.url.pathname,
    _processContentResult,
  });
  if (!data) {
    event.status(404);
  }
  return data;
});

export default component$(() => {
  const contentProps = useKhulnasoftContentLoader();

  useOnDocument(
    'qinit',
    $(() => {
      if (window.location.pathname === '/variant-containers/') {
        setClientUserAttributes({
          device: 'tablet',
        });
      }
    })
  );

  return (
    <>
      {contentProps.value.addTopPadding && (
        <div style={{ marginTop: '2000px' }} class="khulnasoft-margin-element" />
      )}
      {contentProps.value ? (
        <Content
          {...(contentProps.value as any)}
          customComponents={[
            ...CUSTOM_COMPONENTS,
            khulnasoftBlockWithClassNameCustomComponent,
          ]}
        />
      ) : (
        <div>Content Not Found</div>
      )}
    </>
  );
});
