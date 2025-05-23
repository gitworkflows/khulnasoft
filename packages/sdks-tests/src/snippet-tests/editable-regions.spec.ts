import { expect } from '@playwright/test';
import { test } from '../helpers/index.js';

test.describe('Editable regions in custom components', () => {
  test('should render a div with two columns with khulnasoft-path attr', async ({
    page,
    packageName,
  }) => {
    test.skip(
      [
        'react-native-74',
        'react-native-76-fabric',
        'solid',
        'solid-start',
        'gen1-next15-app',
        'angular-19-ssr',
        'gen1-next14-pages',
        'gen1-remix',
        'gen1-react',
        'nextjs-sdk-next-app',
      ].includes(packageName)
    );

    await page.goto('/editable-region');
    await page.waitForLoadState('networkidle');

    const divs = await page.$$('div[khulnasoft-path]');

    const count = divs.length;

    expect(count).toBe(2);
  });

  test('should render a div with two columns with placeholder text', async ({
    page,
    packageName,
  }) => {
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

    await page.goto('/editable-region');

    const twoColumns = page.locator('div.khulnasoft-block').first();
    await expect(twoColumns).toBeVisible();

    const columnTexts = await twoColumns.textContent();
    expect(columnTexts).toContain('column 1 text');
    expect(columnTexts).toContain('column 2 text');
  });
});
