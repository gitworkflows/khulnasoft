import { Injectable } from '@angular/core';
import { KhulnasoftContentComponent } from '../components/khulnasoft-content/khulnasoft-content.component';
import { KhulnasoftContentDirective } from '../directives/khulnasoft-content.directive';

@Injectable()
export class KhulnasoftContentService {
  componentInstance: KhulnasoftContentComponent | null = null;
  directiveInstance: KhulnasoftContentDirective | null = null;
}
