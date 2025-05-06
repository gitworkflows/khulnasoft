import type { KhulnasoftLinkComponentProp } from '../../types/khulnasoft-props.js';

export interface ButtonProps extends KhulnasoftLinkComponentProp {
  attributes?: any;
  text?: string;
  link?: string;
  openLinkInNewTab?: boolean;
}
