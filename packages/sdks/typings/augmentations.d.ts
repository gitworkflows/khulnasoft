import type { JSX as JSXType } from '@khulnasoft.com/mitosis/jsx-runtime';

declare module '@khulnasoft.com/mitosis/jsx-runtime' {
  declare namespace JSX {
    declare interface CustomAttributes extends JSXType.CustomAttributes {
      /**
       * Needed to provide data attributes to React Native components
       */
      dataSet?: Record<string, string>;
    }

    declare interface IntrinsicElements {
      template: HTMLAttributes;
    }

    declare interface IntrinsicAttributes {
      id?: string;
      innerHTML?: string;
    }
  }
}
