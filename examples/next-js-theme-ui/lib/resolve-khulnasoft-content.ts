import { khulnasoft } from '@khulnasoft.com/react'
import khulnasoftConfig from '@config/khulnasoft'
khulnasoft.init(khulnasoftConfig.apiKey)

export async function resolveKhulnasoftContent(
  modelName: string,
  targetingAttributes?: any
) {
  let page = await khulnasoft
    .get(modelName, {
      userAttributes: targetingAttributes,
      includeRefs: true,
      cachebust: true,
    } as any)
    .toPromise()

  return page || null
}
