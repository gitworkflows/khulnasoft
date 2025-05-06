import * as React from 'react';
import { WrapperTag } from '../../react/components/WrapperTag';
import { mockStateWithShopify, text, khulnasoftComponentIdRegex, el } from '../modules/helpers';
import * as reactTestRenderer from 'react-test-renderer';

const conditionalTags = [
  {
    '@type': '@khulnasoft.com/sdk:Element',
    bindings: {},
    id: 'random1',
    component: {
      name: 'Shopify:ConditionalTag',
      options: {
        hash: '98e7248a0def13d04f49695de1adda440178bfce',
        name: 'opencondtag',
        tag: 'a',
      },
    },
    meta: {
      branchIndex: 0,
      originalIndex: 0,
      renderIf: '{% if thing %}true{% endif %}',
    },
    noWrap: true,
    properties: {},
    tagName: 'a',
  },
  {
    '@type': '@khulnasoft.com/sdk:Element',
    id: 'random2',
    bindings: {},
    component: {
      name: 'Shopify:ConditionalTag',
      options: {
        hash: '98e7248a0def13d04f49695de1adda440178bfce',
        name: 'opencondtag',
        tag: 'span',
      },
    },
    meta: {
      branchIndex: 1,
      originalIndex: 0,
      renderIf: '{% if thing %} {% else %}true{% endif %}',
    },
    noWrap: true,
    properties: {
      class: 'inelese',
    },
    tagName: 'span',
  },
] as any;

describe('Condition', () => {
  it('renders snapshot correctly', () => {
    const truthy = JSON.stringify(
      reactTestRenderer
        .create(
          <WrapperTag
            khulnasoftBlock={el({ children: [text('Should be a under a link')] })}
            conditionalTags={conditionalTags}
            khulnasoftState={mockStateWithShopify({ thing: true })}
          />
        )
        .toJSON()
    ).replace(khulnasoftComponentIdRegex, '');

    const falsy = JSON.stringify(
      reactTestRenderer
        .create(
          <WrapperTag
            khulnasoftBlock={el({ children: [text('Should be under a  span')] })}
            conditionalTags={conditionalTags}
            khulnasoftState={mockStateWithShopify({ thing: false })}
          />
        )
        .toJSON()
    ).replace(khulnasoftComponentIdRegex, '');

    expect({ truthy, falsy }).toMatchSnapshot();
  });
});
