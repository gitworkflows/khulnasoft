export default function ComponentNeedsHello({
  khulnasoftComponents,
}: {
  khulnasoftComponents: any;
}) {
  const HelloComponent = khulnasoftComponents.Hello;

  return <div id="component-needs-hello">{typeof HelloComponent}</div>;
}
