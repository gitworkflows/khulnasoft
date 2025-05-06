import './polyfills/custom-elements-es5-adapter';
import { Khulnasoft } from '@khulnasoft.com/sdk';
import { NgModule, ModuleWithProviders, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { KhulnasoftContentComponent } from './components/khulnasoft-content/khulnasoft-content.component';
import { KhulnasoftContentDirective } from './directives/khulnasoft-content.directive';
import { KHULNASOFT_API_KEY, KhulnasoftService } from './services/khulnasoft.service';
import { KhulnasoftContentService } from './services/khulnasoft-content.service';
import { KhulnasoftBlocksComponent } from './components/khulnasoft-blocks/khulnasoft-blocks.component';
import { KhulnasoftBlocksOutletComponent } from './components/khulnasoft-blocks-outlet/khulnasoft-blocks-outlet.component';

import { KhulnasoftComponentComponent } from './components/khulnasoft-component/khulnasoft-component.component';
import { KhulnasoftComponentService } from './components/khulnasoft-component/khulnasoft-component.service';

Khulnasoft.isStatic = true;
Khulnasoft.sdkInfo = {
  name: 'angular',
  version: 'UNKNOWN_VERSION_TO_REPLACE',
};


if (typeof window !== 'undefined') {
  window.parent?.postMessage(
    {
      type: 'khulnasoft.isAngularGen1Sdk',
      data: {
        // @ts-ignore
        version: 'UNKNOWN_VERSION_TO_REPLACE',
      },
    },
    '*'
  );
}


const directives = [KhulnasoftContentDirective];

const components = [
  KhulnasoftContentComponent,
  KhulnasoftBlocksComponent,
  KhulnasoftComponentComponent,
  KhulnasoftBlocksOutletComponent,
];

@NgModule({
  imports: [CommonModule],
  providers: [KhulnasoftService, KhulnasoftContentService, KhulnasoftComponentService],
  declarations: [components, directives],
  exports: [components, directives],
})
export class KhulnasoftModule {
  constructor(injector: Injector, @Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(platformId)) {
      // This cannot use a normal import, via https://github.com/angular/angular/issues/24551
      // Cannot use require, so use import. This otherwise breaks at runtime
      import('@angular/elements').then(({ createCustomElement }) => {
        for (const component of Khulnasoft.components) {
          if (
            component.class &&
            component.type === 'angular' &&
            component.tag &&
            typeof customElements.get(component.tag) === 'undefined'
          ) {
            try {
              const Element = createCustomElement(component.class, { injector });
              // Register the custom element with the browser.
              customElements.define(component.tag, Element);
            } catch (err) {
              console.warn('Could not make angular element:', component.class);
            }
          }
        }
      });
    }
  }

  public static forRoot(apiKey?: string): ModuleWithProviders<KhulnasoftModule> {
    return {
      ngModule: KhulnasoftModule,
      providers: [
        {
          provide: KHULNASOFT_API_KEY,
          useValue: apiKey,
        },
      ],
    };
  }
}
