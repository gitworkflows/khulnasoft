import { khulnasoft } from '@khulnasoft.com/sdk';
import { Checkout } from './interfaces/checkout';

const currentScript = document.currentScript as HTMLScriptElement | null;
function getQueryParam(url: string, variable: string): string | null {
  const query = url.split('?')[1] || '';
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}

const overridSessionId = getQueryParam(location.href, 'khulnasoft.overrideSessionId');
if (overridSessionId) {
  const future = new Date();
  future.setMinutes(future.getMinutes() + 30);
  khulnasoft.setCookie('khulnasoft.overrideSessionId', overridSessionId, future);
}

// Ensure our code runs *after* the code that sets window.Shopify = { ... }
setTimeout(() => {
  const TRACKED_KEY = 'khulnasoft.tracked';

  const _window = window as any;

  function datePlusMinutes(minutes = 30) {
    return new Date(Date.now() + minutes * 60000);
  }

  if (!_window[TRACKED_KEY]) {
    const apiKey =
      getQueryParam((currentScript as HTMLScriptElement)?.src || '', 'apiKey') || khulnasoft.apiKey;

    if (apiKey && !khulnasoft.apiKey) {
      khulnasoft.apiKey = apiKey;
    }

    // Allow passing a session ID to the tracking script to support cross domain converison tracking
    // AKA: <script src="https://cdn.khulnasoft.com/js/shopify/track?apiKey=YOUR_KEY&sessionId={{checkout.attributes._khulnasoftSessionId}}">
    // OR: append session ID to your checkout URL
    const sessionIdParam =
      khulnasoft.getCookie('khulnasoft.overrideSessionId') ||
      getQueryParam((currentScript as HTMLScriptElement)?.src || '', 'sessionId');
    if (sessionIdParam) {
      khulnasoft.sessionId = sessionIdParam;
    }

    khulnasoft.track('pageview');
    _window[TRACKED_KEY] = true;

    const { Shopify } = _window;

    if (!apiKey) {
      console.debug('No apiKey for Khulnasoft JS', currentScript);
    } else if (!Shopify) {
      console.debug('No Shopify object');
    } else if (Shopify.checkout?.order_id) {
      // rely on updated_at since created_at is not accurate
      const orderUpdatedAt = new Date(Shopify.checkout.updated_at);

      const orderUpdatedMinutesAgo = (Date.now() - orderUpdatedAt.getTime()) / 1000 / 60;

      // Order is not old
      if (orderUpdatedMinutesAgo < 3) {
        const trackedOrdersCookieKey = `khulnasoft.trackedOrders.${Shopify.checkout.order_id}`;
        const orderWasTracked = khulnasoft.getCookie(trackedOrdersCookieKey);

        if (!orderWasTracked) {
          const checkout: Partial<Checkout> = {
            order_id: Shopify.checkout.order_id,
            currency: Shopify.checkout.currency,
          };

          khulnasoft.setCookie(trackedOrdersCookieKey, 'true', datePlusMinutes(60));

          khulnasoft.track('conversion', {
            meta: checkout,
            amount: parseFloat(checkout.subtotal_price!), // TODO: normalize currency
          });
        }
      }
    }
  }
});
