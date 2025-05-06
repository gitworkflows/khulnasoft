/* eslint-disable react/prop-types */
import * as React from 'react';
import { graphql } from 'gatsby';
import { KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import { Helmet } from 'react-helmet';
import '@khulnasoft.com/widgets';
import Hero from '/src/components/Hero/Hero.jsx';
import '/src/components/Hero/Hero.khulnasoft.js';
/**
 * Hero is an example of a custom component that you can use in the khulnasoft.com editor
 * https://www.khulnasoft.com/c/docs/custom-react-components
 */

// TODO: enter your public API key
khulnasoft.init('jdGaMusrVpYgdcAnAtgn');

const PageTemplate = ({ data }) => {
  const content = data.allKhulnasoftModels.page[0]?.content;
  return (
    <>
      <Helmet>
        <title>{content?.data.title}</title>
      </Helmet>
      <header></header>

      <KhulnasoftComponent content={content} model="page" />
      <footer>
        <p>A Khulnasoft.com starter with Gatsby</p>
      </footer>
    </>
  );
};

export default PageTemplate;
export const pageQuery = graphql`
  query ($path: String!) {
    allKhulnasoftModels {
      page(target: { urlPath: $path }, limit: 1, options: { cachebust: true }) {
        content
      }
    }
  }
`;
