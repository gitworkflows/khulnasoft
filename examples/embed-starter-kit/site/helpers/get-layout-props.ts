import { khulnasoft } from '@khulnasoft.com/react'

/**
 * Get global layout props
 */
export async function getLayoutProps() {
  return {
    theme: (await khulnasoft.get('theme').promise()) || null,
    header: (await khulnasoft.get('header').promise()) || null,
  }
}
