import React, { useState, useEffect, useRef } from 'react';
import { Khulnasoft, KhulnasoftElement } from '@khulnasoft.com/react';
import { findAndRunScripts } from '../functions/find-and-run-scripts';

interface SectionRefProps {
  class?: string;
  section?: string;
  khulnasoftBlock?: KhulnasoftElement;
}
const cache: { [key: string]: string } = {};

const refs =
  Khulnasoft.isBrowser &&
  Array.from(document.querySelectorAll('[khulnasoft-shopify-section]')).reduce((memo, item) => {
    if (item.innerHTML) {
      memo[item.getAttribute('khulnasoft-shopify-section')!] = item;
    }
    return memo;
  }, {} as { [key: string]: Element });

export const SectionRef = (props: SectionRefProps) => {
  const [html, setHtml] = useState<string | null>(null);
  const sectionName = props.section?.split('/')[1]?.replace(/\.liquid$/, '')!;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const blockId = props.khulnasoftBlock?.id;
    const node = blockId && refs && refs[blockId];
    if (!node) {
      if (cache[sectionName]) {
        return;
      }
      // Convert `sections/foo.liquid` -> `foo`
      if (!sectionName) {
        return;
      }
      if (cache[sectionName]) {
        setHtml(cache[sectionName]);
        return;
      }
      // This may look strange, but it is how Shopify's section rendering API
      // works https://shopify.dev/docs/themes/sections/section-rendering-api
      // TODO: also send ?preview_theme_id and save that as a cookie or wrap this API
      // specifically with /shopify/v1/data etc
      fetch(
        `https://cdn.khulnasoft.com/api/v1/proxy-api?url=${encodeURIComponent(
          `https://${
            location.host + location.pathname.replace('/apps/khulnasoft/preview', '')
          }?section_id=${sectionName}&${location.search.replace('?', '')}`
        )}`
      )
        .then(res => res.text())
        .then(text => {
          // to ensure we don't keep fetching content for empty sections, we need to insert something
          const safeText = text || '<span></span>';
          cache[sectionName] = safeText;
          setHtml(safeText);
          setTimeout(() => {
            if (ref.current) {
              findAndRunScripts(ref.current);
            }
          }, 10);
        });
    } else {
      if (node && ref.current) {
        ref.current.parentNode?.replaceChild(node, ref.current);
      }
    }
  }, [sectionName]);

  return !sectionName ? (
    <div style={{ padding: 50, textAlign: 'center' }}>
      Please choose a valid name for your section
    </div>
  ) : (
    <div
      ref={ref}
      khulnasoft-shopify-section={props.khulnasoftBlock?.id}
      className="khulnasoft-shopify-section"
      dangerouslySetInnerHTML={{ __html: html || cache[sectionName] || '' }}
    />
  );
};

Khulnasoft.registerComponent(SectionRef, {
  name: 'Shopify:SectionRef',
  friendlyName: 'Shopify Section',
  image:
    'https://cdn.khulnasoft.com/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Ff3d80fca4afb49379d055b23e4c8b8c9',
  description: 'Include a Shopify section template',
  inputs: [
    {
      name: 'section',
      helperText: 'Full path to the section, e.g. sections/product.liquid',
      type: 'string',
      advanced: true,
    },
  ],
});
