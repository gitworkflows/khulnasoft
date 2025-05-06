import type { KhulnasoftElement } from './element.js';
import type { Input } from './input.js';

export interface ComponentInfo {
  /**
   * Name your component something unique, e.g. 'MyButton'. You can override built-in components
   * by registering a component with the same name, e.g. 'Text', to replace the built-in text component
   */
  name: string;
  description?: string;
  /**
   * Link to a documentation page for this component
   */
  docsLink?: string;
  image?: string;
  /**
   * Input schema for your component for users to fill in the options
   */
  inputs?: Input[];
  class?: any;
  type?: 'angular' | 'webcomponent' | 'react' | 'vue';
  defaultStyles?: { [key: string]: string };
  /**
   * Turn on if your component can accept children. Be sure to use in combination with
   * withChildren(YourComponent) like here
   * github.com/khulnasoft-com/khulnasoft/blob/master/examples/react-design-system/src/components/HeroWithChildren/HeroWithChildren.khulnasoft.js#L5
   */
  canHaveChildren?: boolean;
  fragment?: boolean;
  /**
   * Do not wrap a component in a dom element. Be sure to use {...props.attributes} with this option
   * like here github.com/khulnasoft-com/khulnasoft/blob/master/packages/react/src/blocks/forms/Input.tsx#L34
   */
  noWrap?: boolean;

  /**
   * TO-DO: make this optional only for RSC SDK.
   *
   * Set this to `true` if your component is a React Server Component (RSC).
   */
  isRSC?: boolean;

  /**
   * Default children
   */
  defaultChildren?: KhulnasoftElement[];
  defaults?: Partial<KhulnasoftElement>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  hooks?: { [key: string]: string | Function };
  /**
   * Hide your component in editor, useful for gradually deprecating components
   */
  hideFromInsertMenu?: boolean;
  // For webcomponents
  tag?: string;
  static?: boolean;
  /**
   * Passing a list of model names will restrict using the component to only the models listed here, otherwise it'll be available for all models
   */
  models?: string[];

  /**
   * Specify restrictions direct children must match
   */
  childRequirements?: {
    /** Message to show when this doesn't match, e.g. "Children of 'Columns' must be a 'Column'" */
    message: string;
    /** Simple way to say children must be a specific component name */
    component?: string;
    /**
     * More advanced - specify a MongoDB-style query (using sift.js github.com/crcn/sift.js)
     * of what the children objects should match, e.g.
     *
     * @example
     *  query: {
     *    // Child of this element must be a 'Button' or 'Text' component
     *    'component.name': { $in: ['Button', 'Text'] }
     *  }
     */
    query?: any;
  };

  /**
   * Specify restrictions any parent must match
   */
  requiresParent?: {
    /** Message to show when this doesn't match, e.g. "'Add to cart' buttons must be within a 'Product box'" */
    message: string;
    /** Simple way to say a parent must be a specific component name, e.g. 'Product box' */
    component?: string;

    /**
     * More advanced - specify a MongoDB-style query (using sift.js github.com/crcn/sift.js)
     * of what at least one parent in the parents hierarchy should match, e.g.
     *
     * @example
     *  query: {
     *    // Thils element must be somewhere inside either a 'Product box' or 'Collection' component
     *    'component.name': { $in: ['Product Box', 'Collection'] }
     *  }
     */
    query?: any;
  };

  friendlyName?: string;

  /**
   * Use to restrict access to your component based on a the current user permissions
   * By default components will show to all users
   * for more information on permissions in khulnasoft check https://www.khulnasoft.com/c/docs/guides/roles-and-permissions
   */
  requiredPermissions?: Array<Permission>;

  // TO-DO: is this used?
  hidden?: boolean;

  /**
   * When overriding built-in components, if you don't want any special behavior that
   * the original has, set this to `true` to skip the default behavior
   *
   * Default behaviors include special "virtual options", such as a custom
   * aspect ratio editor for Images, or a special column editor for Columns
   *
   * Learn more about overriding built-in components here: https://www.khulnasoft.com/c/docs/custom-components-overriding
   */
  override?: boolean;

  /**
   * Whether or not the component should receive SDK-related props.
   */
  shouldReceiveKhulnasoftProps?: {
    /**
     * Whether or not the component should receive the `khulnasoftBlock` prop, containing the current Khulnasoft block being rendered.
     *
     * Defaults to `false`.
     */
    khulnasoftBlock?: boolean;

    /**
     * Whether or not the component should receive the `khulnasoftContext` prop, containing the current context.
     * The Khulnasoft Context contains a lot of data relevant to the current `Content` render.
     * You can see more information [here](https://github.com/khulnasoft-com/khulnasoft/blob/main/packages/sdks/src/context/types.ts).
     *
     * Defaults to `false`.
     */
    khulnasoftContext?: boolean;

    /**
     * Whether or not the component should receive the `khulnasoftComponents` array, containing the all registered components (custom and built-in).
     *
     * Defaults to `false`.
     */
    khulnasoftComponents?: boolean;

    /**
     * Whether or not the component should receive the `khulnasoftLinkComponent` prop, containing the custom link component provided to `Content`.
     *
     * Defaults to `false`.
     */
    khulnasoftLinkComponent?: boolean;
  };

  meta?: { [key: string]: any };
}

type Permission =
  | 'read'
  | 'publish'
  | 'editCode'
  | 'editDesigns'
  | 'admin'
  | 'create';
