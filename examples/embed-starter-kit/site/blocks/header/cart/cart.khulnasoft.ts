import dynamic from 'next/dynamic'
import { Khulnasoft } from '@khulnasoft.com/react'

Khulnasoft.registerComponent(
  dynamic(() => import('./cart')),
  {
    name: 'Cart',
    description: 'Cart button',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2Fe7eb284a1bc549c8856f32d1fc7a44cf%2F32c90ca2aa1a4812bc9314bae1b795c6',
  }
)
