import { CommonModule } from '@angular/common';
// fails because type imports cannot be injected
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'dynamic-div, DynamicDiv',
  template: `
    <div
      #v
      (click)="onClick && onClick($event)"
      (mouseenter)="onMouseEnter && onMouseEnter($event)"
    >
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  styles: [
    ':host { display: contents; }',
    '.props-blocks-wrapper { display: flex; flex-direction: column; align-items: stretch; }',
  ],
})
export default class DynamicDiv {
  @Input() attributes: any;
  @Input() actionAttributes: any;
  @Input() BlockWrapperProps: any;
  @Input('khulnasoft-path') khulnasoftPath: any;
  @Input('khulnasoft-parent-id') khulnasoftParentId: any;
  @Input() BlocksWrapperProps: any;
  @Input() contentWrapperProps: any;
  @Input('khulnasoft-model') khulnasoftModel: any;
  @Input('khulnasoft-content-id') khulnasoftContentId: any;
  @Input() ref: any;
  @Input('class') classProp: any;
  @Input() style: any;
  @Input() showContentProps: any;
  @Input() onClick: any;
  @Input() onMouseEnter: any;
  @Input() onKeyPress: any;
  @Input() hidden: any;
  @Input('aria-hidden') ariaHidden: any;
  @Input() className: any;

  @ViewChild('v', { read: ElementRef })
  v!: ElementRef;

  private _listenerFns = new Map<string, () => void>();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const el = this.v?.nativeElement;
    if (!el) {
      return;
    }
    this.setAttributes(el, this.attributes);
    this.setAttributes(el, this.actionAttributes);
    this.setAttributes(el, this.showContentProps);
    this.setAttribute(
      el,
      'class',
      [this.classProp ?? '', this.className ?? ''].join(' ').trim()
    );
    this.handleStyleProp(el, this.style);
    this.setAttribute(el, 'khulnasoft-parent-id', this.khulnasoftParentId);
    this.setAttribute(el, 'khulnasoft-path', this.khulnasoftPath);
    this.setAttribute(el, 'khulnasoft-model', this.khulnasoftModel);
    this.setAttribute(el, 'khulnasoft-content-id', this.khulnasoftContentId);
    this.setAttribute(el, 'hidden', this.hidden);
    this.setAttribute(el, 'aria-hidden', this.ariaHidden);
  }

  ngOnChanges(changes) {
    const el = this.v?.nativeElement;
    if (!el) {
      return;
    }

    if (Object.keys(changes).length === 0) {
      return;
    }

    if (changes.attributes) {
      this.setAttributes(el, this.attributes, changes.attributes.currentValue);
    }
    if (changes.actionAttributes) {
      this.setAttributes(
        el,
        this.actionAttributes,
        changes.actionAttributes.currentValue
      );
    }
    if (changes.showContentProps) {
      this.setAttributes(
        el,
        this.showContentProps,
        changes.showContentProps.currentValue
      );
    }
    if (changes.classProp || changes.className) {
      this.setAttribute(
        el,
        'class',
        [this.classProp ?? '', this.className ?? ''].join(' ').trim()
      );
    }
    if (changes.style) this.handleStyleProp(el, this.style);
    if (changes.khulnasoftParentId)
      this.setAttribute(el, 'khulnasoft-parent-id', this.khulnasoftParentId);
    if (changes.khulnasoftPath)
      this.setAttribute(el, 'khulnasoft-path', this.khulnasoftPath);
    if (changes.khulnasoftModel)
      this.setAttribute(el, 'khulnasoft-model', this.khulnasoftModel);
    if (changes.khulnasoftContentId)
      this.setAttribute(el, 'khulnasoft-content-id', this.khulnasoftContentId);
    if (changes.hidden) this.setAttribute(el, 'hidden', this.hidden);
    if (changes.ariaHidden)
      this.setAttribute(el, 'aria-hidden', this.ariaHidden);
  }

  private setAttributes(el: any, value: any, changes?: any) {
    if (!el) return;

    const target = changes ? changes : value;

    if (!target) return;

    Object.keys(target).forEach((key) => {
      if (key.startsWith('on')) {
        if (this._listenerFns.has(key)) {
          this._listenerFns.get(key)!();
        }
        this._listenerFns.set(
          key,
          this.renderer.listen(
            el,
            key.replace('on', '').toLowerCase(),
            target[key]
          )
        );
      } else {
        this.renderer.setAttribute(el, key, target[key] ?? '');
      }
    });
  }

  private setAttribute(el: HTMLElement, key: string, value: any) {
    if (value) {
      this.renderer.setAttribute(el, key, value);
    }
  }

  private handleStyleProp(el: HTMLElement, style: any) {
    if (!style) return;
    if (typeof style === 'object') {
      Object.entries(style).forEach(([key, value]) => {
        this.renderer.setStyle(el, key, value);
      });
    } else {
      this.renderer.setAttribute(el, 'style', style);
    }
  }

  ngOnDestroy() {
    this._listenerFns.forEach((fn) => fn());
  }
}
