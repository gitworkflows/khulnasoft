import React from 'react';
import { getQueryParam } from '@/scripts/init-referrer-cookie';
import { Khulnasoft, KhulnasoftComponent } from '@khulnasoft.com/react';
import { useEffect, useState } from 'react';

// Simple page for editing components by name, e.g. ?model=symbol to edit
// symbols on site with custom components, etc
export function EditPage() {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  });

  if (!isBrowser) {
    return null;
  }

  if (!Khulnasoft.isPreviewing) {
    return null;
  }

  return (
    <KhulnasoftComponent
      model={
        getQueryParam(location.href, 'model') ||
        getQueryParam(location.href, 'modelName') ||
        'page'
      }
    />
  );
}

export default EditPage;
