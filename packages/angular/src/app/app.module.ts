import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { KhulnasoftModule } from './modules/khulnasoft/khulnasoft.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KhulnasoftService } from './modules/khulnasoft/services/khulnasoft.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    KhulnasoftModule.forRoot('VQ7kLiTnpLQvaokXJSed'),
    AppRoutingModule,
    BrowserTransferStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(khulnasoft: KhulnasoftService) {
    khulnasoft.setUserAttributes({
      locale: 'us',
      userIsLoggedIn: false,
    });
  }
}
