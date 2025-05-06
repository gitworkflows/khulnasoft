/**
 * Specify khulnasoft editor settings like what components to show when
 */

import { Khulnasoft, khulnasoft } from '@khulnasoft.com/react'

// Import any Khulnasoft components we want to use
import '../blocks/header/spacer/spacer.khulnasoft'
import '../blocks/header/nav-links/nav-links.khulnasoft'
import '../blocks/header/logo/logo.khulnasoft'
import '../blocks/header/search-bar/search-bar.khulnasoft'
import '../blocks/header/cart/cart.khulnasoft'
import '../blocks/page/hero/hero.khulnasoft'
import '../blocks/page/double-columns/double-columns.khulnasoft'
import '../blocks/page/dynamic-columns/dynamic-columns.khulnasoft'

khulnasoft.init(process.env.KHULNASOFT_PUBLIC_KEY!)

Khulnasoft.register('editor.settings', { customInsertMenu: true })

if (Khulnasoft.isBrowser) {
  if (khulnasoft.editingModel === 'header') {
    // Header specific components
    Khulnasoft.register('insertMenu', {
      name: 'Header blocks',
      items: [
        { name: 'Logo' },
        { name: 'Nav Links' },
        { name: 'Search' },
        { name: 'Cart' },
        { name: 'Spacer' },
      ],
    })
  } else {
    // Page specific components
    Khulnasoft.register('insertMenu', {
      name: 'Page blocks',
      items: [
        { name: 'Hero' },
        { name: 'Double Columns' },
        { name: 'Triple Columns' },
        { name: 'Dynamic Columns' },
      ],
    })
  }
}
