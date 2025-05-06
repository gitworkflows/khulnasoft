import { KhulnasoftContent, KhulnasoftElement } from '@khulnasoft.com/sdk';
import traverse from 'traverse';

export const isKhulnasoftElement = (item: unknown): item is KhulnasoftElement => {
  return Boolean((item as any)?.['@type'] === '@khulnasoft.com/sdk:Element');
};

type PropsMappers = { [key: string]: (props: any, block: KhulnasoftElement) => Promise<any> };

export async function getAsyncProps(content: KhulnasoftContent, mappers: PropsMappers) {
  const promises: Promise<any>[] = [];
  traverse(content).forEach(item => {
    if (isKhulnasoftElement(item)) {
      if (item.component) {
        const mapper = mappers[item.component.name];
        if (mapper) {
          promises.push(
            mapper(item.component!.options, item).then(result => {
              Object.assign(item.component!.options, result);
            })
          );
        }
      }
    }
  });
  await Promise.all(promises);
  return content;
}
