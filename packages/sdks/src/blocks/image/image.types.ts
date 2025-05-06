import type { KhulnasoftBlock } from '../../types/khulnasoft-block.js';

export interface ImageProps {
  attributes?: string;
  highPriority?: boolean;
  className?: string;
  image: string;
  sizes?: string;
  lazy?: boolean;
  height?: number;
  width?: number;
  altText?: string;
  title?: string;
  backgroundSize?: 'cover' | 'contain';
  backgroundPosition?: string;
  srcset?: string;
  aspectRatio?: number;
  lockAspectRatio?: boolean;
  children?: any;
  fitContent?: boolean;
  khulnasoftBlock?: KhulnasoftBlock;
  noWebp?: boolean;
  src?: string;
}
