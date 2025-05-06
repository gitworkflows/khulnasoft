import { Blocks } from '@khulnasoft.com/sdk-solid';
import type { Component } from 'solid-js';

const KhulnasoftBlockWithClassName: Component<{
  khulnasoftBlock?: any;
  content: any;
}> = (props) => {
  return (
    <div>
      <Blocks
        parent={props.khulnasoftBlock?.id}
        path="component.options.content"
        blocks={props.content}
        className="test-class-name"
      />
    </div>
  );
};

export default KhulnasoftBlockWithClassName;
