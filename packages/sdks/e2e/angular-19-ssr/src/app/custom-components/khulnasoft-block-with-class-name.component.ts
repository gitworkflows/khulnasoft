import { Component, Input } from '@angular/core';
import { Blocks } from '@khulnasoft.com/sdk-angular';

@Component({
  selector: 'app-khulnasoft-block-with-class-name',
  standalone: true,
  imports: [Blocks],
  template: `
    <div>
      <blocks
        [blocks]="content"
        [parent]="khulnasoftBlock?.id"
        path="component.options.content"
        [className]="testClassName"
        [context]="khulnasoftContext"
        [registeredComponents]="khulnasoftComponents"
      ></blocks>
    </div>
  `,
})
export class KhulnasoftBlockWithClassNameComponent {
  testClassName = 'test-class-name';

  @Input() content: any;
  @Input() khulnasoftBlock: any;
  @Input() attributes: any;
  @Input() khulnasoftContext: any;
  @Input() khulnasoftComponents: any;
}
