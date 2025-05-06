import { expect } from '@playwright/test';
import { excludeGen1, test } from '../helpers/index.js';

test.describe('Blocks className', () => {
  test('should be present on element with class khulnasoft-blocks', async ({
    page,
    sdk,
    packageName,
  }) => {
    test.skip(excludeGen1(sdk));
    test.skip(packageName === 'react-native-74' || packageName === 'react-native-76-fabric');

    await page.goto('/blocks-class-name');
    const countOfKhulnasoftBlocksWithClassName = await page
      .locator('.khulnasoft-blocks.test-class-name')
      .count();
    expect(countOfKhulnasoftBlocksWithClassName).toBe(1);
  });
});
