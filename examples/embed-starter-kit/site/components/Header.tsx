import { KhulnasoftComponent } from '@khulnasoft.com/react'

/**
 * Global header editable in Khulnasoft
 */
export function Header(props: { header: any }) {
  return <KhulnasoftComponent model="header" content={props.header} />
}
