import { Injectable } from '@angular/core';
import { KhulnasoftContentComponent } from '../khulnasoft-content/khulnasoft-content.component';
import { KhulnasoftContentDirective } from '../../directives/khulnasoft-content.directive';

@Injectable()
export class KhulnasoftComponentService {
  contentComponentInstance: KhulnasoftContentComponent | null = null;
  contentDirectiveInstance: KhulnasoftContentDirective | null = null;
}
