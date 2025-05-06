/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * src/app/announcement-bar/announcement-bar.component.ts
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Content,
  fetchOneEntry,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-angular';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  imports: [CommonModule, Content],
  template: `
    <ng-container *ngIf="content">
      <khulnasoft-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
      ></khulnasoft-content>
    </ng-container>

    <!-- Your content coming from your app (or also Khulnasoft) -->
    <div>The rest of your page goes here</div>
  `,
})
export class AnnouncementBarComponent {
  apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
  model = 'announcement-bar';
  content: KhulnasoftContent | null = null;

  async ngOnInit() {
    const urlPath = window.location.pathname || '';

    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: {
        urlPath,
      },
    });

    if (!content) {
      return;
    }

    this.content = content;
  }
}
