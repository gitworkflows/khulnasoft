import {Blocks} from '@khulnasoft.com/sdk-react';

function KhulnasoftBlockWithClassName(props: any) {
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
