import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';

export function transformBlockProperties<T>({
  properties,
}: {
  properties: T;
  context: KhulnasoftContextInterface;
  block: KhulnasoftBlock;
}) {
  return properties;
}
