import { render } from '@testing-library/react';
import * as React from 'react';
import { UnlessBlock } from '../../react/components/Unless';
import { mockState, text, khulnasoftComponentIdRegex } from '../modules/helpers';
import * as reactTestRenderer from 'react-test-renderer';

describe('IfElse', () => {
  test('Basic Unless True', () => {
    const ref = render(
      <UnlessBlock
        expression="foo === 'bar'"
        unlessBlocks={[text('A')]}
        khulnasoftState={mockState({ foo: 'bar' })}
      />
    );

    expect(ref.queryByText('A')).toBeNull();
  });
  test('Basic Unless False', () => {
    const ref = render(
      <UnlessBlock
        expression="foo === 'bar'"
        unlessBlocks={[text('A')]}
        khulnasoftState={mockState({ foo: 'yo' })}
      />
    );

    expect(ref.queryByText('A')).toBeTruthy();
  });

  test('Basic Else False', () => {
    const ref = render(
      <UnlessBlock
        expression="foo === 'bar'"
        unlessBlocks={[text('A')]}
        elseBlocks={[text('B')]}
        khulnasoftState={mockState({ foo: 'bar' })}
      />
    );

    expect(ref.queryByText('A')).toBeNull();
    expect(ref.queryByText('B')).toBeTruthy();
  });

  test('Basic Else True', () => {
    const ref = render(
      <UnlessBlock
        expression="foo === 'bar'"
        unlessBlocks={[text('A')]}
        elseBlocks={[text('B')]}
        khulnasoftState={mockState({ foo: 'ya' })}
      />
    );

    expect(ref.queryByText('A')).toBeTruthy();
    expect(ref.queryByText('B')).toBeNull();
  });

  it('renders snapshot correctly', () => {
    const tree = JSON.stringify(
      reactTestRenderer
        .create(
          <UnlessBlock
            expression="foo === 'bar'"
            unlessBlocks={[text('A')]}
            elseBlocks={[text('B')]}
            khulnasoftState={mockState({ foo: 'bar' })}
          />
        )
        .toJSON()
    ).replace(khulnasoftComponentIdRegex, '');

    expect(tree).toMatchSnapshot();
  });
});
