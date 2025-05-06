import { KhulnasoftContent, KhulnasoftElement } from '@khulnasoft.com/sdk';
import traverse from 'traverse';

const isKhulnasoftPixel = (item: unknown): item is KhulnasoftElement => {
  return (item as any)?.id?.startsWith('khulnasoft-pixel');
};

export function setPixelProperties(
  content: KhulnasoftContent,
  properties: Record<string, string>
): KhulnasoftContent {
  return traverse(content).forEach(function (item) {
    if (isKhulnasoftPixel(item)) {
      this.update({
        ...item,
        properties: {
          ...item.properties,
          ...properties,
          src: item.properties!.src,
        },
      });
    }
  });
}
