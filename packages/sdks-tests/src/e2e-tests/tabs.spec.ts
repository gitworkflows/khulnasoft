import { expect } from '@playwright/test';
import { excludeTestFor, checkIsRN, test } from '../helpers/index.js';

const TABS_CONTENT = [
  {
    label: 'Tab 1',
    content: 'inside tab 1',
  },
  {
    label: 'Tab 2',
    content: 'inside tab 2',
  },
  {
    label: 'Tab 3',
    content: 'inside tab 3',
  },
];

const DEFAULT_ACTIVE_TAB = TABS_CONTENT[0];

test.describe('Tabs Block', () => {
  test('should display the default active tab content', async ({ page, sdk }) => {
    test.fail(excludeTestFor({ rsc: true }, sdk), 'Not handled in RSC.');
    await page.goto('/tabs');
    const activeTabLabel = checkIsRN(sdk)
      ? page.locator(`[style*="rgba(0, 0, 0, 0.1)"]`)
      : page.locator('.khulnasoft-tab-active');
    const activeTabContent = page.locator(`text=${DEFAULT_ACTIVE_TAB.content}`);
    await expect(activeTabLabel).toHaveText(DEFAULT_ACTIVE_TAB.label);
    await expect(activeTabContent).toBeVisible();
  });

  test('clicking on another tab updates content', async ({ page, sdk }) => {
    test.fail(excludeTestFor({ rsc: true }, sdk), 'Not handled in RSC.');

    await page.goto('/tabs');

    for (let i = 1; i < TABS_CONTENT.length; i++) {
      await page.click(`text=${TABS_CONTENT[i].label}`, { timeout: 10000 });
      const activeTabLabel = checkIsRN(sdk)
        ? page.locator(`[style*="rgba(0, 0, 0, 0.1)"]`)
        : page.locator('.khulnasoft-tab-active');
      const activeTabContent = page.locator(`text=${TABS_CONTENT[i].content}`);
      await expect(activeTabLabel).toHaveText(TABS_CONTENT[i].label);
      await expect(activeTabContent).toBeVisible();
      for (let j = 0; j < TABS_CONTENT.length; j++) {
        if (j !== i) {
          const otherTabContent = page.locator(`text=${TABS_CONTENT[j].content}`);
          await expect(otherTabContent).not.toBeVisible();
        }
      }
    }
  });
});
