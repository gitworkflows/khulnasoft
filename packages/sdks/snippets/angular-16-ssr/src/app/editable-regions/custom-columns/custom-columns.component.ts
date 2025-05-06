import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type {
  KhulnasoftBlock,
  KhulnasoftContextInterface,
  RegisteredComponent,
  RegisteredComponents,
} from '@khulnasoft.com/sdk-angular';
import { Blocks } from '@khulnasoft.com/sdk-angular';

@Component({
  selector: 'app-custom-columns',
  standalone: true,
  imports: [CommonModule, Blocks],
  template: `
    <blocks
      [blocks]="column1"
      [path]="'column1'"
      [parent]="khulnasoftBlock.id"
      [context]="khulnasoftContext"
      [registeredComponents]="khulnasoftComponents"
    />
    <blocks
      [blocks]="column2"
      [path]="'column2'"
      [parent]="khulnasoftBlock.id"
      [context]="khulnasoftContext"
      [registeredComponents]="khulnasoftComponents"
    />
  `,
})
export class CustomColumnsComponent {
  @Input() khulnasoftBlock!: KhulnasoftBlock;
  @Input() column1!: KhulnasoftBlock[];
  @Input() column2!: KhulnasoftBlock[];
  @Input() khulnasoftComponents!: RegisteredComponents;
  @Input() khulnasoftContext!: KhulnasoftContextInterface;
}

export const customColumnsInfo: RegisteredComponent = {
  name: 'MyColumns',
  component: CustomColumnsComponent,
  inputs: [
    {
      name: 'column1',
      type: 'uiBlocks',
      defaultValue: [],
    },
    {
      name: 'column2',
      type: 'uiBlocks',
      defaultValue: [],
    },
  ],

  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
    khulnasoftComponents: true,
    khulnasoftContext: true,
  },
};
