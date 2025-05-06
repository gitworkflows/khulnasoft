import { KhulnasoftStore, KhulnasoftElement } from '@khulnasoft.com/react';

export interface AssignBlockProps {
  expression?: string;
  khulnasoftState?: KhulnasoftStore;
}

export interface CaptureBlockProps {
  expression?: string;
  variableName?: string;
  khulnasoftState?: KhulnasoftStore;
}

export interface Branch {
  expression?: string;
  blocks: KhulnasoftElement[];
}

export interface ConditionBlockProps {
  khulnasoftState?: KhulnasoftStore;
  khulnasoftBlock?: KhulnasoftElement;
  branches: Branch[];
}

export interface UnlessBlockProps {
  khulnasoftState?: KhulnasoftStore;
  khulnasoftBlock?: KhulnasoftElement;
  unlessBlocks?: KhulnasoftElement[];
  elseBlocks?: KhulnasoftElement[];
  expression?: string;
}

export interface StateProviderProps {
  khulnasoftBlock?: KhulnasoftElement;
  state: any;
  context?: any;
}

export interface FormBlockProps {
  customAttributes?: string[];
  type: string;
  parameter?: string;
  khulnasoftState?: KhulnasoftStore;
  khulnasoftBlock?: KhulnasoftElement;
  showErrors?: boolean;
}
