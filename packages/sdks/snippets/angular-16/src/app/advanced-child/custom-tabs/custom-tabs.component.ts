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
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, Blocks],
  template: `
    <ng-container *ngIf="tabList?.length">
      <button
        *ngFor="let tab of tabList; let i = index"
        [class.active]="activeTab === i"
        (click)="activeTab = i"
      >
        {{ tab.tabName }}
      </button>

      <blocks
        [blocks]="tabList[activeTab].blocks"
        [path]="'tabList.' + activeTab + '.blocks'"
        [parent]="khulnasoftBlock.id"
        [context]="khulnasoftContext"
        [registeredComponents]="khulnasoftComponents"
      />
    </ng-container>
  `,
})
export class CustomTabsComponent {
  @Input() khulnasoftBlock!: KhulnasoftBlock;
  @Input() tabList: { tabName: string; blocks: KhulnasoftBlock[] }[] = [];
  @Input() khulnasoftComponents: RegisteredComponents = {};
  @Input() khulnasoftContext!: KhulnasoftContextInterface;

  activeTab = 0;
}

export const customTabsInfo: RegisteredComponent = {
  component: CustomTabsComponent,
  name: 'TabFields',
  inputs: [
    {
      name: 'tabList',
      type: 'list',
      subFields: [
        {
          name: 'tabName',
          type: 'string',
        },
        {
          name: 'blocks',
          type: 'uiBlocks',
          defaultValue: [],
        },
      ],
    },
  ],
  shouldReceiveKhulnasoftProps: {
    khulnasoftBlock: true,
    khulnasoftComponents: true,
    khulnasoftContext: true,
  },
};
