import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GetContentOptions, Khulnasoft } from '@khulnasoft.com/sdk';
import { KhulnasoftService } from '../../services/khulnasoft.service';

@Component({
  selector: 'khulnasoft-blocks',
  templateUrl: './khulnasoft-blocks.component.html',
  styleUrls: ['./khulnasoft-blocks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KhulnasoftBlocksComponent {
  @Input() blocks: any;

  @Input() child = false;
  @Input() prerender = true;
  @Input() model = '';
  @Input() key = '';

  @Input() options: GetContentOptions | null = null;

  // @deprecated
  @Input() field = '';

  @Input() breakpoints: any;

  constructor(private domSanitizer: DomSanitizer, private khulnasoft: KhulnasoftService) {}

  private lastInnerHtml = '';
  private lastInnerHtmlSanitized: SafeHtml | null = null;

  get hasNoChildren() {
    return !(this.blocks && (this.blocks.length || this.blocks.html));
  }

  get arrayBlocks() {
    return Array.isArray(this.blocks);
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
    // TODO: pass options too
    if (!this.prerender || Khulnasoft.isEditing) {
      return `<khulnasoft-component-element prerender="false" ${
        !this.model ? '' : `name="${this.model}"`
      }></khulnasoft-component-element>`;
    }

    const elStr = `<khulnasoft-component-element prerender="false" ${
      !this.model ? '' : `name="${this.model}"`
    }></khulnasoft-component-element>`;

    if (this.arrayBlocks || !this.blocks) {
      return elStr;
    }

    if (!this.blocks.html) {
      return elStr;
    }

    const css = this.blocks.css;
    let html = this.blocks.html;
    if (this.breakpoints) {
      if (this.breakpoints.small) {
        html = html.replace(/max-width:640/g, `max-width:${this.breakpoints.small}`);
      }
      if (this.breakpoints.medium) {
        html = html.replace(/max-width:991/g, `max-width:${this.breakpoints.medium}`);
      }
    }

    if (css) {
      html = `<style class="khulnasoft-styles">${css}</style>` + html;
    }

    return `<khulnasoft-component-element key="${this.key || this.model}" options='${JSON.stringify(
      this.options || null // TODO: HTML encode
    )}' prerender="false" rev="${this.blocks.rev || ''}" ${
      !this.model ? '' : `name="${this.model}"`
    }>${html as string}</khulnasoft-component-element>`;
  }

  trackByFn(index: number, value: any) {
    // TODO: possibly json-stable-stringify
    return value.id || (value.component && value.component.id) || JSON.stringify(value);
  }
}
