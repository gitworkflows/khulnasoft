import dynamic from 'next/dynamic'
import { Khulnasoft } from '@khulnasoft.com/react'

Khulnasoft.registerComponent(
  dynamic(() => import('./spacer')),
  {
    name: 'Spacer',
    description: 'Add flexible space between blocks',
    noWrap: true,
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2Fe7eb284a1bc549c8856f32d1fc7a44cf%2Ff4a788e347d74c9f9483031f6ee395c6',
  }
)
