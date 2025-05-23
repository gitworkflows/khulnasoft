import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Optional,
  OnDestroy,
  OnInit,
  OnChanges,
  ViewContainerRef,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { KhulnasoftComponentService } from './khulnasoft-component.service';
import { GetContentOptions, Khulnasoft } from '@khulnasoft.com/sdk';
import { Subscription, BehaviorSubject } from 'rxjs';
import { KhulnasoftService } from '../../services/khulnasoft.service';
import { ANGULAR_LATEST_VERSION, SCRIPT_ID } from '../../utils/constants';

function omit<T extends object>(obj: T, ...values: (keyof T)[]): Partial<T> {
  const newObject = Object.assign({}, obj);
  for (const key of values) {
    delete (newObject as any)[key];
  }
  return newObject;
}

let wcScriptInserted = false;
const NAVIGATION_TIMEOUT_DEFAULT = 1000;

function delay<T = any>(duration: number, resolveValue?: T) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(resolveValue!), duration));
}

export interface RouteEvent {
  /**
   * Url being routed to
   */
  url: string;
  /**
   * Html anchor element the href is on that
   * caused the route
   */
  anchorNode: HTMLAnchorElement;
  /**
   * Has preventDefault() been called preventing
   * khulnasoft from routing to the clicked URL
   */
  defaultPrevented: boolean;
  /**
   * Prevents khulnasoft from handling routing for you to handle
   * yourself
   */
  preventDefault(): void;
}

@Component({
  selector: 'khulnasoft-component',
  templateUrl: './khulnasoft-component.component.html',
  styleUrls: ['./khulnasoft-component.component.css'],
  providers: [KhulnasoftComponentService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KhulnasoftComponentComponent implements OnDestroy, OnInit, OnChanges {
  @Input() model: string | undefined /* THIS IS ACTUALLY REQUIRED */;

  @Input() set name(name: string | undefined) {
    this.model = name;
  }

  @Input() handleRouting = true;
  @Input() reloadOnRoute = true;

  @Output() load = new EventEmitter<any>();
  @Output() route = new EventEmitter<RouteEvent>();
  @Output() error = new EventEmitter<any>();
  @Input() content: any = null;
  @Input() options: GetContentOptions | null = null;

  @Input() data: any = {};
  @Input() context: any = {};
  @Input() hydrate = true;
  @Input() prerender = true;

  // Sometimes user will have slow connection and when we are using Resolver on target route
  // then, application will be fully reloaded. In that case set it to false to avoid full-reload navigation.
  @Input() navigationTimeout: number | boolean = NAVIGATION_TIMEOUT_DEFAULT;

  subscriptions = new Subscription();

  visible = new BehaviorSubject(true);

  private get url() {
    const location = this.khulnasoftService.getLocation();
    return location.pathname || '';
  }

  get key() {
    const key = Khulnasoft.isEditing || !this.reloadOnRoute ? this.model : `${this.model}:${this.url}`;
    return key;
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef,
    private khulnasoftService: KhulnasoftService,
    @Optional() private router?: Router
  ) {}

  async ensureWCScriptLoaded() {
    if (!Khulnasoft.isBrowser || wcScriptInserted || document.getElementById(SCRIPT_ID)) {
      return;
    }
    function getQueryParam(url: string, variable: string) {
      const query = url.split('?')[1] || '';
      const vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
          return decodeURIComponent(pair[1]);
        }
      }
      return null;
    }
    const script = document.createElement('script');
    const wcVersion = getQueryParam(location.href, 'khulnasoft.wcVersion') || ANGULAR_LATEST_VERSION;
    script.id = SCRIPT_ID;
    // TODO: detect khulnasoft.wcVersion and if customEleemnts exists and do
    // dynamic versions and lite here
    script.src = `https://cdn.khulnasoft.com/js/webcomponents@${
      wcVersion || 'latest'
    }/dist/system/angular/khulnasoft-webcomponents-async.js`;
    script.async = true;
    wcScriptInserted = true;
    return new Promise((resolve, reject) => {
      script.addEventListener('load', resolve);
      script.addEventListener('error', (e) => reject(e.error));
      document.head.appendChild(script);
    });
  }

  async ensureWcLoadedAndUpdate() {
    await this.ensureWCScriptLoaded();
    const { onKhulnasoftWcLoad } = window as any;
    if (onKhulnasoftWcLoad) {
      onKhulnasoftWcLoad((KhulnasoftWC: any) => {
        const khulnasoft = KhulnasoftWC.khulnasoft as Khulnasoft;
        khulnasoft.apiKey = this.khulnasoftService.apiKey;
        khulnasoft.canTrack = this.khulnasoftService.canTrack;
        khulnasoft.setUserAttributes(omit(this.khulnasoftService.getUserAttributes(), 'urlPath'));
        this.khulnasoftService.userAttributesChanged.subscribe((attrs) =>
          khulnasoft.setUserAttributes(attrs)
        );
        this.triggerstateChange();
      });
    }
  }

  ngOnInit() {
    if (this.router && this.reloadOnRoute) {
      // TODO: should the inner function return reloadOnRoute?
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    if (Khulnasoft.isBrowser) {
      if (this.router) {
        this.subscriptions.add(
          this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              if (this.reloadOnRoute) {
                // Force reload component
                this.visible.next(false);
                Khulnasoft.nextTick(() => {
                  this.visible.next(true);
                });
              }
            }
          })
        );
      }
      this.subscriptions.add(
        this.load.subscribe(async (value: any) => {
          // TODO: this may run constantly when editing - check on this, not
          // end of world but not ideal for perf
          this.viewContainer.detach();
          if (Khulnasoft.isEditing || (value && value.data && this.hydrate !== false)) {
            await this.ensureWcLoadedAndUpdate();
          }
        })
      );
    }

    if (Khulnasoft.isBrowser && (this.hydrate !== false || Khulnasoft.isEditing)) {
      this.ensureWcLoadedAndUpdate();
    }
  }

  async triggerstateChange() {
    const query = `khulnasoft-component-element[name="${this.model}"]`;
    const element: any = document.querySelector(query);
    if (element) {
      customElements.whenDefined('khulnasoft-component-element').then(() => {
        element.setState(this.data);
        element.setContext(this.context);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.triggerstateChange();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // TODO: this should be in KhulnasoftBlocks
  async onClick(event: MouseEvent) {
    if (!this.handleRouting) {
      return;
    }

    if (event.button !== 0 || event.ctrlKey || event.defaultPrevented) {
      // If this is a non-left click, or the user is holding ctr/cmd, or the url is absolute,
      // or if the link has a target attribute, don't route on the client and let the default
      // href property handle the navigation
      return;
    }

    const hrefTarget = this.findHrefTarget(event);
    if (!hrefTarget) {
      return;
    }

    // target="_blank" or target="_self" etc
    if (hrefTarget.target) {
      return;
    }

    let href = hrefTarget.getAttribute('href');
    if (!href) {
      return;
    }

    if (href.startsWith('javascript:')) {
      return;
    }

    const routeEvent: RouteEvent = {
      url: href,
      anchorNode: hrefTarget,
      preventDefault() {
        this.defaultPrevented = true;
      },
      defaultPrevented: false,
    };
    this.route.next(routeEvent);

    if (routeEvent.defaultPrevented) {
      event.preventDefault();
      return;
    }

    if (event.metaKey) {
      return;
    }

    if (!this.isRelative(href)) {
      const converted = this.convertToRelative(href);
      if (converted) {
        href = converted;
      } else {
        return;
      }
    }

    if (!this.router) {
      return;
    }

    // Otherwise if this url is relative, navigate on the client
    event.preventDefault();

    // Attempt to route on the client
    let success: boolean | null = null;
    const routePromise = this.router.navigateByUrl(href);

    const useNavigationTimeout = !(
      typeof this.navigationTimeout === 'boolean' && !this.navigationTimeout
    );
    const timeoutPromise = delay(
      typeof this.navigationTimeout === 'number'
        ? this.navigationTimeout
        : NAVIGATION_TIMEOUT_DEFAULT,
      false
    );

    try {
      const promiseRace = useNavigationTimeout ? [timeoutPromise, routePromise] : [routePromise];
      success = await Promise.race(promiseRace);
    } finally {
      // This is in a click handler so it will only run on the client
      if (success) {
        // If successful scroll the window to the top
        window.scrollTo(0, 0);
      } else {
        // Otherwise handle the routing with a page refresh on failure. Angular, by deafult
        // if it fails to load a URL (e.g. if an API request failed when loading it), instead
        // of navigating to the new page to tell the user that their click did something but
        // the resulting page has an issue, it instead just silently fails and shows the user
        // nothing. Lets make sure we route to the new page. In some cases this even brings the
        // user to a correct and valid page anyway
        location.href = `${location.protocol}//${location.host}${href}`;
      }
    }
  }

  private isRelative(href: string) {
    return (
      !href.match(/^(\/\/|https?:\/\/)/i) &&
      // Handle Mailto and Tel links
      !href.startsWith('tel:') &&
      !href.startsWith('mailto:') &&
      // Handle local hash links
      !href.startsWith('#')
    );
  }

  // Attempt to convert an absolute url to relative if possible (aka if the hosts match)
  private convertToRelative(href: string) {
    const currentUrl = new URL(location.href);
    const hrefUrl = new URL(href);

    if (currentUrl.host === hrefUrl.host) {
      const relativeUrl = hrefUrl.pathname + (hrefUrl.search ? hrefUrl.search : '');
      return relativeUrl;
    }
  }

  private findHrefTarget(event: MouseEvent): HTMLAnchorElement | null {
    let element = event.target as HTMLElement | null;

    while (element) {
      if (element instanceof HTMLAnchorElement && element.getAttribute('href')) {
        return element;
      }

      if (element === event.currentTarget) {
        break;
      }

      element = element.parentElement;
    }

    return null;
  }
}
