const traverse = require('traverse');
const seedrandom = require('seedrandom');
const rng = seedrandom('vue-sdk-seed');

/**
 * @typedef {import('@khulnasoft.com/mitosis')} Mitosis
 * @typedef {import('@khulnasoft.com/mitosis').MitosisNode} MitosisNode
 * @typedef {import('@khulnasoft.com/mitosis').StateValue} StateValue
 * @typedef {import('@khulnasoft.com/mitosis').MitosisConfig} MitosisConfig
 * @typedef {import('@khulnasoft.com/mitosis').MitosisPlugin} Plugin
 * @typedef {import('@khulnasoft.com/mitosis').OnMountHook} OnMountHook
 */

const getSeededId = () => {
  const rngVal = rng();
  return Number(String(rngVal).split('.')[1]).toString(36);
};

/**
 * @param {any} x
 * @returns {x is MitosisNode}
 */
const isMitosisNode = (x) => x && x['@type'] === '@khulnasoft.com/mitosis/node';

/**
 * @param {string} string
 */
const kebabCase = (string) =>
  string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @type {MitosisConfig['getTargetPath']}
 */
const getTargetPath = ({ target }) => {
  switch (target) {
    case 'rsc':
      return 'nextjs';
    default:
      return kebabCase(target);
  }
};

/**
 * @type {Plugin}
 */
const SRCSET_PLUGIN = () => ({
  code: {
    pre: (code) => {
      // workaround until we resolve
      // https://github.com/KhulnasoftIO/mitosis/issues/526
      return code.replace(/srcset=/g, 'srcSet=');
    },
  },
});

/**
 * @type {Plugin}
 */
const FETCHPRIORITY_CAMELCASE_PLUGIN = () => ({
  code: {
    pre: (code) => {
      return code.replace(/fetchpriority=/g, 'fetchPriority=');
    },
  },
});

/**
 * Replaces all uses of the native `Text` component with our own `BaseText` component that injects inherited CSS styles
 * to `Text`, mimicking CSS inheritance.
 * @type {Plugin}
 */
const BASE_TEXT_PLUGIN = () => ({
  code: {
    pre: (code) => {
      if (code.includes('BaseText')) {
        return `
import BaseText from '../../blocks/BaseText';
${code}
`;
      }

      if (code.includes('<Text>') && !code.includes('InlinedStyles')) {
        const importStatement = `import BaseText from '../../blocks/BaseText';`;
        // we put the import statement after the first line so the `use client` comment stays at the top.
        // probably doesn't matter but just in case
        const [firstLine, ...restOfCode] = code.split('\n');
        return `
${firstLine}
${importStatement}
${restOfCode.join('\n').replace(/<(\/?)Text(.*?)>/g, '<$1BaseText$2>')}
`;
      }
      return code;
    },
  },
});

const REMOVE_MAGIC_PLUGIN = () => ({
  json: {
    post: (json) => {
      traverse(json).forEach(function (item) {
        if (!isMitosisNode(item)) return;

        for (const [key, _value] of Object.entries(item.properties)) {
          if (key === 'MAGIC') {
            delete item.properties[key];
          }
        }
      });

      return json;
    },
  },
});

const REMOVE_SET_CONTEXT_PLUGIN_FOR_FORM = () => ({
  code: {
    post: (code) => {
      return code.replace(
        `props.setKhulnasoftContext((PREVIOUS_VALUE) => ({
        ...PREVIOUS_VALUE,
        rootState: combinedState,
      }));`,
        'props.khulnasoftContext.rootState = combinedState;'
      );
    },
  },
});

const target = process.argv
  .find((arg) => arg.startsWith('--target='))
  ?.split('=')[1];

const targets = target
  ? [target]
  : [
      'reactNative',
      'rsc',
      'vue',
      'solid',
      'svelte',
      'react',
      'qwik',
      'angular',
    ];

/**
 * @type {Plugin}
 */
const ADD_IS_STRICT_STYLE_MODE_TO_CONTEXT_PLUGIN = () => ({
  json: {
    pre: (json) => {
      if (json.name !== 'ContentComponent') return json;

      json.state.khulnasoftContextSignal.code =
        json.state.khulnasoftContextSignal.code.replace(
          /^\s*{/,
          '{strictStyleMode: props.strictStyleMode,'
        );

      return json;
    },
  },
});

const MEMOIZING_BLOCKS_COMPONENT_PLUGIN = () => ({
  json: {
    post: (json) => {
      if (json.name === 'Block') {
        json.imports.push({
          imports: { memo: 'memo' },
          path: 'react',
        });
      }
      if (json.name === 'Blocks') {
        json.imports.push({
          imports: { memo: 'memo' },
          path: 'react',
        });

        json.hooks.init = {
          code: `
            ${json.hooks.init?.code || ''}
            const renderItem = React.useCallback(({ item }: { item: any }) => (
              <Block
                block={item}
                linkComponent={props.linkComponent}
                context={props.context || khulnasoftContext}
                registeredComponents={
                  props.registeredComponents || componentsContext?.registeredComponents
                }
              />
            ), [
              props.linkComponent,
              props.context,
              props.registeredComponents,
              khulnasoftContext,
              componentsContext?.registeredComponents
            ]);
          
            // Memoize keyExtractor
            const keyExtractor = React.useCallback((item: any) => 
              item.id.toString()
            , []);
          `,
        };

        if (json.children[0].children[1].children[0].name !== 'For') {
          throw new Error(
            'Blocks component must have a For block that will get converted to a FlatList'
          );
        }

        json.children[0].children[1].children[0] = {
          '@type': '@khulnasoft.com/mitosis/node',
          name: 'FlatList',
          meta: {},
          scope: {},
          properties: {},
          bindings: {
            data: { code: 'props.blocks', type: 'single' },
            renderItem: { code: 'renderItem', type: 'single' },
            keyExtractor: { code: 'keyExtractor', type: 'single' },
            removeClippedSubviews: { code: 'true', type: 'single' },
            maxToRenderPerBatch: { code: '10', type: 'single' },
            windowSize: { code: '5', type: 'single' },
            initialNumToRender: { code: '5', type: 'single' },
          },
          children: [],
        };
      }
      return json;
    },
  },
  code: {
    post: (code, json) => {
      if (json.name === 'Blocks') {
        return code.replace(
          'export default Blocks',
          'export default memo(Blocks)'
        );
      }
      if (json.name === 'Block') {
        return code.replace(
          'export default Block',
          'export default memo(Block)'
        );
      }
      return code;
    },
  },
});

const INJECT_ENABLE_EDITOR_ON_EVENT_HOOKS_PLUGIN = () => ({
  json: {
    pre: (json) => {
      if (json.name !== 'EnableEditor') return;
      json.hooks.onMount.forEach((onMountHook) => {
        json.hooks.onEvent.forEach((eventHook) => {
          const isEditingHook =
            onMountHook.code.includes('INJECT_EDITING_HOOK_HERE') &&
            eventHook.eventName === 'initeditingbldr';

          if (isEditingHook) {
            onMountHook.code = onMountHook.code.replace(
              'INJECT_EDITING_HOOK_HERE',
              eventHook.code
            );
          }

          const isPreviewingHook =
            onMountHook.code.includes('INJECT_PREVIEWING_HOOK_HERE') &&
            eventHook.eventName === 'initpreviewingbldr';

          if (isPreviewingHook) {
            onMountHook.code = onMountHook.code.replace(
              'INJECT_PREVIEWING_HOOK_HERE',
              eventHook.code
            );
          }
        });

        onMountHook.code = onMountHook.code.replaceAll('elementRef', 'true');
      });

      json.hooks.onEvent = [];
    },
  },
});

/**
 *
 * Identifies all the bindings that are used to pass actions to our blocks.
 * Used by Vue/Svelte plugins to convert the bindings to the appropriate binding syntax.
 *
 * @param {import('@khulnasoft.com/mitosis').MitosisComponent} json
 * @param {MitosisNode} item
 */
const filterActionAttrBindings = (json, item) => {
  /**
   * Button component uses `filterAttrs` but calls `DynamicRender`.
   * Special case, we don't want to filter the `filterAttrs` calls even though they are there.
   */
  const isButton = json.name === 'Button';
  if (isButton) return [];

  return Object.entries(item.bindings).filter(([_key, value]) => {
    const blocksAttrs =
      value?.code.includes('filterAttrs') && value.code.includes('true');

    const dynamicRendererAttrs =
      json.name === 'DynamicRenderer' &&
      value?.code.includes('props.actionAttributes');

    return blocksAttrs || dynamicRendererAttrs;
  });
};

/**
 * @type {Plugin}
 */
const REMOVE_UNUSED_PROPS_HACK_PLUGIN = () => ({
  json: {
    post: (json) => {
      json.hooks.onMount = json.hooks.onMount.filter(
        (hook) =>
          !hook.code.includes('/** this is a hack to include unused props */')
      );
      return json;
    },
  },
});

// for fixing circular dependencies
/**
 * @type {Plugin}
 */
const ANGULAR_FIX_CIRCULAR_DEPENDENCIES_OF_COMPONENTS = () => ({
  code: {
    post: (code) => {
      if (
        code.includes('selector: "component-ref"') ||
        code.includes('selector: "repeated-block"')
      ) {
        code = code.replace(
          'imports: [CommonModule, Block]',
          'imports: [CommonModule, forwardRef(() => Block)]'
        );
        code = code.replace(
          '} from "@angular/core";',
          `${code.includes('repeated-block') ? ',' : ''}forwardRef } from "@angular/core";`
        );
      }
      return code;
    },
  },
});

const ANGULAR_OVERRIDE_COMPONENT_REF_PLUGIN = () => ({
  code: {
    post: (code) => {
      if (code.includes('selector: "component-ref"')) {
        code = code
          .replace(
            '<ng-container *ngFor="let child of blockChildren; trackBy: trackByChild0">',
            '<ng-container *ngIf="componentRef">\n<ng-container *ngFor="let child of blockChildren; trackBy: trackByChild0">'
          )
          .replace('</ng-container>', '</ng-container>\n</ng-container>');
      }
      return code;
    },
  },
});

const ANGULAR_RENAME_NG_ONINIT_TO_NG_AFTERCONTENTINIT_PLUGIN = () => ({
  json: {
    post: (json) => {
      if (json.name === 'BlocksWrapper' || json.name === 'ComponentRef') {
        json.hooks.onUpdate.forEach((hook) => {
          hook.code = hook.code.replaceAll(
            /^\s*\/\/\s*@ts-expect-error.*$/gm,
            ''
          );
        });
        /**
         * Since the angular SDK manually handles the creation of the dynamic blocks and attaching them as children of BlocksWrapper in the DOM
         * it must also manually handle their re-renders on content change in the visual editor.
         *
         * <blocks-wrapper> -> inserts blocks as children dynamically
         *  {each <block />} -> we need to re-render blocks when props.blocks update while visual editing
         * </blocks-wrapper>
         *
         * `ngAfterContentChecked` runs after children were checked for changes, which is the earliest point we can safely append new blocks,
         * and re-paint the DOM else the new children blocks are not present in the existing array, therefore pushed to the top of the list.
         */
        const templateRefName =
          json.name === 'BlocksWrapper'
            ? 'blockswrapperTemplateRef'
            : 'wrapperTemplateRef';
        json.compileContext = {
          angular: {
            hooks: {
              ngAfterContentChecked: {
                code: `if (this.shouldUpdate) {
                  this.myContent = [this.vcRef.createEmbeddedView(this.${templateRefName}).rootNodes];
                  this.shouldUpdate = false;
                }`,
              },
            },
          },
        };
      }
      return json;
    },
  },
  code: {
    post: (code, json) => {
      if (json.name === 'BlocksWrapper' || json.name === 'ComponentRef') {
        // insert children only after they are fully initialized
        code = code.replace('ngOnInit', 'ngAfterContentInit');
      }
      return code;
    },
  },
});

const VALID_HTML_TAGS = [
  'html',
  'base',
  'head',
  'link',
  'meta',
  'style',
  'title',
  'body',
  'address',
  'article',
  'aside',
  'footer',
  'header',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'main',
  'nav',
  'section',
  'blockquote',
  'dd',
  'div',
  'dl',
  'dt',
  'figcaption',
  'figure',
  'hr',
  'li',
  'menu',
  'ol',
  'p',
  'pre',
  'ul',
  'a',
  'abbr',
  'b',
  'bdi',
  'bdo',
  'br',
  'cite',
  'code',
  'data',
  'dfn',
  'em',
  'i',
  'kbd',
  'mark',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
  'var',
  'wbr',
  'area',
  'audio',
  'img',
  'map',
  'track',
  'video',
  'embed',
  'iframe',
  'object',
  'param',
  'picture',
  'portal',
  'source',
  'svg',
  'math',
  'canvas',
  'noscript',
  'script',
  'del',
  'ins',
  'caption',
  'col',
  'colgroup',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'button',
  'datalist',
  'fieldset',
  'form',
  'input',
  'label',
  'legend',
  'meter',
  'optgroup',
  'option',
  'output',
  'progress',
  'select',
  'textarea',
  'details',
  'dialog',
  'summary',
  'slot',
  'template',
  // tags below are SVG tags. See the below article for list of SVG tags
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element
  'animate',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'discard',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'hatch',
  'hatchpath',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'set',
  'stop',
  'switch',
  'symbol',
  'text',
  'textPath',
  'tspan',
  'use',
  'view',
];

const ANGULAR_COMPONENT_NAMES_HAVING_HTML_TAG_NAMES = () => ({
  json: {
    pre: (json) => {
      if (VALID_HTML_TAGS.includes(json.name.toLowerCase())) {
        json.name = `Khulnasoft${json.name}`;
      }
    },
  },
});

const ANGULAR_BIND_THIS_FOR_WINDOW_EVENTS = () => ({
  code: {
    post: (code) => {
      if (code.includes('enable-editor')) {
        /**
         * we need to wait till the children content of enable-editor is fully loaded before rendering
         * else the content that are behind any conditional logic will get rendered outside of the enable-editor
         */
        code = code.replace('ngOnInit', 'ngAfterContentInit');

        // find two event listeners and add bind(this) to the fn passed
        const eventListeners = code.match(
          /window\.addEventListener\(\s*['"]([^'"]+)['"]\s*,\s*([^)]+)\)/g
        );
        if (eventListeners && eventListeners.length) {
          eventListeners.forEach((eventListener) => {
            const [eventName, fn] = eventListener
              .replace('window.addEventListener(', '')
              .replace(')', '')
              .split(',');
            code = code.replace(
              eventListener,
              `window.addEventListener(${eventName}, ${fn}.bind(this))`
            );
          });
        }
        const eventListenersRemove = code.match(
          /window\.removeEventListener\(\s*['"]([^'"]+)['"]\s*,\s*([^)]+)\)/g
        );
        if (eventListenersRemove && eventListenersRemove.length) {
          eventListenersRemove.forEach((eventListener) => {
            const [eventName, fn] = eventListener
              .replace('window.removeEventListener(', '')
              .replace(')', '')
              .split(',');
            code = code.replace(
              eventListener,
              `window.removeEventListener(${eventName}, ${fn}.bind(this))`
            );
          });
        }
      }
      return code;
    },
  },
});

// required for registering custom components properly
const ANGULAR_INITIALIZE_PROP_ON_NG_ONINIT = () => ({
  code: {
    post: (code) => {
      if (code.includes('selector: "content-component"')) {
        code = code.replaceAll(
          'this.contentSetState',
          'this.contentSetState.bind(this)'
        );
      }
      return code;
    },
  },
});

const ANGULAR_WRAP_SYMBOLS_FETCH_AROUND_CHANGES_DEPS = () => ({
  code: {
    post: (code) => {
      if (code.includes('selector: "khulnasoft-symbol"')) {
        code = code.replace('ngOnChanges() {', 'ngOnChanges(changes) {');
        code = code.replace(
          'this.setContent();',
          'if (changes.symbol) { this.setContent(); }'
        );
      }
      return code;
    },
  },
});

/**
 * This code is used to destructure the `attributes` prop and apply it to the direct child element of the
 * interactive-element when `noWrap` is set to `true`.
 *
 * When using a custom component that doesn't expect the `attributes` prop and `noWrap` is `true`,
 * the `attributes` are applied to the root element of the custom component:
 *
 * <mat-button {...attributes}>
 *   ...
 * </mat-button>
 *
 * For custom components that **do** expect the `attributes` prop, it is passed as an `@Input()`,
 * allowing users to utilize it wherever needed.
 * For instance, in our Button block, the `attributes` prop is passed to `dynamic-renderer` -> `button`.
 *
 * If users want to apply the `attributes` prop at specific locations within their custom components,
 * they can use it as an `@Input()`.
 */
const ATTACH_ATTRIBUTES_TO_CHILD_ELEMENT_CODE = `  
  _listenerFns = new Map<string, () => void>();

  private hasAttributesInput(component): boolean {
    return !!reflectComponentType(component)?.inputs.find(input => input.propName === 'attributes');
  }

  private updateAttributes(
    el: HTMLElement,
    attributes: { [key: string]: any }
  ): void {
    Object.keys(attributes).forEach((attr) => {
      if (attr.startsWith("on")) {
        if (this._listenerFns.has(attr)) {
          this._listenerFns.get(attr)!();
        }
        this._listenerFns.set(
          attr,
          this.renderer.listen(
            el,
            attr.replace("on", "").toLowerCase(),
            attributes[attr]
          )
        );
      } else if (attr === 'class' && attributes[attr]) {
        const classes = attributes[attr].split(' ');
        classes.forEach((cls: string) =>
          this.renderer.addClass(el, cls.trim())
        );
      } else {
        this.renderer.setAttribute(el, attr.toLowerCase(), attributes[attr] ?? "");
      }
    });
  }

  ngAfterViewInit() {
    if (!this.hasAttributesInput(this.Wrapper)) {
      const wrapperElement =
        this.wrapperTemplateRef.elementRef.nativeElement?.nextElementSibling;
      if (wrapperElement) {
        this.updateAttributes(wrapperElement, this.attributes);
      }
    }
  }

  ngOnDestroy() {
    for (const fn of this._listenerFns.values()) {
      fn();
    }
  }
`;

/**
 * Filters props to only include those explicitly defined as @Input() in the Angular component.
 * This prevents "Input property X is not annotated with @Input()" errors that occur when passing
 * unused props, since Mitosis only annotates props actually used by the component.
 */
const FN_TO_FILTER_PROPS_THAT_WRAPPER_NEEDS = `
  private filterPropsThatWrapperNeeds(allProps: any) {
    const definedPropNames = reflectComponentType(this.Wrapper).inputs.map(prop => prop.propName);
    return definedPropNames.reduce((acc, propName) => {
      acc[propName] = allProps[propName];
      return acc;
    }, {});
  }
`;

/**
 * Checks if the custom component expects `attributes` prop.
 * If yes, it passes `attributes` as an `@Input()` to the custom component.
 * If no, it attaches `attributes` to the direct child element of interactive element.
 */
const ANGULAR_NOWRAP_INTERACTIVE_ELEMENT_PLUGIN = () => ({
  code: {
    post: (code) => {
      if (code.includes('selector: "interactive-element"')) {
        code = code.replace(
          'constructor(private vcRef: ViewContainerRef) {',
          'constructor(private vcRef: ViewContainerRef, private renderer: Renderer2) {'
        );
        code = code.replace(
          /import {/,
          `import {
          Renderer2,
          reflectComponentType,
          `
        );
        code = code.replaceAll(
          'attributes: this.attributes,',
          '...(this.hasAttributesInput(this.Wrapper) ? { attributes: this.attributes } : {})'
        );

        // extract the props that Wrapper needs
        code = code.replaceAll(
          '...this.targetWrapperProps',
          '...this.filterPropsThatWrapperNeeds(this.targetWrapperProps)'
        );

        const ngOnChangesIndex = code.indexOf('ngOnChanges');
        code =
          code.slice(0, ngOnChangesIndex) +
          ATTACH_ATTRIBUTES_TO_CHILD_ELEMENT_CODE +
          FN_TO_FILTER_PROPS_THAT_WRAPPER_NEEDS +
          code.slice(ngOnChangesIndex);

        code = code.replace(
          'ngOnChanges(changes: SimpleChanges) {',
          'ngOnChanges(changes: SimpleChanges) { if (changes["attributes"] && !this.hasAttributesInput(this.Wrapper)) { this.ngAfterViewInit(); }'
        );
      }
      return code;
    },
  },
});

/**
 * Looks for any changes in `component-ref` component's wrapper template and updates it such that it resolves during SSR.
 */
const ANGULAR_COMPONENT_REF_UPDATE_TEMPLATE_SSR = () => ({
  code: {
    post: (code) => {
      if (code.includes('selector: "component-ref"')) {
        code = code.replace(
          /this\.myContent\s*=\s*\[[^\]]*\]/,
          `const wrapperTemplate = this.vcRef.createEmbeddedView(this.wrapperTemplateRef);
          wrapperTemplate.detectChanges();
          this.myContent = [wrapperTemplate.rootNodes]`
        );
      }
      return code;
    },
  },
});

/**
 * Angular allows DOM manipulation in `ngAfterViewInit` hook.
 * This plugin moves the DOM code from `ngOnInit` to `ngAfterViewInit` hook.
 */
const ANGULAR_MOVE_DOM_MANIPULATION_CODE_TO_AFTERVIEWINIT = () => ({
  json: {
    post: (json) => {
      if (['KhulnasoftVideo', 'CustomCode', 'KhulnasoftEmbed'].includes(json.name)) {
        let hooks = {};

        if (json.name === 'KhulnasoftVideo') {
          hooks.ngAfterViewInit = json.hooks.onMount[0];
        }
        if (json.name === 'CustomCode') {
          hooks.ngAfterViewInit = json.hooks.onMount[0];
          hooks.ngAfterViewChecked = json.hooks.onUpdate[0];
        }
        if (json.name === 'KhulnasoftEmbed') {
          hooks.ngAfterViewChecked = json.hooks.onUpdate[0];
        }

        json.compileContext = {
          angular: {
            hooks,
          },
        };

        if (hooks.ngAfterViewInit) {
          json.compileContext.angular.hooks.ngAfterViewInit.code =
            json.compileContext.angular.hooks.ngAfterViewInit.code
              .replaceAll('props.', 'this.')
              .replaceAll('state.', 'this.');
        }

        if (hooks.ngAfterViewChecked) {
          json.compileContext.angular.hooks.ngAfterViewChecked.code =
            json.compileContext.angular.hooks.ngAfterViewChecked.code
              .replaceAll('props.', 'this.')
              .replaceAll('state.', 'this.');
        }

        if (json.name === 'CustomCode' || json.name === 'KhulnasoftEmbed') {
          json.hooks.onUpdate = [];
        }
        json.hooks.onMount = [];
      }
    },
  },
});

/**
 * Angular doesn't support hydration for components created dynamically.
 * Refer: https://angular.dev/errors/NG0503
 * GitHub issue: https://github.com/angular/angular/issues/51798
 */
const ANGULAR_SKIP_HYDRATION_FOR_CONTENT_COMPONENT = () => ({
  code: {
    post: (code) => {
      if (code.includes('selector: "content-component"')) {
        const componentDecorator = code.match(/@Component\s*\({/)[0];
        const componentDecoratorWithHost = componentDecorator.replace(
          /@Component\s*\({/,
          `@Component({\n\thost: { ngSkipHydration: "true" },`
        );
        code = code.replace(componentDecorator, componentDecoratorWithHost);
      }
      return code;
    },
  },
});

// Temporary fix to make the visual editing work for AB tests in Angular SDK
// getters in angular run on every change detection
const ANGULAR_AB_TEST_VE_CORRECT_VARIANT = () => ({
  json: {
    pre: (json) => {
      if (json.name === 'ContentVariants') {
        json.state['defaultContent'].code = json.state[
          'defaultContent'
        ].code.replace('get ', '');
        json.state['defaultContent'].type = 'method';
        // as we are "pre" modifying the json, this will create a new state property for this
        json.children[0].children[2].bindings['content'].code =
          'state.defaultContent()';
      }
      return json;
    },
  },
});

const QWIK_ONUPDATE_TO_USEVISIBLETASK = () => ({
  code: {
    post: (code, json) => {
      if (json.name === 'CustomCode') {
        code = code.replace('useTask$(', 'useVisibleTask$(');
      }
      return code;
    },
  },
});

const QWIK_FORCE_RENDER_COUNT_FOR_RENDERING_CUSTOM_COMPONENT_DEFAULT_VALUE =
  () => ({
    json: {
      post: (json) => {
        if (json.name === 'InteractiveElement') {
          json.children[0].meta.else.bindings['key'] = {
            code: "'wrapper-' + state.forceRenderCount",
            bindingType: 'expression',
            type: 'single',
          };
        }
      },
    },
  });

/**
 * @type {Plugin}
 */
const VUE_FIX_EXTRA_ATTRS_PLUGIN = () => ({
  json: {
    pre: (json) => {
      if (json.name === 'InteractiveElement') {
        delete json.children[0].meta.else.bindings.attributes;
      }

      return json;
    },
  },
});

/**
 * @type {MitosisConfig}
 */
module.exports = {
  files: 'src/**',
  exclude: ['src/**/*.test.ts'],
  targets,
  getTargetPath,
  commonOptions: {
    plugins: [REMOVE_MAGIC_PLUGIN],
  },
  options: {
    angular: {
      standalone: true,
      typescript: true,
      state: 'class-properties',
      plugins: [
        ANGULAR_FIX_CIRCULAR_DEPENDENCIES_OF_COMPONENTS,
        ANGULAR_OVERRIDE_COMPONENT_REF_PLUGIN,
        ANGULAR_COMPONENT_NAMES_HAVING_HTML_TAG_NAMES,
        INJECT_ENABLE_EDITOR_ON_EVENT_HOOKS_PLUGIN,
        ANGULAR_INITIALIZE_PROP_ON_NG_ONINIT,
        ANGULAR_BIND_THIS_FOR_WINDOW_EVENTS,
        ANGULAR_WRAP_SYMBOLS_FETCH_AROUND_CHANGES_DEPS,
        ANGULAR_RENAME_NG_ONINIT_TO_NG_AFTERCONTENTINIT_PLUGIN,
        REMOVE_UNUSED_PROPS_HACK_PLUGIN,
        ANGULAR_NOWRAP_INTERACTIVE_ELEMENT_PLUGIN,
        ANGULAR_COMPONENT_REF_UPDATE_TEMPLATE_SSR,
        ANGULAR_SKIP_HYDRATION_FOR_CONTENT_COMPONENT,
        ANGULAR_MOVE_DOM_MANIPULATION_CODE_TO_AFTERVIEWINIT,
        ANGULAR_AB_TEST_VE_CORRECT_VARIANT,
      ],
    },
    solid: {
      typescript: true,
      stylesType: 'style-tag',
      plugins: [
        INJECT_ENABLE_EDITOR_ON_EVENT_HOOKS_PLUGIN,
        REMOVE_SET_CONTEXT_PLUGIN_FOR_FORM,
      ],
    },
    vue: {
      typescript: true,
      namePrefix: (path) => (path.includes('/blocks/') ? 'khulnasoft' : ''),
      cssNamespace: getSeededId,
      plugins: [
        REMOVE_UNUSED_PROPS_HACK_PLUGIN,
        () => ({
          json: {
            // This plugin handles binding our actions to the `v-on:` Vue syntax:
            // - in our block components, the actions will come through `props.attributes` and need to be filtered
            // - in Block, the actions will be good to go from `state.actions`, and just need the `v-on:` prefix to be removed
            pre: (json) => {
              traverse(json).forEach(function (item) {
                if (!isMitosisNode(item)) return;

                const filterAttrKeys = filterActionAttrBindings(json, item);

                for (const [key, value] of filterAttrKeys) {
                  if (value) {
                    item.bindings[key] = {
                      ...value,
                      type: 'spread',
                      spreadType: 'event-handlers',
                    };
                  }
                }
              });
            },
          },
        }),
        VUE_FIX_EXTRA_ATTRS_PLUGIN,
      ],
      api: 'options',
      asyncComponentImports: false,
    },
    react: {
      typescript: true,
      plugins: [
        SRCSET_PLUGIN,
        FETCHPRIORITY_CAMELCASE_PLUGIN,
        INJECT_ENABLE_EDITOR_ON_EVENT_HOOKS_PLUGIN,
        REMOVE_SET_CONTEXT_PLUGIN_FOR_FORM,
      ],
      stylesType: 'style-tag',
      styleTagsPlacement: 'top',
    },
    rsc: {
      explicitImportFileExtension: true,
      typescript: true,
      plugins: [
        SRCSET_PLUGIN,
        FETCHPRIORITY_CAMELCASE_PLUGIN,
        REMOVE_SET_CONTEXT_PLUGIN_FOR_FORM,
        () => ({
          json: {
            pre: (json) => {
              if (json.name === 'Symbol') {
                delete json.state.setContent;

                json.state.contentToUse.code =
                  json.state.contentToUse?.code.replace('async () => ', '');
              } else if (json.name === 'EnableEditor') {
                json.imports.push({
                  path: 'next/navigation',
                  imports: {
                    useRouter: 'useRouter',
                  },
                });

                json.hooks.init = {
                  code: `const router = useRouter();`,
                };
              }
              return json;
            },
          },
          code: {
            pre: (code) => {
              return code.replace('function Symbol(', 'async function Symbol(');
            },
          },
        }),
      ],
      stylesType: 'style-tag',
    },
    reactNative: {
      typescript: true,
      plugins: [
        SRCSET_PLUGIN,
        BASE_TEXT_PLUGIN,
        INJECT_ENABLE_EDITOR_ON_EVENT_HOOKS_PLUGIN,
        REMOVE_SET_CONTEXT_PLUGIN_FOR_FORM,
        ADD_IS_STRICT_STYLE_MODE_TO_CONTEXT_PLUGIN,
        MEMOIZING_BLOCKS_COMPONENT_PLUGIN,
        () => ({
          json: {
            pre: (json) => {
              /**
               * We cannot set context in `ComponentRef` because it's a light component.
               * We only need to set the context for a React Native need: CSS-style inheritance for Text blocks.
               **/
              if (json.name === 'ComponentRef') {
                json.imports.push({
                  imports: {
                    KhulnasoftContext: 'default',
                  },
                  path: '../../../../context/khulnasoft.context.lite',
                });
                json.context.set = {
                  '../../../../context/khulnasoft.context.lite:default': {
                    name: 'KhulnasoftContext',
                    value: {
                      content: {
                        code: 'props.context.content',
                        type: 'property',
                      },
                      rootState: {
                        code: 'props.context.rootState',
                        type: 'property',
                      },
                      localState: {
                        code: 'props.context.localState',
                        type: 'property',
                      },
                      context: {
                        code: 'props.context.context',
                        type: 'property',
                      },
                      apiKey: {
                        code: 'props.context.apiKey',
                        type: 'property',
                      },
                      componentInfos: {
                        code: 'props.context.componentInfos',
                        type: 'property',
                      },
                      inheritedStyles: {
                        code: 'props.context.inheritedStyles',
                        type: 'property',
                      },
                      apiVersion: {
                        code: 'props.context.apiVersion',
                        type: 'property',
                      },
                    },
                  },
                };
              }

              /**
               * Fix types
               */
              if (json.name === 'CustomCode') {
                json.refs.elementRef.typeParameter = 'any';
              }

              /**
               * Fix component name as `Button` is imported from react-native
               */
              if (json.name === 'Button') {
                json.name = 'KhulnasoftButton';
              }
            },
          },
        }),
        () => ({
          code: {
            post: (code) => {
              if (
                code.includes('BlocksWrapper') ||
                code.includes('EnableEditor')
              ) {
                /**
                 * Replaces `onPress` event handler with `onClick` for React Native
                 * such that visual editing "+Add Block" works on web target.
                 */
                code = code.replace('onPress', 'onClick');
              }
              return code;
            },
          },
        }),
      ],
    },
    qwik: {
      typescript: true,
      plugins: [
        FETCHPRIORITY_CAMELCASE_PLUGIN,
        /**
         * cleanup `onMount` hooks
         * - rmv unnecessary ones
         * - migrate necessary `onMount` hooks to `useOn('qvisible')` hooks
         */
        () => ({
          json: {
            pre: (json) => {
              if (['Symbol', 'ContentVariants'].includes(json.name)) {
                json.hooks.onMount = [];
                return;
              }

              if (['EnableEditor'].includes(json.name)) {
                json.hooks.onMount.forEach((hook, i) => {
                  if (hook.onSSR) return;

                  json.hooks.onMount.splice(i, 1);

                  json.hooks.onEvent.push({
                    code: hook.code.replaceAll('elementRef', 'element'),
                    eventArgName: 'event',
                    eventName: 'readystatechange',
                    isRoot: true,
                    refName: 'element',
                    elementArgName: 'element',
                  });
                });
              }
            },
            post: (json) => {
              if (json.name !== 'EnableEditor') return;
              json.imports.push({
                imports: { useOnDocument: 'useOnDocument' },
                path: '@khulnasoft.com/qwik',
              });
              return json;
            },
          },
          code: {
            post: (code, json) => {
              if (json.name === 'EnableEditor') {
                code = code.replaceAll(
                  `useOn(
    "readystatechange"`,
                  `useOnDocument(
    "readystatechange"`
                );
              }
              return code;
            },
          },
        }),
        QWIK_FORCE_RENDER_COUNT_FOR_RENDERING_CUSTOM_COMPONENT_DEFAULT_VALUE,
        QWIK_ONUPDATE_TO_USEVISIBLETASK,
      ],
    },
    svelte: {
      typescript: true,
      plugins: [
        /**
         * This plugin modifies `svelte:component` to elements to use the `svelte:element` syntax instead.
         * `svelte:component` is used for rendering dynamic Svelte components, and `svelte:element` is used for
         * rendering dynamic HTML elements. Mitosis can't know which one to use, and defaults to `svelte:component`,
         * so we have to override that.
         */
        () => ({
          json: {
            pre: (json) => {
              const tag =
                json.meta.useMetadata && json.meta.useMetadata.elementTag;

              if (tag) {
                const tagArr = Array.isArray(tag) ? tag : [tag];

                traverse(json).forEach(function (item) {
                  if (!isMitosisNode(item)) return;

                  if (tagArr.includes(item.name)) {
                    item.bindings.this = {
                      type: 'single',
                      ...item.bindings.this,
                      code: item.name,
                    };
                    item.name = 'svelte:element';
                  }
                });
              }
            },
          },
        }),
        () => ({
          json: {
            pre: (json) => {
              // This plugin handles binding our actions to the `use:` Svelte syntax:

              /**
               * `DynamicRenderer` will toggle between
               * <svelte:element> and <svelte:component> depending on the type of the block, while
               * handling empty HTML elements.
               */
              if (json.name === 'DynamicRenderer') {
                traverse(json).forEach(function (item) {
                  if (!isMitosisNode(item)) return;

                  if (!item.name.includes('TagName')) return;

                  item.bindings.this = {
                    type: 'single',
                    ...item.bindings.this,
                    code: item.name,
                  };
                  item.name = `svelte:${item.properties.MAGIC}`;
                });
              }

              // handle case where we have no wrapper element, in which case the actions are passed as attributes to our
              // khulnasoft blocks.
              traverse(json).forEach(function (item) {
                if (!isMitosisNode(item)) return;

                const filterAttrKeys = filterActionAttrBindings(json, item);

                for (const [key, value] of filterAttrKeys) {
                  if (value && item.name !== 'svelte:component') {
                    item.bindings['use:setAttrs'] = {
                      ...value,
                      type: 'single',
                    };

                    delete item.bindings[key];
                  }
                }
              });

              return json;
            },
          },
        }),
      ],
    },
  },
};
