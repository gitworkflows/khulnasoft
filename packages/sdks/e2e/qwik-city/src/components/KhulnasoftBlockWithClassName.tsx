import { component$ } from '@khulnasoft.com/qwik';
import type { KhulnasoftBlock } from '@khulnasoft.com/sdk-qwik';
import { Blocks } from '@khulnasoft.com/sdk-qwik';

interface KhulnasoftBlockWithClassNameProps {
  khulnasoftBlock: KhulnasoftBlock;
  content: KhulnasoftBlock[];
  khulnasoftContext: any;
  khulnasoftComponents: any;
}

export default component$((props: KhulnasoftBlockWithClassNameProps) => {
  return (
    <div>
      <Blocks
        parent={props.khulnasoftBlock?.id}
        path={`component.options.content`}
        context={props.khulnasoftContext}
        registeredComponents={props.khulnasoftComponents}
        blocks={props.content}
        className="test-class-name"
      />
    </div>
  );
});
