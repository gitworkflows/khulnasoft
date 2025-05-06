import React, { useState } from 'react';
import { NotFound } from '../components/NotFound';
import { KhulnasoftComponent, useIsPreviewing } from '@khulnasoft.com/react';
import { CircularProgress } from '@material-ui/core';

// Match any page we don't have a hardcoded URL for and check
// Khulnasoft for a matching page. Otherwise show our 404 page
// For server side rendering see
//   Next.js: https://github.com/khulnasoft-com/khulnasoft/tree/main/packages/react/examples/next-js
//   Gatsby: https://github.com/KhulnasoftIO/gatsby-starter-khulnasoft
export const CatchAll = () => {
  const [notFound, setNotFound] = useState(false);
  const isPreviewingInKhulnasoft = useIsPreviewing();

  return (
    <>
      {!notFound ? (
        <KhulnasoftComponent
          model="page"
          contentLoaded={content => {
            if (!content && !isPreviewingInKhulnasoft) {
              setNotFound(true);
            }
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
            <CircularProgress color="inherit" disableShrink />
          </div>
        </KhulnasoftComponent>
      ) : (
        <NotFound /> // Your 404 content
      )}
    </>
  );
};
