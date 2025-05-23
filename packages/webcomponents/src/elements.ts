import { Khulnasoft, khulnasoft } from '@khulnasoft.com/react';
const importReact = () => import('@khulnasoft.com/react');
const importShopify = () => import('@khulnasoft.com/shopify/react');
const importShopifyJs = () => import('@khulnasoft.com/shopify/js');
const importWidgets = () => import('@khulnasoft.com/widgets');

Khulnasoft.isStatic = true;
Khulnasoft.sdkInfo = {
  name: 'webcomponents',
  // @ts-ignore
  version: global.VERSION,
};

if (typeof window !== 'undefined') {
  window.parent?.postMessage(
    {
      type: 'khulnasoft.isWcGen1Sdk',
      data: {
        // @ts-ignore
        version: global.VERSION,
      },
    },
    '*'
  );
}

function wrapInDiv(el: HTMLElement) {
  const newDiv = document.createElement('div');
  const currentChildren = Array.from(el.children);
  for (const child of currentChildren) {
    newDiv.appendChild(child);
  }
  el.appendChild(newDiv);
  return newDiv;
}

// Credit: https://stackoverflow.com/a/25673911
function wrapHistoryPropertyWithCustomEvent(property: 'pushState' | 'replaceState') {
  try {
    const anyHistory = history;
    const originalFunction = anyHistory[property];
    anyHistory[property] = function (this: History) {
      let rv = originalFunction.apply(this, arguments as any);
      let event = new CustomEvent(property, {
        detail: {
          arguments,
        },
      });
      window.dispatchEvent(event);
      return rv;
    } as any;
  } catch (err) {
    console.error('Error wrapping history method', property, err);
  }
}

let addedHistoryChangeEvent = false;
function addHistoryChangeEvent() {
  if (addedHistoryChangeEvent) {
    return;
  }
  addedHistoryChangeEvent = true;
  wrapHistoryPropertyWithCustomEvent('pushState');
  wrapHistoryPropertyWithCustomEvent('replaceState');
}

const componentName = process.env.ANGULAR ? 'khulnasoft-component-element' : 'khulnasoft-component';

const isShopify = Boolean((window as any).Shopify);

if (Khulnasoft.isIframe) {
  importReact();
  importWidgets();
  if (isShopify) {
    importShopify();
  }
  import('@khulnasoft.com/email');
}

const parsedUrl = new URL(location.href);
const injectComponent = parsedUrl.searchParams.get('khulnasoft.injectComponent');
if (injectComponent) {
  const injectElement = document.createElement('khulnasoft-component');
  injectElement.setAttribute('model', injectComponent);
  document.body.appendChild(injectElement);
}

if ((process.env.NODE_ENV as string) === 'development') {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  // tslint:disable-next-line
  import('preact/debug');
}

function onReady(cb: Function) {
  if (document.readyState !== 'loading') {
    cb();
  } else {
    document.addEventListener('DOMContentLoaded', cb as any);
  }
}

if (Khulnasoft.isBrowser && !customElements.get(componentName)) {
  const KhulnasoftWC = {
    Khulnasoft,
    khulnasoft,
  };
  (window as any).KhulnasoftWC = KhulnasoftWC;

  const { khulnasoftWcLoadCallbacks } = window as any;
  if (khulnasoftWcLoadCallbacks) {
    if (typeof khulnasoftWcLoadCallbacks === 'function') {
      try {
        khulnasoftWcLoadCallbacks(KhulnasoftWC);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        khulnasoftWcLoadCallbacks.forEach((cb: any) => {
          try {
            cb(KhulnasoftWC);
          } catch (err) {
            console.error(err);
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * Iterate over API styles and add a new FontFace for each. This works around
   * a browser issue that can cause fonts to flash from server rendered HTML
   */
  const forceLoadFonts = () => {
    try {
      const apiStyles = Array.from(document.querySelectorAll('.khulnasoft-api-styles'));

      if (!apiStyles.length || !document.fonts) {
        return;
      }

      apiStyles.forEach(element => {
        const styles = element.innerHTML;
        styles.replace(
          /(@font-face\s*{\s*font-family:\s*(.*?);[\s\S]+?url\((\S+)\)[\s\S]+?})/g,
          (fullMatch, fontMatch, fontName, fontUrl) => {
            const trimmedFontUrl = fontUrl
              .replace(/(^"|"$)/g, '')
              .replace(/(^'|'$)/g, '')
              .trim();
            const trimmedFontName = fontName
              .replace(/(^"|"$)/g, '')
              .replace(/(^'|'$)/g, '')
              .trim();

            let style = fullMatch.match(/font-style:\s*(.+)\s*;/gi)?.[1];

            // When generating `@font-face` declarations, sometimes
            // the `font-weight` rule gets generated like:
            // `font-weight: 600italic`
            // which actually indicates that the font-url referenced here is
            // the italic version of the font, so we need to extract that style
            // and mark the `FontFace` instance as `style: 'italic'`; otherwise
            // this italic version of the font gets used even if no `font-style: italic`
            // CSS rule is defined in the element.
            const fontWeightMatch = fullMatch.match(/font-weight\s*:\s*(\d*)?\s*(italic)?\s*;/);
            let weight = '400';
            if (fontWeightMatch) {
              weight = fontWeightMatch[1] || weight;
              if (fontWeightMatch[2]) {
                style = 'italic';
              }
            }

            const font = new FontFace(trimmedFontName, `url("${trimmedFontUrl}")`, {
              weight,
              style,
            });

            if (!document.fonts.has(font)) {
              document.fonts.add(font);
            }

            return '';
          }
        );
      });
    } catch (err) {
      console.warn('Could not load Khulnasoft fonts', err);
    }
  };

  const inject = () => {
    forceLoadFonts();

    const selector = '.khulnasoft-component-wrap.khulnasoft-to-embed';
    const matches = document.querySelectorAll(selector);
    for (let i = 0; i < matches.length; i++) {
      const el = matches[i];
      const attrs = el.attributes;
      const newEl = document.createElement(componentName);
      for (let i = attrs.length - 1; i >= 0; i--) {
        const attr = attrs[i];
        if (attr.name.indexOf('data-') === 0) {
          const name = attr.name.indexOf('data-') === 0 ? attr.name.slice(5) : attr.name;
          const value = attr.value;
          // TODO: allow properties too
          newEl.setAttribute(name, value);
        }
      }
      el.classList.remove('khulnasoft-to-embed');

      // Transfer children
      for (let i = 0; i < el.children.length; i++) {
        const child = el.children[i];
        child.remove();
        // newEl.appendChild(child)
      }
      el.innerHTML = '';

      el.appendChild(newEl);
    }
  };

  inject();
  onReady(inject);

  class KhulnasoftPageElement extends HTMLElement {
    private previousName = '';
    private subscriptions: Function[] = [];
    // TODO: do this in core SDK
    private trackedClick = false;
    data: any;

    khulnasoftPageRef: any;
    khulnasoftRootRef: any;

    stateOverride = {};
    context = {};

    prerender = !Khulnasoft.isEditing;

    private _options: any = {};

    get options() {
      return {
        rev: this.getAttribute('rev') || undefined,
        ...this._options,
      };
    }

    set options(options) {
      this._options = options;
    }

    get updateOnRouteChange() {
      return Boolean(
        this.hasAttribute('reload-on-route-change') &&
          !this.getAttribute('entry') &&
          this.getAttribute('reload-on-route-change') !== 'false' &&
          !Khulnasoft.isEditing
      );
    }

    get state() {
      return Object.assign(this.stateOverride, this.options?.data || {});
    }

    private getOptionsFromAttribute() {
      const options = this.getAttribute('options');

      // tslint:disable-next-line
      if (options && typeof options === 'string' && options.trim()[0] === '{') {
        // TODO: use JSON5
        this._options = JSON.parse(options);
      }

      const slot = this.getAttribute('slot');
      if (slot) {
        const options = (this._options = this._options || {});
        const query = options.query || (options.query = {});
        query['data.slot'] = slot;
      }
    }

    connected = false;

    get key() {
      const slot = this.getAttribute('slot');
      return (
        this.getAttribute('key') ||
        (slot ? `slot:${slot}` : null) ||
        (!Khulnasoft.isEditing && this.getAttribute('entry')) ||
        (this.updateOnRouteChange ? `${name}:${location.pathname}` : undefined)
      );
    }

    updateFromRouteChange = () => {
      const name = this.modelName!;
      khulnasoft
        .get(name, {
          key: this.key,
          ...this.options,
        })
        .promise()
        .then(data => {
          // tslint:disable-next-line
          this.loadPreact(data);
        });
    };

    connectedCallback() {
      if (this.connected) {
        return;
      }
      this.connected = true;

      this.dispatchEvent(
        new CustomEvent('connected', { detail: { khulnasoft, Khulnasoft }, bubbles: true })
      );

      if (Khulnasoft.isEditing && !location.href.includes('khulnasoft.stopPropagation=false')) {
        this.addEventListener('click', e => {
          e.stopPropagation();
        });
      }

      if (
        this.hasAttribute('editing-only') &&
        this.getAttribute('editing-only') !== 'false' &&
        !(Khulnasoft.isEditing || Khulnasoft.isPreviewing)
      ) {
        return;
      }

      if (this.updateOnRouteChange) {
        addHistoryChangeEvent();
        window.addEventListener('popstate', this.updateFromRouteChange);
        window.addEventListener('pushState', this.updateFromRouteChange);
        window.addEventListener('replaceState', this.updateFromRouteChange);
        this.subscriptions.push(() => {
          window.removeEventListener('popstate', this.updateFromRouteChange);
          window.removeEventListener('pushState', this.updateFromRouteChange);
          window.removeEventListener('replaceState', this.updateFromRouteChange);
        });
      }

      const prerenderAttr = this.getAttribute('prerender');
      if (prerenderAttr) {
        this.prerender = prerenderAttr === 'false' ? false : this.prerender;
      }

      window.parent?.postMessage(
        {
          type: 'khulnasoft.isReactSdk',
          data: { value: true },
        },
        '*'
      );

      this.getOptionsFromAttribute();
      this.getContent();
    }

    attributeChangedCallback() {
      // TODO: listen to properties too
      this.getOptionsFromAttribute();
      this.getContent();
    }

    disconnectedCallback() {
      this.unsubscribe();
    }

    loaded() {
      this.classList.add('khulnasoft-loaded');
    }

    get modelName() {
      return this.getAttribute('name') || this.getAttribute('model');
    }

    // When loaded from the server
    get currentContent() {
      const name = this.modelName;

      // TODO: get this to work with nested blocks
      const existing = this.querySelector(`[data-khulnasoft-component="${name}"]`);
      if (existing) {
        const id = existing.getAttribute('data-khulnasoft-content-id');
        const variationId = existing.getAttribute('data-khulnasoft-variation-id');
        if (id) {
          return {
            id,
            testVariationId: variationId || undefined,
          };
        }
      }
      return null;
    }

    getContent(fresh = false) {
      const token = this.getAttribute('token') || this.getAttribute('auth-token');
      if (token) {
        khulnasoft.authToken = token;
      }
      const key = this.getAttribute('api-key');
      if (key && key !== khulnasoft.apiKey) {
        khulnasoft.apiKey = key;
      }

      if (!khulnasoft.apiKey) {
        const subscription = khulnasoft['apiKey$'].subscribe((key?: string) => {
          if (key) {
            this.getContent();
          }
        });
        this.subscriptions.push(() => subscription.unsubscribe());

        setTimeout(() => {
          if (!khulnasoft.apiKey) {
            throw new Error(
              'Khulnasoft API key not found. Please see our docs for how to provide your API key https://khulnasoft.com/c/docs'
            );
          }
        }, 10000);

        // TODO: how test if actually editing. have a message to receive and flag that editing his happening
        if (!Khulnasoft.isIframe) {
          return;
        }
      }

      const name = this.getAttribute('name') || this.getAttribute('model');
      // TODO: only judge this on key, or remove this line entirely as the
      // SDK handles this anyway
      if (name === this.previousName && !this.getAttribute('key')) {
        return false;
      }

      const entry = this.getAttribute('entry');
      const slot = this.getAttribute('slot');

      if (!this.prerender || !khulnasoft.apiKey || fresh) {
        const currentContent = fresh ? null : this.currentContent;
        // tslint:disable-next-line
        this.loadPreact(currentContent ? currentContent : entry ? { id: entry } : null, fresh);
        return;
      }

      if (!name) {
        return false;
      }

      const currentContent = fresh ? null : this.currentContent;
      if (currentContent && !Khulnasoft.isEditing) {
        this.data = currentContent;
        // tslint:disable-next-line
        this.loaded();
        // tslint:disable-next-line
        this.loadPreact(this.data);
        return;
      }

      this.previousName = name;
      this.classList.add('khulnasoft-loading');
      let unsubscribed = false;

      khulnasoft
        .get(name, {
          key:
            this.getAttribute('key') ||
            (slot ? `slot:${slot}` : null) ||
            (!Khulnasoft.isEditing && this.getAttribute('entry')) ||
            (this.updateOnRouteChange ? `${name}:${location.pathname}` : undefined),
          entry: entry || undefined,
          ...this.options,
          prerender: true,
        })
        .promise()
        .then(
          data => {
            if (unsubscribed) {
              console.warn('Unsubscribe did not work!');
              return;
            }
            this.classList.remove('khulnasoft-loading');
            this.loaded();
            if (!data) {
              this.classList.add('khulnasoft-no-content-found');
              const loadEvent = new CustomEvent('load', { detail: data });
              this.dispatchEvent(loadEvent);
              return;
            }
            if (!this.classList.contains('khulnasoft-editor-injected')) {
              this.data = data;
              if (data.data && data.data.html) {
                this.innerHTML = data.data.html;
                this.findAndRunScripts();

                const loadEvent = new CustomEvent('htmlload', { detail: data });
                this.dispatchEvent(loadEvent);
              }

              // tslint:disable-next-line
              this.loadPreact(data);
            }
          },
          (_error: any) => {
            // Server render failed, not the end of the world, load react anyway
            // tslint:disable-next-line
            this.loadPreact();
          }
        );
    }

    setContext(context: any) {
      this.context = context || {};
    }

    setState(state: any) {
      this.stateOverride = state || {};
      if (this.khulnasoftPageRef) {
        Object.assign(this.khulnasoftPageRef.state.state, this.state);
      }
    }

    findAndRunScripts() {
      const scripts = this.getElementsByTagName('script');
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

    loadPreact = async (data?: any, fresh = false) => {
      const entry = data?.id || this.getAttribute('entry');

      const name =
        this.getAttribute('name') || this.getAttribute('model') || this.getAttribute('model-name');

      const getReactPromise = importReact(); // TODO: only import what needed based on what comes back
      const getWidgetsPromise = importWidgets();
      const getShopifyPromise = isShopify ? importShopify() : null;
      const getShopifyJsPromise = isShopify ? importShopifyJs() : null;
      // TODO: only load shopify if needed

      let emailPromise: Promise<any> | null = null;

      const email = Boolean(
        name === 'email' ||
          this.getAttribute('email-mode') ||
          this.getAttribute('format') === 'email' ||
          (this.options && this.options.format === 'email')
      );

      if (email) {
        emailPromise = import('@khulnasoft.com/email');
      }

      const slot = this.getAttribute('slot');

      const hasFullData = Boolean(data?.data?.blocks);
      if (
        (!this.prerender && !this.currentContent) ||
        (Khulnasoft.isIframe && (!khulnasoft.apiKey || khulnasoft.apiKey === 'DEMO')) ||
        hasFullData
      ) {
        const { KhulnasoftPage } = await getReactPromise;
        await getWidgetsPromise;
        if (isShopify) {
          await getShopifyPromise;
        }

        let shopify: any;
        if (isShopify) {
          const { Shopify } = await getShopifyJsPromise!;
          shopify = new Shopify({});
        }
        // Ensure styles don't load twice
        KhulnasoftPage.renderInto(
          wrapInDiv(this),
          {
            ...({ ref: (ref: any) => (this.khulnasoftPageRef = ref) } as any),
            modelName: name!,
            context: Object.assign(this.context, {
              ...(isShopify && {
                shopify,
                liquid: shopify.liquid,
              }),
              apiKey: khulnasoft.apiKey,
            }),
            data: this.state,
            entry,
            emailMode: (this.options || {}).emailMode || this.getAttribute('email-mode') === 'true',
            options: {
              ...this.options,
              key: this.key,
            },
            ...(hasFullData && {
              content: data,
            }),
          },
          this.getAttribute('hydrate') !== 'false',
          fresh
        );
        return;
      }

      khulnasoft
        .get(name!, {
          key:
            this.getAttribute('key') ||
            (slot ? `slot:${slot}` : null) ||
            (Khulnasoft.isEditing
              ? name!
              : this.getAttribute('entry') ||
                (this.updateOnRouteChange ? `${name}:${location.pathname}` : undefined)),
          ...this.options,
          entry: data ? data.id : this.options.entry || undefined,
          prerender: false,
        })
        .promise()
        .then(
          async data => {
            const { KhulnasoftPage } = await getReactPromise;
            await getWidgetsPromise;
            if (isShopify) {
              await getShopifyPromise;
            }

            if (emailPromise) {
              await emailPromise;
            }

            const loadEvent = new CustomEvent('load', { detail: data });
            this.dispatchEvent(loadEvent);
            let shopify: any;
            if (isShopify) {
              const { Shopify } = await getShopifyJsPromise!;
              shopify = new Shopify({});
            }

            KhulnasoftPage.renderInto(
              wrapInDiv(this),
              {
                ...({ ref: (ref: any) => (this.khulnasoftPageRef = ref) } as any),
                modelName: name!,
                context: Object.assign(this.context, {
                  ...(isShopify && {
                    shopify,
                    liquid: shopify.liquid,
                  }),
                  apiKey: khulnasoft.apiKey,
                }),
                emailMode:
                  (this.options || {}).emailMode || this.getAttribute('email-mode') === 'true',
                entry: data ? data.id : entry,
                data: this.state,
                options: {
                  entry: data ? data.id : entry,
                  initialContent: data ? [data] : undefined,
                  // TODO: make this a settable property too
                  key:
                    this.getAttribute('key') ||
                    (slot ? `slot:${slot}` : null) ||
                    (Khulnasoft.isEditing
                      ? name!
                      : (data && data.id) ||
                        (this.updateOnRouteChange ? `${name}:${location.pathname}` : undefined)),
                  ...this.options,
                },
              },
              this.getAttribute('hydrate') !== 'false', // TODO: query param override khulnasoft.hydrate
              fresh
            );

            if (Khulnasoft.isIframe) {
              setTimeout(() => {
                parent.postMessage({ type: 'khulnasoft.updateContent' }, '*');
                setTimeout(() => {
                  parent.postMessage(
                    { type: 'khulnasoft.sdkInjected', data: { modelName: name } },
                    '*'
                  );
                }, 100);
              }, 100);
            }
          },
          async (error: any) => {
            if (Khulnasoft.isEditing) {
              const { KhulnasoftPage } = await getReactPromise;
              await getWidgetsPromise;
              if (isShopify) {
                await getShopifyPromise;
              }
              if (emailPromise) {
                await emailPromise;
              }
              let shopify: any;
              if (isShopify) {
                const { Shopify } = await getShopifyJsPromise!;
                shopify = new Shopify({});
              }
              KhulnasoftPage.renderInto(
                wrapInDiv(this),
                {
                  ...({
                    ref: (ref: any) => (this.khulnasoftPageRef = ref),
                  } as any),
                  context: Object.assign(this.context, {
                    ...(isShopify && {
                      shopify,
                      liquid: shopify.liquid,
                    }),
                    apiKey: khulnasoft.apiKey,
                  }),
                  modelName: name!,
                  entry: data ? data.id : entry,
                  data: this.state,
                  emailMode:
                    (this.options || {}).emailMode || this.getAttribute('email-mode') === 'true',
                  options: {
                    entry: data ? data.id : entry,
                    initialContent: data ? [data] : undefined,
                    key:
                      this.getAttribute('key') ||
                      (slot ? `slot:${slot}` : null) ||
                      (Khulnasoft.isEditing
                        ? name!
                        : (data && data.id) ||
                          (this.updateOnRouteChange ? `${name}:${location.pathname}` : undefined)),

                    ...this.options,
                    // TODO: specify variation?
                  },
                  fresh,
                },
                this.getAttribute('hydrate') !== 'false'
              );
            } else {
              console.warn('Khulnasoft webcomponent error:', error);
              this.classList.add('khulnasoft-errored');
              this.classList.add('khulnasoft-loaded');
              this.classList.remove('khulnasoft-loading');
              const errorEvent = new CustomEvent('error', { detail: error });
              this.dispatchEvent(errorEvent);
            }
          }
        );
    };

    unsubscribe() {
      if (this.subscriptions) {
        this.subscriptions.forEach(fn => fn());
        this.subscriptions = [];
      }
    }
  }

  customElements.define(componentName, KhulnasoftPageElement);

  class KhulnasoftInit extends HTMLElement {
    init() {
      const key = this.getAttribute('api-key') || this.getAttribute('key');
      const canTrack = this.getAttribute('canTrack') !== 'false';
      if (key && khulnasoft.apiKey !== key) {
        khulnasoft.apiKey = key;
      }
      if (khulnasoft.canTrack !== canTrack) {
        khulnasoft.canTrack = canTrack;
      }
    }

    connectedCallback() {
      this.init();
    }

    attributeChangedCallback() {
      this.init();
    }
  }

  customElements.define('khulnasoft-init', KhulnasoftInit);
}

type KhulnasoftBlocksProps =
  import('@khulnasoft.com/react/dist/types/src/components/khulnasoft-blocks.component').KhulnasoftBlocksProps;

if (Khulnasoft.isBrowser && !customElements.get('khulnasoft-blocks-slot')) {
  class KhulnasoftBlocksSlot extends HTMLElement {
    props?: KhulnasoftBlocksProps;
    khulnasoftState: any;
    setProps(props: KhulnasoftBlocksProps, khulnasoftState: any) {
      this.props = props;
      this.khulnasoftState = khulnasoftState;
      this.render();
    }
    async render() {
      const { KhulnasoftBlocks } = await importReact();
      KhulnasoftBlocks.renderInto(wrapInDiv(this), this.props, this.khulnasoftState);
    }
  }
  customElements.define('khulnasoft-blocks-slot', KhulnasoftBlocksSlot);
}

window.dispatchEvent(new CustomEvent('khulnasoft:load', { detail: { khulnasoft, Khulnasoft } }));
