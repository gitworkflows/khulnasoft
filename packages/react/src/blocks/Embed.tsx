'use client';
import React from 'react';
import { Khulnasoft } from '@khulnasoft.com/sdk';
import { withKhulnasoft } from '../functions/with-khulnasoft';

class EmbedComponent extends React.Component<any> {
  elementRef: HTMLElement | null = null;

  scriptsInserted = new Set();
  scriptsRun = new Set();

  shouldComponentUpdate(nextProps: Readonly<any>): boolean {
    return nextProps.content !== this.props.content;
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.content !== prevProps.content) {
      this.findAndRunScripts();
    }
  }

  componentDidMount() {
    this.findAndRunScripts();
  }

  findAndRunScripts() {
    if (this.elementRef && typeof window !== 'undefined') {
      const scripts = this.elementRef.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        if (script.src) {
          if (this.scriptsInserted.has(script.src)) {
            continue;
          }
          this.scriptsInserted.add(script.src);
          const newScript = document.createElement('script');
          newScript.async = true;
          newScript.src = script.src;
          document.head.appendChild(newScript);
        } else {
          if (this.scriptsRun.has(script.innerText)) {
            continue;
          }
          this.scriptsRun.add(script.innerText);
          try {
            new Function(script.innerText)();
          } catch (error) {
            console.warn('Khulnasoft custom code component error:', error);
          }
        }
      }
    }
  }

  get content() {
    // Remove scripts on server - if they manipulate dom there can be issues on hydration
    // TODO: allow this to by bypassed by context or prop that says if this is going to be HTML
    // loaded without client JS/hydration (static)
    if (Khulnasoft.isServer) {
      return (this.props.content || '').replace(/<script[\s\S]*?<\/script>/g, '');
    }
    return this.props.content;
  }

  render() {
    return (
      <div
        ref={ref => (this.elementRef = ref)}
        className="khulnasoft-embed"
        dangerouslySetInnerHTML={{ __html: this.content }}
      />
    );
  }
}

export const Embed = withKhulnasoft(EmbedComponent, {
  name: 'Embed',
  static: true,
  inputs: [
    {
      name: 'url',
      type: 'url',
      required: true,
      defaultValue: '',
      helperText: 'e.g. enter a youtube url, google map, etc',
    },
    {
      name: 'content',
      type: 'html',
      defaultValue: `<div style="padding: 20px; text-align: center">(Choose an embed URL)<div>`,
      hideFromUI: true,
    },
  ],
});
