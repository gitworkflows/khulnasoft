import { Khulnasoft, Component, Class } from '@khulnasoft.com/sdk';

export interface AngularComponent extends Component {
  tag: string;
}

export function KhulnasoftBlock(options: AngularComponent) {
  options.type = 'angular';

  return Khulnasoft.Component(options);
}
