import { expect } from '@playwright/test';
import { isSSRFramework, test } from '../helpers/index.js';

test.describe('CSS Properties from Khulnasoft Content (js enabled)', () => {
  test('set image width CSS properties correctly', async ({ page, packageName }) => {
    test.skip(packageName === 'react-native-74' || packageName === 'react-native-76-fabric');
    await page.goto('/css-properties');

    const image = page.locator('.khulnasoft-image');

    await expect(image).toHaveCSS('width', '616px');
  });

  test('set var(--red-color) bg color in Box properly', async ({ page, packageName }) => {
    test.skip(packageName === 'react-native-74' || packageName === 'react-native-76-fabric');
    await page.goto('/css-properties');

    const div = page.locator('.khulnasoft-4f5a09e2a52747f8b7cb48b880636a3c');

    await expect(div).toHaveCSS('background-color', 'rgb(255, 0, 0)');
    await expect(div).toHaveCSS('--red-color', 'red');
  });
});

test.describe('CSS Properties from Khulnasoft Content (js disabled)', () => {
  test('set image width CSS properties correctly', async ({ browser, packageName }) => {
    test.skip(packageName === 'react-native-74' || packageName === 'react-native-76-fabric');
    test.fail(!isSSRFramework(packageName));

    const context = await browser.newContext({
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await page.goto('/css-properties');

    const image = page.locator('.khulnasoft-image');

    await expect(image).toHaveCSS('width', '616px');
  });

  test('set var(--red-color) bg color in Box properly', async ({ browser, packageName }) => {
    test.skip(packageName === 'react-native-74' || packageName === 'react-native-76-fabric');
    test.fail(!isSSRFramework(packageName));

    const context = await browser.newContext({
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await page.goto('/css-properties');

    const div = page.locator('.khulnasoft-4f5a09e2a52747f8b7cb48b880636a3c');

    await expect(div).toHaveCSS('background-color', 'rgb(255, 0, 0)');
    await expect(div).toHaveCSS('--red-color', 'red');
  });
});
