/*
 * Only used for Angular SDK as Angular doesn't support 'div' as a component
 */
export default function DynamicDiv(props: {
  children?: any;
  attributes: any;
  actionAttributes: any;
  BlockWrapperProps: any;
  khulnasoftPath: any;
  khulnasoftParentId: any;
  BlocksWrapperProps: any;
  contentWrapperProps: any;
  khulnasoftModel: any;
  ref: any;
}) {
  return <div>{props.children}</div>;
}
