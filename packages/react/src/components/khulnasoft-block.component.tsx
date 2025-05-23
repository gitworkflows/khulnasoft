/** @jsx jsx */
import { Khulnasoft, khulnasoft, KhulnasoftElement, Component } from '@khulnasoft.com/sdk';
import { ClassNames, jsx } from '@emotion/core';
import React from 'react';
import { getSizesForBreakpoints, Size, sizeNames } from '../constants/device-sizes.constant';
import { set } from '../functions/set';
import { api, stringToFunction } from '../functions/string-to-function';
import { KhulnasoftAsyncRequestsContext, RequestOrPromise } from '../store/khulnasoft-async-requests';
import { KhulnasoftStoreContext } from '../store/khulnasoft-store';
import { applyPatchWithMinimalMutationChain } from '../functions/apply-patch-with-mutation';
import { blockToHtmlString } from '../functions/block-to-html-string';
import { Link } from './Link';
import { fastClone } from '../functions/utils';
import {
  containsLocalizedValues,
  extractLocalizedValues,
} from 'src/functions/extract-localized-values';

const camelCaseToKebabCase = (str?: string) =>
  str ? str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`) : '';

const kebabCaseToCamelCase = (str = '') =>
  str.replace(/-([a-z])/g, match => match[1].toUpperCase());

const Device = { desktop: 0, tablet: 1, mobile: 2 };

// Deep clone a block but without cloning any child blocks
export function deepCloneWithConditions<T = any>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => deepCloneWithConditions(item)) as T;
  }

  if ((obj as any)['@type'] === '@khulnasoft.com/sdk:Element') {
    return obj;
  }

  const clonedObj: any = {};

  for (const key in obj) {
    if (key !== 'meta' && Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepCloneWithConditions(obj[key]);
    }
  }

  return clonedObj;
}

const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
  'textarea', // In React, we want to treat this as void (no children, otherwise React throws errors)
]);

const last = <T extends any>(arr: T[]) => arr[arr.length - 1];

function omit(obj: any, values: string[]) {
  const newObject = Object.assign({}, obj);
  for (const key of values) {
    delete newObject[key];
  }
  return newObject;
}

const cssCase = (property: string) => {
  if (!property) {
    return property;
  }

  let str = camelCaseToKebabCase(property);

  if (property[0] === property[0].toUpperCase()) {
    str = '-' + str;
  }

  return str;
};

// TODO: share these types in shared
type ElementType = any;

export interface KhulnasoftBlockProps {
  fieldName?: string;
  block: KhulnasoftElement;
  // TODO:
  // block: KhulnasoftElement
  child?: boolean;
  index?: number;
  size?: Size;
  emailMode?: boolean;
  // TODO: use context
}

function capitalize(str: string) {
  if (!str) {
    return;
  }
  return str[0].toUpperCase() + str.slice(1);
}

interface KhulnasoftBlockState {
  state: any;
  rootState: any;
  context: any;
  update: Function;
}

export class KhulnasoftBlock extends React.Component<
  KhulnasoftBlockProps,
  { hasError: boolean; updates: number }
> {
  private _asyncRequests?: RequestOrPromise[];
  private _errors?: Error[];
  private _logs?: string[];

  hydrated = false;

  state = {
    hasError: false,
    updates: 0,
  };

  private privateState: KhulnasoftBlockState = {
    state: {},
    rootState: {},
    context: {},
    update: () => {
      /* Intentionally empty */
    },
  };

  get store() {
    return this.privateState;
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Khulnasoft block error:', error, errorInfo);
  }

  // TODO: handle adding return if none provided
  // TODO: cache/memoize this (globally with LRU?)
  stringToFunction(str: string, expression = true) {
    return stringToFunction(str, expression, this._errors, this._logs);
  }

  get block() {
    return this.props.block;
  }

  emotionCss(responsiveStyles: KhulnasoftElement['responsiveStyles']) {
    let initialAnimationStepStyles: any;
    const { block } = this;
    const animation = block.animations && block.animations[0];
    if (animation && animation.trigger !== 'hover') {
      const firstStep = animation && animation.steps && animation.steps[0];
      const stepStyles = firstStep && firstStep.styles;
      if (stepStyles) {
        initialAnimationStepStyles = stepStyles;
      }
    }

    const reversedNames = sizeNames.slice().reverse();
    const styles: any = {};
    if (responsiveStyles) {
      const contentHasXSmallBreakpoint = Boolean(
        this.privateState.context.khulnasoftContent?.meta?.breakpoints?.xsmall
      );
      for (const size of reversedNames) {
        if (!contentHasXSmallBreakpoint && size === 'xsmall') {
          // Only apply xsmall styles if xsmall breakpoint is enabled on content
          continue;
        }

        if (size === 'large') {
          if (!this.props.emailMode) {
            styles[`&.khulnasoft-block`] = Object.assign(
              {},
              responsiveStyles[size],
              initialAnimationStepStyles
            );
          }
        } else {
          const sizesPerBreakpoints = getSizesForBreakpoints(
            this.privateState.context.khulnasoftContent?.meta?.breakpoints || {}
          );
          styles[`@media only screen and (max-width: ${sizesPerBreakpoints[size].max}px)`] = {
            '&.khulnasoft-block': responsiveStyles[size],
          };
        }
      }
    }

    const hoverAnimation =
      block.animations && block.animations.find(item => item.trigger === 'hover');
    if (hoverAnimation) {
      styles[':hover'] = hoverAnimation.steps?.[1]?.styles || {};
      // TODO: if manually has set transition property deal with that
      // TODO: only include properties explicitly set in the animation
      // using Object.keys(styles)
      styles.transition = `all ${hoverAnimation.duration}s ${camelCaseToKebabCase(
        hoverAnimation.easing
      )}`;
      if (hoverAnimation.delay) {
        styles.transitionDelay = hoverAnimation.delay + 's';
      }
    }

    return styles;
  }

  eval(str: string) {
    const fn = this.stringToFunction(str);
    // TODO: only one root instance of this, don't rewrap every time...
    return fn(
      this.privateState.state,
      undefined,
      this.block,
      khulnasoft,
      Device,
      this.privateState.update,
      Khulnasoft,
      this.privateState.context
    );
  }

  componentWillUnmount() {
    if (Khulnasoft.isEditing) {
      removeEventListener('message', this.onWindowMessage);
    }
  }

  onWindowMessage = (event: MessageEvent) => {
    const message = event.data;
    if (!message) {
      return;
    }
    switch (message.type) {
      case 'khulnasoft.selectionChange': {
        const { data } = message;
        if (!data) {
          break;
        }
        const { selection } = data;
        const id = this.block && this.block.id;
        if (id && Array.isArray(selection) && selection.indexOf(id) > -1) {
          setTimeout(() => {
            (window as any).$block = this;
            if (!(window as any).$blocks) {
              (window as any).$blocks = [];
            }
            (window as any).$blocks.push(this);
          });
        }
        break;
      }

      case 'khulnasoft.patchUpdates': {
        const { data } = message;
        if (!(data && data.data)) {
          break;
        }
        const patches = data.data[this.block.id!];
        if (!patches) {
          return;
        }

        if (location.href.includes('khulnasoft.debug=true')) {
          eval('debugger');
        }
        for (const patch of patches) {
          applyPatchWithMinimalMutationChain(this.props.block, patch, true);
        }
        this.setState({ updates: this.state.updates + 1 });

        break;
      }
    }
  };

  componentDidMount() {
    this.hydrated = true;
    const block = this.block;
    const animations = block && block.animations;

    if (Khulnasoft.isEditing) {
      addEventListener('message', this.onWindowMessage);
    }

    // tslint:disable-next-line:comment-format
    ///REACT15ONLY if (this.ref) { this.ref.setAttribute('khulnasoft-id', block.id); }

    if (animations) {
      const options = {
        animations: fastClone(animations),
      };

      // TODO: listen to Khulnasoft.editingMode and bind animations when editing
      // and unbind when not
      // TODO: apply bindings first
      if (block.bindings) {
        for (const key in block.bindings) {
          if (!key.trim?.()) {
            continue;
          }

          if (key.startsWith('animations.')) {
            // TODO: this needs to run in getElement bc of local state per element for repeats
            const value = this.stringToFunction(block.bindings[key]);
            if (value !== undefined) {
              set(
                options,
                key,
                value(
                  this.privateState.state,
                  null,
                  block,
                  khulnasoft,
                  null,
                  null,
                  Khulnasoft,
                  this.privateState.context
                )
              );
            }
          }
        }
      }
      Khulnasoft.animator.bindAnimations(
        options.animations
          .filter((item: any) => item.trigger !== 'hover')
          .map((animation: any) => ({
            ...animation,
            elementId: this.block.id,
          }))
      );
    }
  }

  // <!-- Khulnasoft Blocks --> in comments hmm
  getElement(index = 0, state = this.privateState.state): React.ReactNode {
    const { child, fieldName } = this.props;
    const block = this.block;
    let TagName: string | typeof Link = (block.tagName || 'div').toLowerCase();

    if (TagName === 'template') {
      const html = block.children
        ? block.children.map(item => blockToHtmlString(item)).join(' ')
        : '';
      console.debug('template html', html);
      return (
        // React has an undesired behavior (for us) for template tags, so we must
        // turn the contents into a string
        <template
          {...block.properties}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      );
    }

    let InnerComponent: any;
    const componentName =
      block.component && (block.component.name || (block.component as any).component);
    let componentInfo: Component | null = null;
    if (block.component && !(block.component as any).class) {
      if (block.component && block.component.tag) {
        InnerComponent = block.component.tag;
      } else {
        componentInfo = Khulnasoft.components.find(item => item.name === componentName) || null;
        if (componentInfo && componentInfo.class) {
          InnerComponent = componentInfo.class;
        } else if (componentInfo && componentInfo.tag) {
          InnerComponent = componentInfo.tag;
        } else {
          if (componentName?.startsWith('Khulnasoft:')) {
            console.warn(
              `Missing @khulnasoft.com/widgets installation, please install and import @khulnasoft.com/widgets to use ${
                componentName.split(':')[1]
              } in your content, more info here: https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/widgets`
            );
          } else if (componentName) {
            console.warn(
              `Missing registration for ${componentName}, have you included the registration in your bundle?`
            );
          }
        }
      }
    }

    const TextTag: any = 'span';

    let options: any = {
      ...block.properties,
      style: {},
      responsiveStyles: fastClone(block.responsiveStyles || {}),
    };

    options = {
      ...options.properties,
      ...options,
    };

    if (block.component) {
      options.component = deepCloneWithConditions(block.component);
    }

    // Binding should be properties to href or href?
    // Manual style editor show bindings
    // Show if things bound in overlays hmm
    if (block.bindings) {
      for (const key in block.bindings) {
        if (!key.trim?.()) {
          continue;
        }

        const value = this.stringToFunction(block.bindings[key]);
        // TODO: pass block, etc
        set(
          options,
          key,
          value(state, null, block, api(state), Device, null, Khulnasoft, this.privateState.context)
        );
      }
    }

    if (options.hide) {
      return null;
    } else {
      delete options.hide;
    }
    // TODO: UI for this
    if (('show' in options || (block.bindings && block.bindings.show)) && !options.show) {
      return null;
    } else {
      delete options.show;
    }

    if (block.actions) {
      for (const key in block.actions) {
        if (!key.trim?.()) {
          continue;
        }

        const value = block.actions[key];
        options['on' + capitalize(key)] = (event: any) => {
          let useState = state;
          if (typeof Proxy !== 'undefined') {
            useState = new Proxy(state, {
              set: (obj, prop, value) => {
                obj[prop] = value;
                this.privateState.rootState[prop] = value;
                return true;
              },
            });
          }
          const fn = this.stringToFunction(value, false);
          // TODO: only one root instance of this, don't rewrap every time...
          return fn(
            useState,
            event,
            this.block,
            khulnasoft,
            Device,
            this.privateState.update,
            Khulnasoft,
            this.privateState.context
          );
        };
      }
    }

    let innerComponentProperties = (options.component || options.options) && {
      ...options.options,
      ...(options.component.options || options.component.data),
    };

    if (containsLocalizedValues(innerComponentProperties)) {
      if (!this.privateState.state.locale) {
        console.warn(
          '[Khulnasoft.com] In order to use localized fields in Khulnasoft, you must pass a locale prop to the KhulnasoftComponent or to options object while fetching the content to resolve localized fields. Learn more: https://www.khulnasoft.com/c/docs/localization-inline#targeting-and-inline-localization'
        );
      }
      innerComponentProperties = extractLocalizedValues(
        innerComponentProperties,
        this.privateState.state.locale ?? 'Default'
      );
    }

    const isVoid = voidElements.has(TagName);

    const noWrap = componentInfo && (componentInfo.fragment || componentInfo.noWrap);

    const styleStr =
      options.attr?.style || (typeof options.style === 'string' ? options.style : '') || '';

    if (typeof styleStr === 'string') {
      if (typeof options.style !== 'object') {
        options.style = {};
      }

      const styleSplit = styleStr.split(';');
      for (const pair of styleSplit) {
        const stylePieces = pair.split(':');
        if (!stylePieces.length) {
          return;
        }

        let [key, value] = stylePieces;

        if (!key) {
          continue;
        }

        if (stylePieces.length > 2) {
          value = stylePieces.slice(1).join(':');
        }

        options.style[kebabCaseToCamelCase(key)] = value;
      }
    }

    const finalOptions: { [key: string]: string } = {
      ...omit(options, ['class', 'component', 'attr', 'responsiveStyles']),
      [typeof TagName === 'string' && !TagName.includes('-') ? 'className' : 'class']:
        `khulnasoft-block ${this.id}${block.class ? ` ${block.class}` : ''}${
          block.component && !(['Image', 'Video', 'Banner'].indexOf(componentName) > -1)
            ? ` khulnasoft-has-component`
            : ''
        }` +
        (options.class ? ' ' + options.class : '') +
        (this.hydrated && Khulnasoft.isEditing && this.privateState.state._spacer?.parent === block.id
          ? ' khulnasoft-spacer-parent'
          : ''),
      key: this.id + index,
      'khulnasoft-id': this.id,
      // ...(state && state.$index && typeof state.$index === 'number'
      //   ? {
      // TODO: ONLY include on repeat!
      // TODO: what if dymically repeated by another component like tabs... may not work.
      // need function to provide that right
      ...(index !== 0 && {
        'khulnasoft-index': index, // String(state.$index)
      }),
      //   }
      // : null)
    };

    // tslint:disable-next-line:comment-format
    ///REACT15ONLY finalOptions.className = finalOptions.class

    if (Khulnasoft.isEditing && this.hydrated) {
      // TODO: removed bc JS can add styles inline too?
      (finalOptions as any)['khulnasoft-inline-styles'] = !(options.attr && options.attr.style)
        ? ''
        : Object.keys(options.style).reduce(
            (memo, key) => (memo ? `${memo};` : '') + `${cssCase(key)}:${options.style[key]};`,
            ''
          );
    }

    if (
      (((finalOptions as any).properties && (finalOptions as any).properties.href) ||
        (finalOptions as any).href) &&
      TagName === 'div'
    ) {
      TagName = 'a';
    }

    if (TagName === 'a') {
      TagName = Link;
    }
    // const css = this.css

    // const styleTag = css.trim() && (
    //   <style className="khulnasoft-style">
    //     {(InnerComponent && !isBlock ? `.${this.id} > * { height: 100%; width: 100%; }` : '') +
    //       this.css}
    //   </style>
    // )

    const children = block.children || finalOptions.children || [];

    // TODO: test it out
    return (
      <React.Fragment>
        {/* <InsertSpacer id={block.id!} position="before" /> */}
        <ClassNames>
          {({ css, cx }) => {
            if (!this.props.emailMode) {
              const addClass = ' ' + css(this.emotionCss(options.responsiveStyles));
              if (finalOptions.class) {
                finalOptions.class += addClass;
              }
              if (finalOptions.className) {
                finalOptions.className += addClass;
              }
            }

            return (
              <KhulnasoftAsyncRequestsContext.Consumer>
                {value => {
                  this._asyncRequests = value && value.requests;
                  this._errors = value && value.errors;
                  this._logs = value && value.logs;
                  return isVoid ? (
                    <TagName {...finalOptions} />
                  ) : InnerComponent && (noWrap || this.props.emailMode) ? (
                    // TODO: pass the class to be easier
                    // TODO: acceptsChildren option?
                    <InnerComponent
                      // Final options maaay be wrong here hm
                      {...innerComponentProperties}
                      // should really call this khulnasoftAttributes bc people can name a
                      // componet input "attributes"
                      attributes={finalOptions}
                      khulnasoftBlock={block}
                      khulnasoftState={this.privateState}
                    />
                  ) : (
                    <TagName {...(finalOptions as any)}>
                      {InnerComponent && (
                        <InnerComponent
                          khulnasoftState={this.privateState}
                          khulnasoftBlock={block}
                          {...innerComponentProperties}
                        />
                      )}
                      {(block as any).text || options.text
                        ? options.text
                        : !InnerComponent && children && Array.isArray(children) && children.length
                          ? children.map((block: ElementType, index: number) => (
                              <KhulnasoftBlock
                                key={((this.id as string) || '') + index}
                                block={block}
                                index={index}
                                size={this.props.size}
                                fieldName={this.props.fieldName}
                                child={this.props.child}
                                emailMode={this.props.emailMode}
                              />
                            ))
                          : null}
                    </TagName>
                  );
                }}
              </KhulnasoftAsyncRequestsContext.Consumer>
            );
          }}
        </ClassNames>
        {/* <InsertSpacer id={block.id!} position="after" /> */}
      </React.Fragment>
    );
  }

  get id(): string {
    const { block } = this;
    if (block.id && !block.id.startsWith('khulnasoft')) {
      return 'khulnasoft-' + block.id;
    }
    return block.id || '';
  }

  contents(state: KhulnasoftBlockState) {
    const block = this.block;

    // this.setState(state);
    this.privateState = state;

    if (block.repeat && block.repeat.collection) {
      const collectionPath = block.repeat.collection;
      const collectionName = last((collectionPath || '').trim().split('(')[0].trim().split('.'));
      const itemName = block.repeat.itemName || (collectionName ? collectionName + 'Item' : 'item');
      const array = this.stringToFunction(collectionPath)(
        state.state,
        null,
        block,
        api(state),
        Device,
        null,
        Khulnasoft,
        this.privateState.context
      );
      if (Array.isArray(array)) {
        return array.map((data, index) => {
          // TODO: Khulnasoft state produce the data
          const childState = {
            ...state.state,
            $index: index,
            $item: data,
            [itemName]: data,
            [`$${itemName}Index`]: index,
          };

          return (
            <KhulnasoftStoreContext.Provider
              key={index}
              value={{ ...state, state: childState } as any}
            >
              {this.getElement(index, childState)}
            </KhulnasoftStoreContext.Provider>
          );
        });
      }
      return null;
    }

    return this.getElement();
  }

  render() {
    if (this.state.hasError) {
      return (
        <span
          css={{
            display: 'inline-block',
            padding: 5,
            color: '#999',
            fontSize: 11,
            fontStyle: 'italic',
          }}
        >
          Khulnasoft block error :( Check console for details
        </span>
      );
    }
    return (
      <KhulnasoftStoreContext.Consumer>{value => this.contents(value)}</KhulnasoftStoreContext.Consumer>
    );
  }
}
