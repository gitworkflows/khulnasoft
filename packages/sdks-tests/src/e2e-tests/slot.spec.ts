import { expect } from '@playwright/test';
import { FIRST_SYMBOL_CONTENT, SECOND_SYMBOL_CONTENT } from '../specs/slot-with-symbol.js';
import { checkIsRN, test } from '../helpers/index.js';

test.describe('Slot', () => {
  test('slot should render', async ({ page, packageName }) => {
    // gen1-remix skipped because React.useContext is not recognized
    test.fail(['gen1-remix'].includes(packageName));
    await page.goto('/slot');
    await expect(page.locator('text=Inside a slot!!')).toBeVisible();
  });

  test('slot should render in the correct place', async ({ page, packageName, sdk }) => {
    // gen1-remix skipped because React.useContext is not recognized
    test.fail(['gen1-remix'].includes(packageName));
    await page.goto('/slot');
    const khulnasoftTextElements = checkIsRN(sdk)
      ? page.locator('[data-testid="div"]')
      : page.locator('.khulnasoft-text');

    await expect(khulnasoftTextElements).toHaveCount(3);
    const slotElement = khulnasoftTextElements.nth(1);
    await expect(slotElement).toHaveText('Inside a slot!!');
  });

  test('slot should render with symbol (with content)', async ({ page, packageName }) => {
    // gen1-remix skipped because React.useContext is not recognized
    test.fail(['gen1-remix'].includes(packageName));
    await page.goto('/slot-with-symbol');

    await expect(page.locator('text=This is called recursion!')).toBeVisible();
  });

  test('slot should render with symbol (without content)', async ({ page, packageName, sdk }) => {
    // gen1-remix skipped because React.useContext is not recognized
    // ssr packages skipped because it fetches the slot content from the server
    test.fail(['gen1-remix', 'nextjs-sdk-next-app', 'qwik-city'].includes(packageName));

    let x = 0;

    const urlMatch =
      sdk === 'oldReact'
        ? 'https://cdn.khulnasoft.com/api/v3/query/abcd/symbol*'
        : /https:\/\/cdn\.khulnasoft\.io\/api\/v3\/content\/symbol\.*/;

    await page.route(urlMatch, route => {
      x++;

      const url = new URL(route.request().url());

      const keyName =
        sdk === 'oldReact' ? decodeURIComponent(url.pathname).split('/').reverse()[0] : 'results';

      return route.fulfill({
        status: 200,
        json: {
          [keyName]: [x === 0 ? FIRST_SYMBOL_CONTENT : SECOND_SYMBOL_CONTENT],
        },
      });
    });

    await page.goto('/slot-without-symbol');

    await expect(page.locator('text=This is called recursion!')).toBeVisible();

    await expect(x).toBeGreaterThanOrEqual(2);
  });
});
