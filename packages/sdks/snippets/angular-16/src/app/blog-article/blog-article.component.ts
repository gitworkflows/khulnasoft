import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Content,
  fetchOneEntry,
  type KhulnasoftContent,
} from '@khulnasoft.com/sdk-angular';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [Content, CommonModule],
  template: `<div *ngIf="article" class="content">
    <h1>{{ article.data?.title }}</h1>
    <p>{{ article.data?.['blurb'] }}</p>
    <img [src]="article.data?.['image']" alt="" />
    <khulnasoft-content [model]="model" [content]="article"></khulnasoft-content>
  </div> `,
})
export class BlogArticleComponent {
  article: KhulnasoftContent | null = null;
  model = 'blog-article';

  async ngOnInit() {
    this.article = await fetchOneEntry({
      model: this.model,
      apiKey: 'ee9f13b4981e489a9a1209887695ef2b',
      query: {
        'data.handle': 'new-product-line',
      },
    });
  }
}
