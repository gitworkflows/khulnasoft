import type { KhulnasoftContextInterface } from '../context/types.js';
import type { KhulnasoftBlock } from '../types/khulnasoft-block.js';
import { getClassPropName } from './get-class-prop-name.js';
import { getStyle } from './get-style.js';
import { transformBlockProperties } from './transform-block-properties.js';

const extractRelevantRootBlockProperties = (block: KhulnasoftBlock) => {
  // currently we are only spreading the `href` property
  // TO-DO: potentially spread all properties from block, but only if they are not already defined by KhulnasoftBlock

  // const {
  //   '@type': _type,
  //   '@version': _version,
  //   id: _id,
  //   tagName: _tagName,
  //   layerName: _layerName,
  //   groupLocked: _groupLocked,
  //   layerLocked: _layerLocked,
  //   class: _class,
  //   children: _children,
  //   responsiveStyles: _responsiveStyles,
  //   component: _component,
  //   bindings: _bindings,
  //   meta: _meta,
  //   actions: _actions,
  //   properties: _properties,
  //   code: _code,
  //   repeat: _repeat,
  //   animations: _animations,
  //   style: _style,
  //   hide: _hide,
  //   show: _show,
  //   // anything set by dynamic bindings outside of predefined `KhulnasoftBlock` properties
  //   ...remainingBlockProperties
  // } = block;

  return { href: (block as any).href };
};

export function getBlockProperties({
  block,
  context,
}: {
  block: KhulnasoftBlock;
  context: KhulnasoftContextInterface;
}) {
  const properties = {
    ...extractRelevantRootBlockProperties(block),
    ...block.properties,
    'khulnasoft-id': block.id,
    style: getStyle({ block, context }),
    [getClassPropName()]: [
      block.id,
      'khulnasoft-block',
      block.class,
      block.properties?.class,
    ]
      .filter(Boolean)
      .join(' '),
  };

  return transformBlockProperties({ properties, context, block });
}
