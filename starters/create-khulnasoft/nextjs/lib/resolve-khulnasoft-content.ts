import { khulnasoft, Khulnasoft } from '@khulnasoft.com/react';

Khulnasoft.isStatic = true;

export async function resolveKhulnasoftContent(
  modelName: string,
  targetingAttributes: any,
  cachebust?: boolean
) {
  const cacheOpts = cachebust
    ? {
        cachebust: true,
        noCache: true,
      }
    : {
        staleCacheSeconds: 140,
      };
  const page = await khulnasoft
    .get(modelName, {
      userAttributes: targetingAttributes,
      ...cacheOpts,
    })
    .toPromise();

  return page || null;
}
