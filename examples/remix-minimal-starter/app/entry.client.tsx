import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { khulnasoft, Khulnasoft } from '@khulnasoft.com/react';
import khulnasoftConfig from '../khulnasoftConfig.json';
import Counter from './components/Counter/Counter';

khulnasoft.init(khulnasoftConfig.apiKey);

Khulnasoft.registerComponent(Counter, {
  name: 'Counter',
});

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
