import type { KhulnasoftNonceProp } from '../types/khulnasoft-props.js';

interface Props extends KhulnasoftNonceProp {
  scriptStr: string;
  id: string;
}

export default function InlinedScript(props: Props) {
  return (
    <script
      innerHTML={props.scriptStr}
      data-id={props.id}
      nonce={props.nonce || ''}
    />
  );
}
