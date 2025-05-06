[@khulnasoft.com/react](../README.md) / [Modules](../modules.md) / [khulnasoft-component.component](../modules/khulnasoft_component_component.md) / KhulnasoftComponentProps

# Interface: KhulnasoftComponentProps

[khulnasoft-component.component](../modules/khulnasoft_component_component.md).KhulnasoftComponentProps

## Table of contents

### Properties

- [apiKey](khulnasoft_component_component.KhulnasoftComponentProps.md#apikey)
- [khulnasoft](khulnasoft_component_component.KhulnasoftComponentProps.md#khulnasoft)
- [content](khulnasoft_component_component.KhulnasoftComponentProps.md#content)
- [context](khulnasoft_component_component.KhulnasoftComponentProps.md#context)
- [data](khulnasoft_component_component.KhulnasoftComponentProps.md#data)
- [entry](khulnasoft_component_component.KhulnasoftComponentProps.md#entry)
- [model](khulnasoft_component_component.KhulnasoftComponentProps.md#model)
- [options](khulnasoft_component_component.KhulnasoftComponentProps.md#options)
- [stopClickPropagationWhenEditing](khulnasoft_component_component.KhulnasoftComponentProps.md#stopclickpropagationwhenediting)

### Methods

- [contentError](khulnasoft_component_component.KhulnasoftComponentProps.md#contenterror)
- [contentLoaded](khulnasoft_component_component.KhulnasoftComponentProps.md#contentloaded)
- [onStateChange](khulnasoft_component_component.KhulnasoftComponentProps.md#onstatechange)
- [renderLink](khulnasoft_component_component.KhulnasoftComponentProps.md#renderlink)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

**`package`**

Khulnasoft public API key.

**`see`** {@link khulnasoft.init()} for the preferred way of supplying your API key.

#### Defined in

[src/components/khulnasoft-component.component.tsx:176](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L176)

___

### khulnasoft

• `Optional` **khulnasoft**: `Khulnasoft`

Specific instance of Khulnasoft that should be used. You might use this for
server side rendering. It's generally not recommended except for very
advanced multi-tenant use cases.

#### Defined in

[src/components/khulnasoft-component.component.tsx:164](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L164)

___

### content

• `Optional` **content**: `KhulnasoftContent`

Manually specify what Khulnasoft content JSON object to render. @see [https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-content-manually](https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-content-manually)

#### Defined in

[src/components/khulnasoft-component.component.tsx:212](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L212)

___

### context

• `Optional` **context**: `any`

Object that will be available in actions and bindings.

**`see`** [https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-data-and-functions-down](https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-data-and-functions-down)

#### Defined in

[src/components/khulnasoft-component.component.tsx:285](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L285)

___

### data

• `Optional` **data**: `any`

Data is passed along as `state.*` to the component.

**`see`** [https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-data-and-functions-down](https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-data-and-functions-down)

**`example`**
```
<KhulnasoftComponent
 model="page"
 data={{
   products: productsList,
   myFunction: () => alert('Triggered!'),
   foo: 'bar'
 }} >
```

#### Defined in

[src/components/khulnasoft-component.component.tsx:158](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L158)

___

### entry

• `Optional` **entry**: `string`

Content entry ID for this component to fetch client side

#### Defined in

[src/components/khulnasoft-component.component.tsx:168](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L168)

___

### model

• `Optional` **model**: `string`

Name of the model this is rendering content for. Default is "page".

#### Defined in

[src/components/khulnasoft-component.component.tsx:136](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L136)

___

### options

• `Optional` **options**: `GetContentOptions`

#### Defined in

[src/components/khulnasoft-component.component.tsx:182](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L182)

___

### stopClickPropagationWhenEditing

• `Optional` **stopClickPropagationWhenEditing**: `boolean`

Set to true to not call `event.stopPropagation()` in the editor to avoid
issues with client site routing triggering when editing in Khulnasoft, causing
navigation to other pages unintended

#### Defined in

[src/components/khulnasoft-component.component.tsx:301](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L301)

## Methods

### contentError

▸ `Optional` **contentError**(`error`): `void`

Callback to run if an error occurred while fetching content.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`void`

#### Defined in

[src/components/khulnasoft-component.component.tsx:207](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L207)

___

### contentLoaded

▸ `Optional` **contentLoaded**(`data`, `content`): `void`

Function callback invoked with `data` and your content when it becomes
available.

**`see`** [https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-data-and-functions-down](https://github.com/khulnasoft-com/khulnasoft/tree/master/packages/react#passing-data-and-functions-down)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `content` | `KhulnasoftContent` |

#### Returns

`void`

#### Defined in

[src/components/khulnasoft-component.component.tsx:189](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L189)

___

### onStateChange

▸ `Optional` **onStateChange**(`newData`): `void`

Callback to run when Khulnasoft state changes (e.g. state.foo = 'bar' in an
action)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newData` | `any` |

#### Returns

`void`

#### Defined in

[src/components/khulnasoft-component.component.tsx:225](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L225)

___

### renderLink

▸ `Optional` **renderLink**(`props`): `ReactNode`

Instead of having Khulnasoft render a link for you with plain anchor
elements, use your own function. Useful when using Next.js, Gatsby, or
other client side routers' custom `<Link>` components.

## Notes

This must be a function that returns JSX, not a component!

## Examples

**`see`** [https://github.com/khulnasoft-com/khulnasoft/blob/0f0bc1ca835335f99fc21efb20ff3c4836bc9f41/examples/next-js-khulnasoft-site/src/functions/render-link.tsx#L6](https://github.com/khulnasoft-com/khulnasoft/blob/0f0bc1ca835335f99fc21efb20ff3c4836bc9f41/examples/next-js-khulnasoft-site/src/functions/render-link.tsx#L6)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `AnchorHTMLAttributes`<`any`\> |

#### Returns

`ReactNode`

#### Defined in

[src/components/khulnasoft-component.component.tsx:203](https://github.com/khulnasoft-com/khulnasoft/blob/ee7a3a06/packages/react/src/components/khulnasoft-component.component.tsx#L203)
