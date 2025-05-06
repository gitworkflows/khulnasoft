
'use client';
import dynamic from 'next/dynamic';
import { type RegisteredComponent } from "@khulnasoft.com/sdk-react";

export const customComponents: RegisteredComponent[] = [
  {
    component: dynamic(() => import('./MyFunComponent')),
    name: 'MyFunComponent',
    inputs: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Hello world',
      },
    ],
  },
];