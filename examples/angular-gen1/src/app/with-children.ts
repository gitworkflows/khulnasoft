import { Component, Input } from '@angular/core';
import { KhulnasoftBlock } from '@khulnasoft.com/angular';

@Component({
  selector: 'custom-thing-children',
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
export class CustomThingChildren {
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
  tag: 'custom-thing-children',
  name: 'Custom thing with children',
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
})(CustomThingChildren);
