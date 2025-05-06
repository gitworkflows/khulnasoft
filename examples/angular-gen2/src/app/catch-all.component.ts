import { Component } from '@angular/core';
import {
  Content,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-angular';

import { environment } from '../environments/environment';

@Component({
  selector: 'catch-all-route',
  standalone: true,
  template: `
    @if (content) {
      <khulnasoft-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
      ></khulnasoft-content>
    } @else {
      <div>404 - Content not found</div>
    }
  `,
  imports: [Content],
})
export class CatchAllComponent {
    model = "page";
    apiKey = environment.khulnasoftApiKey;
    content: KhulnasoftContent | null = null;

  async ngOnInit() {
    const khulnasoftContent = await fetchOneEntry({
      model: this.model,
      apiKey: this.apiKey,
      options: getKhulnasoftSearchParams(new URLSearchParams(window.location.search)),
      userAttributes: { urlPath: window.location.pathname },
    });

    if (!khulnasoftContent) {
      return;
    }

    this.content = khulnasoftContent;
  }
}
