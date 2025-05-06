/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { useObserver } from 'mobx-react'
import { ApplicationContext } from '../interfaces/application-context'
import { Khulnasoft, Component } from '@khulnasoft.com/sdk'

const context: ApplicationContext = require('@khulnasoft.com/app-context').default

const last = <T extends unknown>(arr: T[]) => arr[arr.length - 1]

// Foobar example header component
export const InsertMenu = () => {
  return useObserver(() => {
    return (
      <div css={{ padding: 20, display: 'flex', flexWrap: 'wrap' }}>
        {/* 
          Alternatively use custom inert menu sections in your site code, like here 
          https://github.com/khulnasoft-com/khulnasoft/blob/main/examples/react-design-system/src/khulnasoft-settings.js#L32:L32

          and render them via Khulnasoft.registry.insertMenu which is an array of the configs
          that you pass to Khulnasoft.register('insertMenu', { ... } )
        */}
        {[{ name: 'Box' } as Component]
          .concat(context.khulnasoftComponents)
          .filter(
            (item) =>
              !item.hideFromInsertMenu &&
              // Don't show email components
              !item.name.startsWith('Email:') &&
              // Don't show form components
              !item.name.startsWith('Form:')
          )
          .map((item) => {
            return (
              <div
                onMouseDown={(e) => {
                  e.preventDefault()
                  // There is a special handing for the 'Box' type
                  context.designerState.draggingInItem =
                    item.name === 'Box' ? 'rectangle' : item
                }}
                css={{
                  backgroundColor: '#eee',
                  height: 70,
                  width: 70,
                  cursor: 'pointer',
                  marginLeft: 10,
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                <img
                  css={{
                    marginTop: 10,
                    height: 30,
                    width: 50,
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  src={
                    item.image ||
                    // TODO: for blocks without images, provide one by name, e.g. for item.name === 'Columns' show an image of your chosing
                    // through your own mapping
                    'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F60188140f3264064aa2954fc390a5f6f'
                  }
                />
                <div
                  css={{
                    fontSize: 12,
                  }}
                >
                  {last(item.name.split(':'))}
                </div>
              </div>
            )
          })}
      </div>
    )
  })
}
