import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {
  Content,
  fetchOneEntry,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-angular';
import { customHeroInfo } from './custom-hero/custom-hero.component';

@Component({
  selector: 'app-custom-child',
  standalone: true,
  imports: [Content, CommonModule],
  template: `
    <div *ngIf="content">
      <khulnasoft-content
        [content]="content"
        [model]="model"
        [apiKey]="apiKey"
        [customComponents]="[customHeroInfo]"
      ></khulnasoft-content>
    </div>

    <div *ngIf="notFound">404 Not Found</div>
  `,
})
export class CustomChildComponent implements OnInit {
  notFound = false;
  content: KhulnasoftContent | null = null;
  customHeroInfo = customHeroInfo;
  model = 'page';
  apiKey = 'ee9f13b4981e489a9a1209887695ef2b';

  async ngOnInit() {
    this.content = await fetchOneEntry({
      model: this.model,
      apiKey: this.apiKey,
      userAttributes: {
        urlPath: window.location.pathname,
      },
    });

    if (!this.content) {
      this.notFound = true;
    }
  }
}
