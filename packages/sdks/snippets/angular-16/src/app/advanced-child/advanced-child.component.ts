import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {
  Content,
  fetchOneEntry,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-angular';
import {
  CustomTabsComponent,
  customTabsInfo,
} from './custom-tabs/custom-tabs.component';

@Component({
  selector: 'app-advanced-child',
  standalone: true,
  imports: [CommonModule, Content, CustomTabsComponent],
  template: `
    <div *ngIf="content">
      <khulnasoft-content
        [content]="content"
        [model]="modelName"
        [apiKey]="apiKey"
        [customComponents]="customComponents"
      />
    </div>
    <div *ngIf="notFound">404</div>
  `,
})
export class AdvancedChildComponent implements OnInit {
  apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
  modelName = 'page';

  content: KhulnasoftContent | null = null;
  notFound = false;
  customComponents = [customTabsInfo];

  async ngOnInit() {
    this.content = await fetchOneEntry({
      model: this.modelName,
      apiKey: this.apiKey,
      userAttributes: {
        urlPath: window.location.pathname,
      },
    });

    this.notFound = !this.content;
  }
}
