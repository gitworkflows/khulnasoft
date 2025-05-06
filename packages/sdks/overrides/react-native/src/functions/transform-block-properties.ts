import { findDOMNode } from 'react-dom';
import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { isEditing } from './is-editing.js';

export function transformBlockProperties({
  properties,
}: {
  block: KhulnasoftBlock;
  context: KhulnasoftContextInterface;
  properties: any;
}) {
  if (!isEditing()) {
    return properties;
  }

  const id = properties['khulnasoft-id'];

  if (!id) {
    console.warn('No khulnasoft-id found on properties', properties);
  }

  properties.ref = (ref) => {
    if (isEditing()) {
      const el = findDOMNode(ref);
      if (el && !(el instanceof Text)) {
        el.setAttribute('khulnasoft-id', id);
        el.classList.add(id);
      }
    }
  };
  return properties;
}
