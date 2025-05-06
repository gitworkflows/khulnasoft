import { Khulnasoft } from '@khulnasoft.com/react'

export const Heading = (props: { title: string }) => {
  // title input will automatically resolve to the active locale's value
  return (
    <div style={{ width: '50vw' }}>
      <h1>{props.title}</h1>
    </div>
  )
}

Khulnasoft.registerComponent(Heading, {
  name: 'Heading',
  inputs: [
    {
      localized: true, // set this flag to localize the title input
      name: 'title',
      type: 'text',
      defaultValue: 'I am a heading!',
    },
  ],
})
