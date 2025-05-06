import type { RegisteredComponent } from '@khulnasoft.com/sdk-qwik';
import Counter from './counter/counter';

/**
 * This array is used to integrate custom components within Khulnasoft.
 * https://www.khulnasoft.com/c/docs/custom-components-intro
 *
 * These components will be found the "Custom Components"
 * section of Khulnasoft's visual editor.
 * You can also turn on "components only mode" to limit
 * editing to only these components.
 * https://www.khulnasoft.com/c/docs/guides/components-only-mode
 */
export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Counter,
    name: 'Counter',
    inputs: [
      {
        name: 'initialValue',
        type: 'number',
      },
    ],
  },
];
