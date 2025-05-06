import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content, type KhulnasoftContent } from '@khulnasoft.com/sdk-angular';
import { customHeroInfo } from './custom-hero/custom-hero.component';

@Component({
  selector: 'app-custom-child',
  standalone: true,
  imports: [Content, CommonModule],
  template: `
    <div *ngIf="content; else notFound">
      <khulnasoft-content
        [content]="content"
        [customComponents]="[customHeroInfo]"
      ></khulnasoft-content>
    </div>

    <ng-template #notFound>404 Not Found</ng-template>
  `,
})
export class CustomChildComponent implements OnInit {
  content: KhulnasoftContent | null = null;
  customHeroInfo = customHeroInfo;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.content = data.content;
    });
  }
}
