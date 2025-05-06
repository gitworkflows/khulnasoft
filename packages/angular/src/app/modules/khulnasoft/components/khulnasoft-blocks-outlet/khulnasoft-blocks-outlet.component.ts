import {
  Component,
  Input,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnInit,
  OnChanges,
  // ViewContainerRef,
  // ElementRef,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Khulnasoft } from '@khulnasoft.com/sdk';

interface KhulnasoftBlocksProps {
  blocks?: any[];
  child?: boolean;
  parentElementId?: string;
  dataPath?: string;
}

@Component({
  selector: 'khulnasoft-blocks-outlet',
  templateUrl: './khulnasoft-blocks-outlet.component.html',
  styleUrls: ['./khulnasoft-blocks-outlet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KhulnasoftBlocksOutletComponent implements AfterViewInit, OnChanges {
  @Input()
  khulnasoftBlock: any;

  @Input()
  khulnasoftState: any;

  @Input()
  blocks: any;

  @Input()
  renderOnChange = true;

  @Input()
  dataPath: string | undefined;

  lastInnerHtml = '';
  lastInnerHtmlSanitized?: SafeHtml;

  get options(): KhulnasoftBlocksProps {
    return {
      child: true,
      parentElementId: this.khulnasoftBlock.id,
      blocks: this.blocks,
      dataPath: this.dataPath,
    };
  }

  get key() {
    return this.khulnasoftBlock.id + this.dataPath;
  }

  get innerHtml() {
    const html = this._innerHtml;
    if (html === this.lastInnerHtml) {
      return this.lastInnerHtmlSanitized || '';
    }

    this.lastInnerHtml = html;
    this.lastInnerHtmlSanitized = this.domSanitizer.bypassSecurityTrustHtml(html);

    return this.lastInnerHtmlSanitized;
  }

  get _innerHtml() {
    return `<khulnasoft-blocks-slot key="${this.key}"></khulnasoft-blocks-slot>`;
  }

  constructor(private domSanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    if (Khulnasoft.isBrowser) {
      this.triggerstateChange();
    }
  }

  async triggerstateChange() {
    const query = `khulnasoft-blocks-slot[key="${this.key}"]`;
    const element: any = document.querySelector(query);
    if (element) {
      await customElements.whenDefined('khulnasoft-blocks-slot');
      element.setProps(this.options, this.khulnasoftState);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blocks && this.renderOnChange) {
      this.triggerstateChange();
    }
  }
}
