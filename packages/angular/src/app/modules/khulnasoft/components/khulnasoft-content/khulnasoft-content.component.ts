import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Khulnasoft, GetContentOptions } from '@khulnasoft.com/sdk';
import { KhulnasoftService } from '../../services/khulnasoft.service';
import { KhulnasoftComponentService } from '../khulnasoft-component/khulnasoft-component.service';

@Component({
  selector: 'khulnasoft-content',
  templateUrl: './khulnasoft-content.component.html',
  styleUrls: ['./khulnasoft-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KhulnasoftContentComponent implements OnInit, OnDestroy {
  constructor(
    private element: ElementRef,
    private khulnasoftComponentService: KhulnasoftComponentService
  ) {
    khulnasoftComponentService.contentComponentInstance = this;
  }

  modelName?: string;

  @Input() useHtml = false;
  @Input() data: any = {};
  @Input() hydrate = true;
  @Input() prerender = true;

  @Input() set content(content) {
    const currentContent = this._content;
    this._content = content;
    const { contentDirectiveInstance } = this.khulnasoftComponentService;
    if (!currentContent && content && contentDirectiveInstance) {
      if (!contentDirectiveInstance.requesting) {
        contentDirectiveInstance.reset();
      }
    }
  }
  get content() {
    return this._content;
  }
  private _content: any;

  findAndRunScripts() {
    if (!Khulnasoft.isBrowser) {
      return;
    }
    const el = this.element.nativeElement;

    if (el) {
      const scripts = el.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        if (script.src) {
          const newScript = document.createElement('script');
          newScript.async = true;
          newScript.src = script.src;
          document.head.appendChild(newScript);
        } else {
          try {
            new Function(script.innerText)();
          } catch (error) {
            console.warn('Khulnasoft custom code component error:', error);
          }
        }
      }
    }
  }

  @Input() options: GetContentOptions | null = null;

  @Output() contentLoad = new EventEmitter<any>();
  @Output() contentError = new EventEmitter<any>();

  get editingMode() {
    return Khulnasoft.editingPage;
  }

  ngOnInit() {
    const modelName =
      this.element.nativeElement &&
      (this.element.nativeElement as HTMLElement).getAttribute &&
      (this.element.nativeElement as HTMLElement).getAttribute('khulnasoft-model');
    if (modelName) {
      // FIXME: doesn't work on server!
      this.modelName = modelName;
      KhulnasoftService.componentInstances[modelName] = this;
    }
  }

  ngOnDestroy() {
    if (this.modelName) {
      if (KhulnasoftService.componentInstances[this.modelName] === this) {
        delete KhulnasoftService.componentInstances[this.modelName];
      }
    }
  }
}
