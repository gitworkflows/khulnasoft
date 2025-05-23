import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { RegisteredComponent } from '@khulnasoft.com/sdk-angular';

@Component({
  selector: 'app-custom-hero',
  standalone: true,
  imports: [CommonModule],
  template: ` <div>This is text from your component</div> `,
})
export class CustomHeroComponent {}

export const customHeroInfo: RegisteredComponent = {
  component: CustomHeroComponent,
  name: 'CustomHero',
  canHaveChildren: true,
  defaultChildren: [
    {
      '@type': '@khulnasoft.com/sdk:Element',
      component: {
        name: 'Text',
        options: {
          text: 'This is Khulnasoft text',
        },
      },
    },
  ],
};
