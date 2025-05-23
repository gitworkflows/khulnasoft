import { For, useMetadata, useTarget } from '@khulnasoft.com/mitosis';
import { isEditing } from '../../../functions/is-editing.js';
import { filterAttrs } from '../../helpers.js';
/**
 * This import is used by the Svelte SDK. Do not remove.
 */

import { setAttrs } from '../../helpers.js';

useMetadata({
  rsc: {
    componentType: 'client',
  },
});

export interface FormSelectProps {
  options?: { name?: string; value: string }[];
  attributes?: any;
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
}

export default function SelectComponent(props: FormSelectProps) {
  return (
    <select
      {...useTarget({
        vue: filterAttrs(props.attributes, 'v-on:', false),
        svelte: filterAttrs(props.attributes, 'on:', false),
        default: {},
      })}
      {...useTarget({
        vue: filterAttrs(props.attributes, 'v-on:', true),
        svelte: filterAttrs(props.attributes, 'on:', true),
        default: props.attributes,
      })}
      value={props.value}
      key={
        isEditing() && props.defaultValue ? props.defaultValue : 'default-key'
      }
      defaultValue={props.defaultValue}
      name={props.name}
      required={props.required}
    >
      <For each={props.options}>
        {(option, index) => (
          <option key={`${option.name}-${index}`} value={option.value}>
            {option.name || option.value}
          </option>
        )}
      </For>
    </select>
  );
}
