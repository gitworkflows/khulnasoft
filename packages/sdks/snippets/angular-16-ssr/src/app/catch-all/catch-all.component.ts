/**
 * Quickstart snippet
 * snippets/angular-16-ssr/src/app/catch-all/catch-all.component.ts
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content, type KhulnasoftContent } from '@khulnasoft.com/sdk-angular';

@Component({
  selector: 'app-catchall',
  standalone: true,
  imports: [Content, CommonModule],
  template: `
    <ng-container *ngIf="content; else notFound">
      <khulnasoft-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
      ></khulnasoft-content>
    </ng-container>

    <ng-template #notFound>
      <div>404 - Content not found</div>
    </ng-template>
  `,
})
export class CatchAllComponent {
  apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
  model = 'page';
  content: KhulnasoftContent | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.content = data.content;
    });
  }
}
