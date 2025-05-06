import { Component } from '@angular/core';
import {
  _processContentResult,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  type RegisteredComponent,
} from '@khulnasoft.com/sdk-angular';
import { getProps } from '@sdk/tests';
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
  selector: 'app-root',
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
export class AppComponent {
  title = 'angular';
  apiVersion: KhulnasoftProps['apiVersion'] = 'v3';
  canTrack: KhulnasoftProps['canTrack'];
  trustedHosts: KhulnasoftProps['trustedHosts'];
  apiKey: KhulnasoftProps['apiKey'] = 'abcd';
  model: KhulnasoftProps['model'] = 'page';
  content: KhulnasoftProps['content'];
  data: KhulnasoftProps['data'];
  apiHost: KhulnasoftProps['apiHost'];
  locale: KhulnasoftProps['locale'];

  customComponents: RegisteredComponent[] = customComponents;

  async ngOnInit() {
    const urlPath = window.location.pathname || '';

    const khulnasoftProps = await getProps({
      pathname: urlPath,
      _processContentResult,
      options: getKhulnasoftSearchParams(
        new URLSearchParams(window.location.search)
      ),
      fetchOneEntry,
    });

    if (!khulnasoftProps) {
      return;
    }

    this.content = khulnasoftProps.content;
    this.canTrack = khulnasoftProps.canTrack;
    this.trustedHosts = khulnasoftProps.trustedHosts;
    this.apiKey = khulnasoftProps.apiKey;
    this.model = khulnasoftProps.model;
    this.apiVersion = khulnasoftProps.apiVersion;
    this.data = khulnasoftProps.data;
    this.apiHost = khulnasoftProps.apiHost;
    this.locale = khulnasoftProps.locale;
  }
}
