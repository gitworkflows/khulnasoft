import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Blocks, Content } from '@khulnasoft.com/sdk-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CatchAllComponent } from './catch-all.component';
import { KhulnasoftBlockWithClassNameComponent } from './custom-components/khulnasoft-block-with-class-name.component';

@NgModule({
  declarations: [
    AppComponent,
    CatchAllComponent,
    KhulnasoftBlockWithClassNameComponent,
  ],
  imports: [Blocks, Content, BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
