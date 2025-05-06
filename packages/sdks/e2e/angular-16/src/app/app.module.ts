import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Blocks, Content } from '@khulnasoft.com/sdk-angular';
import { AppComponent } from './app.component';
import { KhulnasoftBlockWithClassNameComponent } from './custom-components/khulnasoft-block-with-class-name.component';

@NgModule({
  declarations: [AppComponent, KhulnasoftBlockWithClassNameComponent],
  imports: [Blocks, Content, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
