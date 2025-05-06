import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import type { DeepPartial } from '../types/deep-partial.js';
import { isBrowser } from './is-browser.js';
import { serializeIncludingFunctions } from './register-component.js';

export interface InsertMenuItem {
  name: string;
  icon?: string;
  item: DeepPartial<KhulnasoftBlock>;
}

export interface InsertMenuConfig {
  name: string;
  priority?: number;
  persist?: boolean;
  advanced?: boolean;
  items: InsertMenuItem[];
}

const registry: { [key: string]: any[] } = {};

export function register(type: 'insertMenu', info: InsertMenuConfig): void;
export function register(type: string, info: any): void;
export function register(type: string, info: any) {
  if (type === 'plugin') {
    info = serializeIncludingFunctions(info);
  }
  let typeList = registry[type];
  if (!typeList) {
    typeList = registry[type] = [];
  }
  typeList.push(info);
  if (isBrowser()) {
    const message = {
      type: 'khulnasoft.register',
      data: {
        type,
        info,
      },
    };
    try {
      parent.postMessage(message, '*');
      if (parent !== window) {
        window.postMessage(message, '*');
      }
    } catch (err) {
      console.debug('Could not postmessage', err);
    }
  }
}
