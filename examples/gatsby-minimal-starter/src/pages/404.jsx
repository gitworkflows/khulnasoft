import * as React from 'react';
import { KhulnasoftComponent, khulnasoft } from '@khulnasoft.com/react';
import '@khulnasoft.com/widgets';

// TODO: enter your public API key
khulnasoft.init('jdGaMusrVpYgdcAnAtgn');

const Dev404 = () => {
  const [notFound, setNotFound] = React.useState(false);
  return notFound ? (
    <NotFound /> // Your 404 content
  ) : (
    <KhulnasoftComponent
      model="page"
      contentLoaded={content => {
        if (!content) {
          setNotFound(true);
        }
      }}
    >
      <div className="loading">No matching page generated, checking Khulnasoft.com ...</div>
    </KhulnasoftComponent>
  );
};

const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

export default Dev404;
