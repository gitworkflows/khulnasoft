'use client';
import React from 'react';
import { withKhulnasoft } from '../../functions/with-khulnasoft';

export interface ButtonProps {
  attributes?: any;
  text?: string;
}

class FormSubmitButtonComponent extends React.Component<ButtonProps> {
  render() {
    return (
      <button type="submit" {...this.props.attributes}>
        {this.props.text}
      </button>
    );
  }
}

export const FormSubmitButton = withKhulnasoft(FormSubmitButtonComponent, {
  name: 'Form:SubmitButton',
  image:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2Fdf2820ffed1f4349a94c40b3221f5b98',
  defaultStyles: {
    appearance: 'none',
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingLeft: '25px',
    paddingRight: '25px',
    backgroundColor: '#3898EC',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  inputs: [
    {
      name: 'text',
      type: 'text',
      defaultValue: 'Click me',
    },
  ],
  static: true,
  noWrap: true,
  // TODO: optional children? maybe as optional form input
  // that only shows if advanced setting is flipped
  // TODO: defaultChildren
  // canHaveChildren: true,
});
