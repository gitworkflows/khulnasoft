import { Input } from '../khulnasoft.class';
import { KhulnasoftElement } from './element';

export interface KhulnasoftContentVariation {
  data?: {
    blocks?: KhulnasoftElement[];
    inputs?: Input[];
    state?: { [key: string]: any };
    [key: string]: any;
  };
  name?: string;
  testRatio?: number;
  id?: string;
}

// TODO: separate full and partial versions
export interface KhulnasoftContent extends KhulnasoftContentVariation {
  // TODO: query
  '@version'?: number;
  id?: string;
  name?: string;
  published?: 'published' | 'draft' | 'archived';
  modelId?: string;
  priority?: number;
  firstPublished?: number;
  lastUpdated?: number;
  startDate?: number;
  endDate?: number;
  variations?: {
    [id: string]: KhulnasoftContentVariation | undefined;
  };
  testVariationId?: string;
  testVariationName?: string;
}
