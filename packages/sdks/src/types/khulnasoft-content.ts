import type { KhulnasoftBlock } from './khulnasoft-block.js';
import type { Input } from './input.js';
import type { Nullable } from './typescript.js';

export interface Breakpoints {
  xsmall?: number;
  small: number;
  medium: number;
}
export interface KhulnasoftContentVariation {
  data?: {
    title?: string;
    blocks?: KhulnasoftBlock[];
    inputs?: Input[];
    state?: { [key: string]: any };
    jsCode?: string;
    tsCode?: string;
    httpRequests?: { [key: string]: string };
    [key: string]: any;
  };
  name?: string;
  testRatio?: number;
  id?: string;
  meta?: {
    breakpoints?: Nullable<Breakpoints>;
    [key: string]: any;
  };
}

// TODO: separate full and partial versions
export interface KhulnasoftContent extends KhulnasoftContentVariation {
  // TODO: query
  '@version'?: number;
  published?: 'published' | 'draft' | 'archived';
  modelId?: string;
  priority?: number;
  firstPublished?: number;
  lastUpdated?: number;
  startDate?: number;
  endDate?: number;
  variations?: {
    [id: string]: KhulnasoftContentVariation;
  };
  testVariationId?: string;
  testVariationName?: string;
}
