import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';

export function transformStyleProperty({
  style,
}: {
  style: Partial<CSSStyleDeclaration>;
  context: KhulnasoftContextInterface;
  block: KhulnasoftBlock;
}) {
  return style;
}
