import type { KhulnasoftBlock } from '@khulnasoft.com/sdk-react-nextjs';
import { Blocks } from '@khulnasoft.com/sdk-react-nextjs';

interface KhulnasoftBlockWithClassNameProps {
  khulnasoftBlock: KhulnasoftBlock;
  content: KhulnasoftBlock[];
  khulnasoftContext: any;
  khulnasoftComponents: any;
}

export default function KhulnasoftBlockWithClassName(
  props: KhulnasoftBlockWithClassNameProps
) {
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
}
