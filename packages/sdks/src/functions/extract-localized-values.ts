import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { traverse } from './traverse.js';

function isLocalizedField(value: any) {
  return (
    value &&
    typeof value === 'object' &&
    value['@type'] === '@khulnasoft.com/core:LocalizedValue'
  );
}

function containsLocalizedValues(data: Record<string, any>) {
  if (!data || !Object.getOwnPropertyNames(data).length) {
    return false;
  }
  let hasLocalizedValues = false;
  traverse(data, (value) => {
    if (isLocalizedField(value)) {
      hasLocalizedValues = true;
      return;
    }
  });
  return hasLocalizedValues;
}

function extractLocalizedValues(data: Record<string, any>, locale: string) {
  if (!data || !Object.getOwnPropertyNames(data).length) {
    return {};
  }

  traverse(data, (value, update) => {
    if (isLocalizedField(value)) {
      update(value[locale] ?? undefined);
    }
  });

  return data;
}

export function resolveLocalizedValues(
  block: KhulnasoftBlock,
  locale: string | undefined
) {
  if (
    block.component?.options &&
    containsLocalizedValues(block.component?.options)
  ) {
    if (!locale) {
      console.warn(
        '[Khulnasoft.com] In order to use localized fields in Khulnasoft, you must pass a locale prop to the KhulnasoftComponent or to options object while fetching the content to resolve localized fields. Learn more: https://www.khulnasoft.com/c/docs/localization-inline#targeting-and-inline-localization'
      );
    }
    block.component.options = extractLocalizedValues(
      block.component.options,
      locale ?? 'Default'
    );
  }

  return block;
}
