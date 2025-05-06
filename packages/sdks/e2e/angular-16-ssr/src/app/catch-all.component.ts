import { Component } from '@angular/core';
// fails because type imports cannot be injected
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ActivatedRoute } from '@angular/router';
import type { RegisteredComponent } from '@khulnasoft.com/sdk-angular';
import { customComponents } from './custom-components';

interface KhulnasoftProps {
  apiVersion: string;
  canTrack?: boolean;
  trustedHosts?: undefined;
  apiKey: string;
  model: string;
  content: any;
  data?: any;
  apiHost?: string;
  locale?: string;
}

@Component({
  selector: 'catch-all-route',
  template: `
    <ng-container *ngIf="content; else notFound">
      <khulnasoft-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
        [trustedHosts]="trustedHosts"
        [canTrack]="canTrack"
        [customComponents]="customComponents"
        [data]="data"
        [apiHost]="apiHost"
        [locale]="locale"
      ></khulnasoft-content>
    </ng-container>

    <ng-template #notFound>
      <div>404 - Content not found</div>
    </ng-template>
  `,
})
export class CatchAllComponent {
  canTrack: KhulnasoftProps['canTrack'];
  trustedHosts: KhulnasoftProps['trustedHosts'];
  apiKey: KhulnasoftProps['apiKey'] = 'abcd';
  model: KhulnasoftProps['model'] = 'page';
  content: KhulnasoftProps['content'];
  data: KhulnasoftProps['data'];
  apiHost: KhulnasoftProps['apiHost'];
  locale: KhulnasoftProps['locale'];
  customComponents: RegisteredComponent[] = customComponents;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.content = data.content?.content;
      this.canTrack = data.content?.canTrack;
      this.trustedHosts = data.content?.trustedHosts;
      this.data = data.content?.data;
      this.apiHost = data.content?.apiHost;
      this.model = data.content?.model;
      this.locale = data.content?.locale;
    });
  }
}
