import { resolveKhulnasoftContent } from './resolve-khulnasoft-content'

export async function getLayoutProps(targetingAttributes?: any) {
  const theme = await resolveKhulnasoftContent('theme', targetingAttributes)

  return {
    theme: theme || null,
  }
}
