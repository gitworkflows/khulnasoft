import { describe, expect, it } from 'vitest';
import type { KhulnasoftBlock } from '../types/khulnasoft-block';
import { resolveLocalizedValues } from './extract-localized-values';
import { fastClone } from './fast-clone';

const mockLocalizedValue = {
  '@type': '@khulnasoft.com/core:LocalizedValue',
  Default: 'Enter some text...',
  'hi-IN': 'kuch text enter kijiye',
  'es-ES': 'Hola',
  'en-US': 'Hello',
};

const mockNonLocalizedValue = 'static value';

const mockBlock: KhulnasoftBlock = {
  '@type': '@khulnasoft.com/sdk:Element',
  id: 'test-block',
  component: {
    name: 'Text',
    options: {
      text: mockLocalizedValue,
      nonLocalizedField: mockNonLocalizedValue,
    },
  },
};

describe('Localized Values', () => {
  describe('resolveLocalizedValues', () => {
    it('should resolve localized values when locale is provided', () => {
      const result = resolveLocalizedValues(fastClone(mockBlock), 'en-US');
      expect(result.component?.options.text).toBe('Hello');
      expect(result.component?.options.nonLocalizedField).toBe(
        mockNonLocalizedValue
      );
    });

    it('should resolve to Default value when no locale is provided', () => {
      const result = resolveLocalizedValues(fastClone(mockBlock), undefined);
      expect(result.component?.options.text).toEqual(
        mockLocalizedValue.Default
      );
      expect(result.component?.options.nonLocalizedField).toBe(
        mockNonLocalizedValue
      );
    });

    it('should handle empty component options', () => {
      const emptyBlock: KhulnasoftBlock = {
        '@type': '@khulnasoft.com/sdk:Element',
        id: 'empty-block',
        component: {
          name: 'Text',
          options: {},
        },
      };
      const result = resolveLocalizedValues(emptyBlock, 'en-US');
      expect(result).toEqual(emptyBlock);
    });

    it('should handle missing component options', () => {
      const noOptionsBlock: KhulnasoftBlock = {
        '@type': '@khulnasoft.com/sdk:Element',
        id: 'no-options-block',
        component: {
          name: 'Text',
        },
      };
      const result = resolveLocalizedValues(noOptionsBlock, 'en-US');
      expect(result).toEqual(noOptionsBlock);
    });

    it('should handle null component', () => {
      const nullComponentBlock: KhulnasoftBlock = {
        '@type': '@khulnasoft.com/sdk:Element',
        id: 'null-component-block',
      };
      const result = resolveLocalizedValues(nullComponentBlock, 'en-US');
      expect(result).toEqual(nullComponentBlock);
    });

    it('should handle non-existent locale', () => {
      const result = resolveLocalizedValues(fastClone(mockBlock), 'fr-FR');
      expect(result.component?.options.text).toBeUndefined();
      expect(result.component?.options.nonLocalizedField).toBe(
        mockNonLocalizedValue
      );
    });

    it('should handle nested localized values', () => {
      const nestedBlock: KhulnasoftBlock = {
        '@type': '@khulnasoft.com/sdk:Element',
        id: 'nested-block',
        component: {
          name: 'NestedComponent',
          options: {
            nested: {
              text: mockLocalizedValue,
            },
          },
        },
      };
      const result = resolveLocalizedValues(nestedBlock, 'en-US');
      expect(result.component?.options.nested.text).toBe('Hello');
    });

    it('should handle subfields - nested fields having localized values', () => {
      const nestedBlock: KhulnasoftBlock = {
        '@type': '@khulnasoft.com/sdk:Element',
        id: 'nested-block',
        component: {
          name: 'ListComponent',
          options: {
            myList: [
              {
                text: mockLocalizedValue,
              },
              {
                text: mockLocalizedValue,
              },
            ],
          },
        },
      };

      const result = resolveLocalizedValues(nestedBlock, 'en-US');
      expect(result.component?.options.myList[0].text).toBe('Hello');
      expect(result.component?.options.myList[1].text).toBe('Hello');
    });
  });
});
