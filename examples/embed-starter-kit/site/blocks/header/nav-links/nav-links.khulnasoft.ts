import dynamic from 'next/dynamic'
import { Khulnasoft } from '@khulnasoft.com/react'

Khulnasoft.registerComponent(
  dynamic(() => import('./nav-links')),
  {
    name: 'Nav Links',
    description: 'Navigation links',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2Fe7eb284a1bc549c8856f32d1fc7a44cf%2Feee7fb3a0c924e3386044eab4c781d75',
  }
)
