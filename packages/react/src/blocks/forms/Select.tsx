'use client';
import React from 'react';
import { Khulnasoft } from '@khulnasoft.com/sdk';
import { withKhulnasoft } from '../../functions/with-khulnasoft';

export interface FormSelectProps {
  options?: { name?: string; value: string }[];
  attributes?: any;
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
}

class FormSelectComponent extends React.Component<FormSelectProps> {
  render() {
    const { options } = this.props;
    return (
      <select
        value={this.props.value}
        key={Khulnasoft.isEditing && this.props.defaultValue ? this.props.defaultValue : 'default-key'}
        defaultValue={this.props.defaultValue}
        name={this.props.name}
        required={this.props.required}
        {...this.props.attributes}
      >
        {options &&
          options.map(option => (
            <option value={option.value}>{option.name || option.value}</option>
          ))}
      </select>
    );
  }
}

export const FormSelect = withKhulnasoft(FormSelectComponent, {
  name: 'Form:Select',
  image:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2F83acca093fb24aaf94dee136e9a4b045',
  defaultStyles: {
    alignSelf: 'flex-start',
  },
  inputs: [
    {
      name: 'options',
      type: 'list',
      required: true,
      subFields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
      defaultValue: [
        {
          value: 'option 1',
        },
        {
          value: 'option 2',
        },
      ],
    },
    {
      name: 'name',
      type: 'string',
      required: true,
      helperText:
        'Every select in a form needs a unique name describing what it gets, e.g. "email"',
    },
    {
      name: 'defaultValue',
      type: 'string',
    },
    {
      name: 'value',
      type: 'string',
      advanced: true,
    },

    {
      name: 'required',
      type: 'boolean',
      defaultValue: false,
    },
  ],
  static: true,
  noWrap: true,
});
