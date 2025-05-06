import { Blocks, KhulnasoftBlock } from '@khulnasoft.com/sdk-react';

interface KhulnasoftBlockWithClassNameProps {
  khulnasoftBlock: KhulnasoftBlock;
  content: KhulnasoftBlock[];
}

function KhulnasoftBlockWithClassName(props: KhulnasoftBlockWithClassNameProps) {
  return (
    <div>
      <Blocks
        parent={props.khulnasoftBlock?.id}
        path={`component.options.content`}
        blocks={props.content}
        className="test-class-name"
      />
    </div>
  );
}

export default KhulnasoftBlockWithClassName;
