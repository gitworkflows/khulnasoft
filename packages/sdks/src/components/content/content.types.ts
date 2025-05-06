import type { KhulnasoftRenderState } from '../../context/types.js';
export type { ContentProps } from './contentProps.types.js';

export interface KhulnasoftComponentStateChange {
  state: KhulnasoftRenderState;
  ref: {
    name?: string;
    props?: {
      khulnasoftBlock?: {
        id?: string;
      };
    };
  };
}
