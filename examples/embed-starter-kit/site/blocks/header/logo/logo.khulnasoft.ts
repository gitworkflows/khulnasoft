import dynamic from 'next/dynamic'
import { Khulnasoft } from '@khulnasoft.com/react'

Khulnasoft.registerComponent(
  dynamic(() => import('./logo')),
  {
    name: 'Logo',
    description: 'Your logo',
    image:
      'https://cdn.khulnasoft.com/api/v1/image/assets%2Fe7eb284a1bc549c8856f32d1fc7a44cf%2F504fcbed63274aa18c684e6cdaaf07ce',
    inputs: [
      {
        name: 'image',
        type: 'file',
        allowedFileTypes: ['jpg', 'png', 'svg'],
        helperText: `If no image is specified your default logo will be used`,
      },
    ],
  }
)
