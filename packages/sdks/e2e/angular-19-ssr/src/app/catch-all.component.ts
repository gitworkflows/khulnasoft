import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// fails because type imports cannot be injected
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  Content,
  _processContentResult,
  fetchOneEntry,
  getKhulnasoftSearchParams,
  type RegisteredComponent,
} from '@khulnasoft.com/sdk-angular';
import { getProps } from '@sdk/tests';
import { firstValueFrom } from 'rxjs';
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
  standalone: true,
  template: `
    @if (content) {
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
    } @else {
      <div>404 - Content not found</div>
    }
  `,
  imports: [Content],
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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  // Example usage of HttpClient and overriding fetch in fetchOneEntry
  _httpClientFetch = async (url: string, options: RequestInit) => {
    return firstValueFrom(
      this.http.request<any>(options.method || 'GET', url, {
        body: options.body,
        headers: options.headers as any,
        ...options,
        observe: 'response',
        responseType: 'json',
      })
    ).then((response: HttpResponse<any>) => {
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json: () => Promise.resolve(response.body),
      };
    });
  };

  async ngOnInit() {
    const urlPath = this.router.url.split('?')[0] || '';

    const queryParams = this.route.snapshot.queryParams;
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.append(key, value as string);
    });

    const khulnasoftProps = await getProps({
      pathname: urlPath,
      _processContentResult,
      options: getKhulnasoftSearchParams(searchParams),
      fetchOneEntry: (args) => {
        return fetchOneEntry({
          ...args,
          fetch: this._httpClientFetch,
        });
      },
    });

    if (!khulnasoftProps) {
      return;
    }

    this.content = khulnasoftProps.content;
    this.canTrack = khulnasoftProps.canTrack;
    this.trustedHosts = khulnasoftProps.trustedHosts;
    this.apiKey = khulnasoftProps.apiKey;
    this.model = khulnasoftProps.model;
    this.data = khulnasoftProps.data;
    this.apiHost = khulnasoftProps.apiHost;
    this.locale = khulnasoftProps.locale;
  }
}
