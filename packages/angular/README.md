# Khulnasoft Angular SDK

Use the Khulnasoft Angular SDK to use Angular with Khulnasoft. You can get started by heading over to Khulnasoft's official documentation or digging right into the code in this directory. The official documentation provides more explicit instructions, while this README shares more general pointers.

## Option 1 (for those new to Angular): Use the Khulnasoft official documentation

For a step-by-step guide, see the Angular instructions in Khulnasoft's official [Integrating Pages](https://www.khulnasoft.com/c/docs/developers) documentation. While we recommend starting with Page building, you can also integrate sections and data:

<table>
  <tr>
    <td align="center">Integrate Page Building</td>
    <td align="center">Integrate Section Building</td>
    <td align="center">Integrate CMS Data</td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://www.khulnasoft.com/c/docs/integrating-khulnasoft-pages?codeFramework=angular">
        <img alt="CTA to integrate page buliding" src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F48bbb0ef5efb4d19a95a3f09f83c98f0" />
      </a>
    </td>
    <td align="center">
      <a href="https://www.khulnasoft.com/c/docs/integrate-section-building?codeFramework=angular">
        <img alt="CTA to integrate section buliding" src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F9db93cd1a29443fca7b67c1f9f458356" />
      </a>
    </td>    
    <td align="center">
      <a href="https://www.khulnasoft.com/c/docs/integrate-cms-data?codeFramework=angular">
        <img alt="CTA to integrate CMS data" src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F8df098759b0a4c89b8c25edec1f3c9eb" />
      </a>
    </td>        
  </tr>
</table>

## Option 2 (for the Angular aficionado): Use the brief notes below

If instead, you prefer to dive right into the code, stay here for some pointers for using the Khulnasoft Angular SDK.

### Usage

Install:

```
npm install @khulnasoft.com/angular
npm install @angular/elements
```

Add the module:

```ts
import { KhulnasoftModule } from '@khulnasoft.com/angular';

@NgModule({
  ...
  imports: [ KhulnasoftModule.forRoot('YOUR_API_KEY') ],
  ...
})
export class MyAppModule { }
```

> NOTE: You can get `YOUR_API_KEY` from https://khulnasoft.com/account/space.

And then add the component wherever you like:

```html
<!-- The model input can be any model of yours -->
<khulnasoft-component model="page" (load)="contentLoaded($event)" (error)="contentError($event)">
  <!-- Default content inside the tag shows while the khulnasoft content is fetching -->
  <div class="spinner"></div>
</khulnasoft-component>
```

Then, update your model's preview URL to enable on-site editing like in [this guide](https://www.khulnasoft.com/c/docs/guides/preview-url), and you are done!

Next, see the below info for more advanced usage, as well as [Intro to Models](https://www.khulnasoft.com/c/docs/models-intro) for creating custom models,
and [Search Enging Optimization](https://www.khulnasoft.com/c/docs/seo) for SEO optimizing your content. (For Angular use the data from the `load` output to get the custom field data.)

## Custom landing pages in your code

Replace your 404 component with something like the below to allow creating new pages in Khulnasoft easily:

```html
<!-- The model input can be any model of yours -->
<khulnasoft-component
  *ngIf="!noKhulnasoftPageForUrl"
  model="page"
  (load)="noKhulnasoftPageForUrl = $event ? false : true"
  (error)="noKhulnasoftPageForUrl = true"
>
  <!-- Default content inside the tag shows while the khulnasoft content is fetching -->
  <div class="spinner"></div>
</khulnasoft-component>
<my-404-component *ngIf="noKhulnasoftPageForUrl"> </my-404-component>
```

## Using custom fields

[Custom fields](https://www.khulnasoft.com/c/docs/custom-fields) are a powerful feature when using customized [models](https://www.khulnasoft.com/c/docs/models-intro), for all sorts of customization, such as [SEO optimization](https://www.khulnasoft.com/c/docs/seo) of your content.

```html
<khulnasoft-component model="page" (load)="contentLoaded($event)">
  <!-- Default content inside the tag shows while the khulnasoft content is fetching -->
  <div class="spinner"></div>
</khulnasoft-component>
```

```ts
contentLoaded(data) {
  // Data object (via the output $event) includes your custom fields, e.g. if you have a custom field named
  // "title"
  document.title = data.data.title
}
```

## Khulnasoft sections within existing pages

With section models you can use Khulnasoft.com components in/around existing pages (aka it doesn't have to control the whole page). See info on making custom models for this [here](https://www.khulnasoft.com/c/docs/guides/getting-started-with-models)

```html
<!-- The first part of your page -->
<khulnasoft-component model="announcement-bar">Loading..</khulnasoft-component>
<!-- the rest of your page -->
```

You can then use [queries](https://www.khulnasoft.com/c/docs/custom-fields) and [targeting](https://www.khulnasoft.com/c/docs/guides/targeting-and-scheduling) to customize what content loads where

## Use your Angular components in your Khulnasoft pages

You can drag and drop to add your Angular components in the Khulnasoft editor with a minimal tag like below:

```ts
import { KhulnasoftBlock } from '@khulnasoft.com/angular';
import { Component, Input } from '@angular/core';

@KhulnasoftBlock({
  tag: 'custom-thing',
  name: 'Custom thing',
  inputs: [
    {
      name: 'name',
      type: 'string',
    },
  ],
})
@Component({
  selector: 'custom-thing',
  template: 'Hello: {{name}}',
})
export class CustomThing {
  @Input()
  name = '';
}
```

Note that custom Angular components use [Angular elements](https://angular.io/guide/elements) and render in the browser only (no server-side rendering).

If you need server-side rendering in reusable components with Khulnasoft, consider using [symbols](https://www.khulnasoft.com/c/docs/symbols)

See [here](https://khulnasoft.com/c/docs/custom-react-components#input-type-examples) for full detail on input types available.

<img src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F82d416601dbe4abb995b558fb4c121c1" alt="Visual of using your Angular component in Khulnasoft">

### Editable Regions within your custom components

<img src="https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fb486c35599034bba9ee2aaed7f92d53e" alt="Visual of adding custom editable regions within your components in Khulnasoft">

- Register inputs for each of your editable sections of type `blocks`
- Use `khulnasoft-blocks-outlet` component to render those blocks withing your component template.

```ts
@Component({
  selector: 'custom-thing',
  template: `
    <h2>Section A</h2>
    <khulnasoft-blocks-outlet
      [blocks]="sectionA"
      [khulnasoftState]="khulnasoftState"
      [khulnasoftBlock]="khulnasoftBlock"
      dataPath="component.options.sectionA"
    ></khulnasoft-blocks-outlet>
    <h2>Section B</h2>
    <khulnasoft-blocks-outlet
      [blocks]="sectionB"
      [khulnasoftState]="khulnasoftState"
      [khulnasoftBlock]="khulnasoftBlock"
      dataPath="component.options.sectionB"
    ></khulnasoft-blocks-outlet>
  `,
})
export class CustomThing implements OnChanges {
  @Input()
  name = '';

  @Input()
  khulnasoftBlock = null;

  @Input()
  khulnasoftState = null;

  @Input()
  sectionA = null;

  @Input()
  sectionB = null;
}

KhulnasoftBlock({
  tag: 'custom-thing',
  name: 'Custom thing',
  canHaveChildren: true,
  inputs: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'sectionA',
      type: 'blocks',
      hideFromUI: true,
      helperText: 'This is an editable region where you can drag and drop blocks.',
      defaultValue: [
        {
          '@type': '@khulnasoft.com/sdk:Element',
          component: {
            name: 'Text',
            options: {
              text: 'Section A Editable in Khulnasoft...',
            },
          },
          responsiveStyles: {
            large: {
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flexShrink: '0',
              boxSizing: 'border-box',
              marginTop: '20px',
              lineHeight: 'normal',
              height: 'auto',
              textAlign: 'center',
            },
          },
        },
      ],
    },
    {
      name: 'sectionB',
      type: 'blocks',
      hideFromUI: true,
      helperText: 'This is an editable region where you can drag and drop blocks.',
      defaultValue: [
        {
          '@type': '@khulnasoft.com/sdk:Element',
          component: {
            name: 'Text',
            options: {
              text: 'Section B Editable in Khulnasoft...',
            },
          },
          responsiveStyles: {
            large: {
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flexShrink: '0',
              boxSizing: 'border-box',
              marginTop: '20px',
              lineHeight: 'normal',
              height: 'auto',
              textAlign: 'center',
            },
          },
        },
      ],
    },
  ],
})(CustomThing);
```

## Passing data and context down

You can also pass [data](https://www.khulnasoft.com/c/docs/guides/connecting-api-data) and [functions](https://www.khulnasoft.com/c/docs/react/custom-actions) down to the Khulnasoft component to use in the UIs (e.g. bind
data values to UIs e.g. for text values or iterating over lists, and actions to trigger for instance on click of a button)

All data passed down is available in Khulnasoft [actions and bindings](https://www.khulnasoft.com/c/docs/guides/custom-code) as `state.*`, for instance in the below example `state.resources`, etc will be available

```tsx
@Component({
  selector: 'app-root',
  template: '<khulnasoft-component [options]="options" [context]="context" [data]="data" model="page"></khulnasoft-component>',
})
export class AppComponent {
  options: any = {
    cacheSeconds: 1,
    data: {
      locale: 'en-US',
    },
  };

  data = {
    resources: [ { foo: 'bar'} ]
  };

  context= {
    myFunction: (text: string) => alert(text),
  }
```

You can also pass down functions, complex data like custom objects and libraries you can use `context`. Context passes all the way down (e.g. through symbols, etc). This data is not observed for changes and mutations

Context is available in [actions and bindings](https://www.khulnasoft.com/c/docs/guides/custom-code) as `context.*`, such as `context.myFunction('hello world')` in the example above

## Example projects

To see a full example integration see [here](/examples/angular) for a simple Angular + Khulnasoft.com example project,
or [here](/examples/angular-universal) for an Angular universal example
