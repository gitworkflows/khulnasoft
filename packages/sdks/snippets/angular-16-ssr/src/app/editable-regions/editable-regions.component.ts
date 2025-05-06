import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content, type KhulnasoftContent } from '@khulnasoft.com/sdk-angular';
import { customColumnsInfo } from './custom-columns/custom-columns.component';

@Component({
  selector: 'app-editable-region',
  standalone: true,
  imports: [CommonModule, Content],
  template: `
    <div *ngIf="content; else notFound">
      <khulnasoft-content
        [content]="content"
        [model]="model"
        [apiKey]="apiKey"
        [customComponents]="customComponents"
      />
    </div>
    <ng-template #notFound>404</ng-template>
  `,
})
export class EditableRegionComponent implements OnInit {
  model = 'page';
  apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
  customComponents = [customColumnsInfo];
  content: KhulnasoftContent | null = null;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.content = data.content;
    });
  }
}
