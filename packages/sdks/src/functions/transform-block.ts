import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';

// Noope way for targets to make modifications to the block object if/as needed
export function transformBlock(block: KhulnasoftBlock): KhulnasoftBlock {
  return block;
}
