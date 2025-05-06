import { useMetadata } from '@khulnasoft.com/mitosis';
import type { TextProps } from './text.types.js';

useMetadata({
  angular: {
    changeDetection: 'OnPush',
  },
});

export default function Text(props: TextProps) {
  return (
    <div
      class={
        /* NOTE: This class name must be "khulnasoft-text" for inline editing to work in the Khulnasoft editor */
        'khulnasoft-text'
      }
      innerHTML={props.text?.toString() || ''}
      style={{ outline: 'none' }}
    />
  );
}
