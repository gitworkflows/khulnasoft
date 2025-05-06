import { TARGET } from '../constants/target.js';
import type { KhulnasoftContextInterface } from '../context/types.js';
import { convertStyleMapToCSSArray } from '../helpers/css.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { transformStyleProperty } from './transform-style-property.js';

export const getStyle = ({
  block,
  context,
}: {
  block: KhulnasoftBlock;
  context: KhulnasoftContextInterface;
}) => {
  return mapStyleObjToStrIfNeeded(
    transformStyleProperty({
      style: block.style || {},
      context,
      block,
    })
  );
};

/**
 * Svelte does not support style attribute as an object so we need to flatten it.
 *
 * Additionally, Svelte, Vue and other frameworks use kebab-case styles, so we need to convert them.
 */
export function mapStyleObjToStrIfNeeded(
  style: Partial<CSSStyleDeclaration>
): string | Partial<CSSStyleDeclaration> {
  switch (TARGET) {
    case 'svelte':
    case 'vue':
    case 'solid':
    case 'angular':
      return convertStyleMapToCSSArray(style).join(' ');
    case 'qwik':
    case 'reactNative':
    case 'react':
    case 'rsc':
      return style;
  }
}
