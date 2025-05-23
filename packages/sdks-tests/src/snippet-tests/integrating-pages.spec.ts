import { expect } from '@playwright/test';
import { findTextInPage, test } from '../helpers/index.js';
import { launchEmbedderAndWaitForSdk, sendContentUpdateMessage } from '../helpers/visual-editor.js';

test.describe('Integrating Pages', () => {
  test.describe('Live', () => {
    test('loads homepage', async ({ page }) => {
      await page.goto('/');

      await findTextInPage({ page, text: 'Welcome to the homepage.' });
    });

    test('loads columns', async ({ page }) => {
      await page.goto('/columns');

      await findTextInPage({ page, text: 'This is the first column' });
    });
    test('loads homepage and navigates to columns', async ({ page }) => {
      await page.goto('/');

      const links = page.locator('a');

      const columnsLink = await links.filter({
        hasText: 'Columns',
      });

      await columnsLink.click();
      await findTextInPage({ page, text: 'This is the first column' });
    });
  });
  test.describe('Drafts', () => {
    test('loads homepage draft', async ({ page }) => {
      await page.goto(
        '/?khulnasoft.space=ee9f13b4981e489a9a1209887695ef2b&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=1fe45b6889284af180391da829de40a3&khulnasoft.overrides.1fe45b6889284af180391da829de40a3=1fe45b6889284af180391da829de40a3'
      );
      await expect(page.locator('body')).not.toContainText('This is the homepage.');
      await findTextInPage({ page, text: 'This is a draft.' });
    });
    test('loads draft of unpublished content', async ({ page }) => {
      await page.goto(
        '/unpublished-page?khulnasoft.space=ee9f13b4981e489a9a1209887695ef2b&khulnasoft.cachebust=true&khulnasoft.preview=page&khulnasoft.noCache=true&khulnasoft.allowTextEdit=true&__khulnasoft_editing__=true&khulnasoft.overrides.page=cd1a5f025da445dfb5311494381758d5&khulnasoft.overrides.cd1a5f025da445dfb5311494381758d5=cd1a5f025da445dfb5311494381758d5&khulnasoft.overrides.page:/unpublished-page=cd1a5f025da445dfb5311494381758d5'
      );
      await findTextInPage({ page, text: 'this is a draft of an unpublished page.' });
    });
  });
  test.describe('Visual Editor', () => {
    test('enables editing', async ({ page, basePort, sdk }) => {
      await launchEmbedderAndWaitForSdk({ path: '/', basePort, page, sdk });
    });

    test('updates homepage', async ({ page, basePort, packageName, sdk }) => {
      test.skip(
        packageName === 'nextjs-sdk-next-app',
        'Nextjs SDK does not support standard page editing.'
      );
      test.skip(
        packageName === 'gen1-next14-pages' || packageName === 'gen1-remix',
        'does not work with gen1-next or gen1-remix'
      );

      await launchEmbedderAndWaitForSdk({ path: '/', basePort, page, sdk });

      const NEW_TEXT = 'This is a new homepage.';
      const NEW_CONTENT = {
        data: {
          themeId: false,
          title: 'editing-test',
          blocks: [
            {
              '@type': '@khulnasoft.com/sdk:Element',
              '@version': 2,
              id: 'khulnasoft-008e90aac9c84d049b78a09c8e0eff29',
              component: {
                name: 'Text',
                options: { text: NEW_TEXT },
              },
              responsiveStyles: {
                large: {
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  flexShrink: '0',
                  boxSizing: 'border-box',
                  marginTop: '20px',
                  lineHeight: 'normal',
                  height: 'auto',
                },
              },
            },
          ],
        },
      };

      await sendContentUpdateMessage({ page, newContent: NEW_CONTENT, model: 'page' });
      await expect(page.frameLocator('iframe').getByText(NEW_TEXT)).toBeVisible();
    });
  });
});
