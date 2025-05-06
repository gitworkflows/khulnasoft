import { expect } from '@playwright/test';
import { test } from '../helpers/index.js';

test.describe('Duplicate Attributes', () => {
  test('wrapped block has no duplicate attributes', async ({ page, packageName }) => {
    test.skip(packageName === 'react-native-74' || packageName === 'react-native-76-fabric');

    await page.goto('/duplicate-attributes');

    const footer = await page.locator('footer');
    const section = await page.locator('section');

    const footerId = await footer?.getAttribute('khulnasoft-id', { timeout: 10000 });
    const footerClass = await footer?.getAttribute('class', { timeout: 10000 });

    const sectionId = await section?.getAttribute('khulnasoft-id', { timeout: 10000 });
    const sectionClass = await section?.getAttribute('class', { timeout: 10000 });

    expect(footerId).toBe('khulnasoft-6a8ccf9861154b7689ba9adfe4577a55');
    expect(sectionId).toBeNull();
    expect(footerClass?.includes('khulnasoft-6a8ccf9861154b7689ba9adfe4577a55')).toBe(true);
    expect(!!sectionClass?.includes('khulnasoft-6a8ccf9861154b7689ba9adfe4577a55')).toBe(false);
  });
});
