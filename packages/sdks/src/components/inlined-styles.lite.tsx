import type { KhulnasoftNonceProp } from '../types/khulnasoft-props.js';

interface Props extends KhulnasoftNonceProp {
  styles: string;
  id: string;
}

export default function InlinedStyles(props: Props) {
  return (
    <style innerHTML={props.styles} data-id={props.id} nonce={props.nonce} />
  );
}
