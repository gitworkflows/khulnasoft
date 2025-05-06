import React, { Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react';
import cheerio from 'cheerio';
import Head from 'next/head';

function toAmp(htmlStr) {
  return (
    htmlStr
      .replace(/\skhulnasoft-[\w-]+="[^"]+"/g, ' ')
      // TODO: remove once react sdk stable 1.1.45 is released
      .replace(/loading="lazy"/g, '')
      .replace(/\sclassName="(?<values>.*?)"/g, 'class="$<values>"')
  );
}

/**
 */
const extractHeadStyles = (body) => {
  let globalStyles = '';
  let html = body;
  if (body) {
    const $ = cheerio.load(body);
    const styles = $('style');
    globalStyles = styles
      .toArray()
      .map((el) => {
        const style = $(el).html();
        html = html.replace($.html(el), '');
        return style;
      })
      .join(' ');
  }
  return { globalStyles, html };
};

export default function KhulnasoftPageWrapper(props) {
  if (Khulnasoft.isEditing || Khulnasoft.isPreviewing || !props.content) {
    return <KhulnasoftComponent {...props} />;
  }

  const ampHtml = renderToStaticMarkup(<KhulnasoftComponent {...props} />);
  const { globalStyles, html } = extractHeadStyles(ampHtml);
  // workaround a bug in nextjs causing invalid amp error https://stackoverflow.com/a/63732868/3109205
  const fixCSS = `}${globalStyles}{`;
  return (
    <Fragment>
      <Head>
        <style jsx>
          {`
            ${fixCSS}
          `}
        </style>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: toAmp(html) }} />
    </Fragment>
  );
}
