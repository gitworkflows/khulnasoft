import * as React from 'react';
import { KhulnasoftElement, KhulnasoftBlockComponent } from '@khulnasoft.com/react';
import MuiTooltip from '@material-ui/core/Tooltip';

interface Props {
  khulnasoftBlock?: KhulnasoftElement;
  text: string;
  placement?: string;
}

export class Tooltip extends React.Component<Props> {
  render() {
    return (
      <MuiTooltip title={this.props.text}>
        <span>
          {/* TODO: this should be KhulnasoftBlocks */}
          {this.props.khulnasoftBlock &&
            this.props.khulnasoftBlock.children &&
            this.props.khulnasoftBlock.children.map((block, index) => (
              <KhulnasoftBlockComponent key={block.id} block={block} />
            ))}
        </span>
      </MuiTooltip>
    );
  }
}
