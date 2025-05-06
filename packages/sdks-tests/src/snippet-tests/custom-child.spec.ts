import { expect } from '@playwright/test';
import { test } from '../helpers/index.js';

test.describe('Div with Hero class, and text', () => {
  test('should render the page without 404', async ({ page, packageName }) => {
    test.skip(
      [
        'react-native-74',
        'react-native-76-fabric',
        'solid',
        'solid-start',
        'gen1-next15-app',
        'angular-19-ssr',
        'gen1-next14-pages',
        'nextjs-sdk-next-app',
      ].includes(packageName)
    );

    const response = await page.goto('/custom-child');
    expect(response?.status()).toBeLessThan(400);
  });

  test('should verify khulnasoft-block with specific text', async ({ page, packageName }) => {
    test.skip(
      [
        'react-native-74',
        'react-native-76-fabric',
        'solid',
        'solid-start',
        'gen1-next15-app',
        'angular-19-ssr',
        'gen1-next14-pages',
        'nextjs-sdk-next-app',
      ].includes(packageName)
    );

    await page.goto('/custom-child');

    await page.waitForLoadState('networkidle');
    const khulnasoftBlock = page.locator('div.khulnasoft-block').first();
    await expect(khulnasoftBlock).toBeVisible();

    const column1Text = page.locator('text=This is text from your component');
    await expect(column1Text).toBeVisible();

    const column2Text = page.locator('text=This is Khulnasoft text');
    await expect(column2Text).toBeVisible();
  });
});
