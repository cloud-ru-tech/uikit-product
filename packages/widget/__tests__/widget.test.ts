import { expect, test } from '../../../playwright/fixtures';
import { WIDGET_TEST_IDS } from '../src/components/Widget/testIds';

const WIDGET_TEST_ID = 'widget-e2e';

test.describe('Widget', () => {
  test('при layoutType = mobile primary action не попадает в kebab-меню', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory({
      category: 'console',
      group: 'widget',
      name: 'widget',
      props: {
        'data-test-id': WIDGET_TEST_ID,
        layoutType: 'mobile',
        showActions: true,
        showCustomAction: false,
        showControlChildren: false,
      },
    });

    const root = getByTestId(WIDGET_TEST_ID);
    const kebabButton = root.getByTestId(WIDGET_TEST_IDS.kebabButton);

    await test.step('Виджет должен содержать две action кнопки - Primary и Kebab', async () => {
      const actions = root.getByTestId(WIDGET_TEST_IDS.actions);

      await expect(actions.getByRole('button')).toHaveCount(2);
      await expect(actions.getByRole('button', { name: 'Primary action' })).toBeVisible();
      await expect(kebabButton).toBeVisible();
    });

    await kebabButton.click();
    const droplist = page.getByTestId(WIDGET_TEST_IDS.kebabDroplist);
    await expect(droplist).toBeVisible();
    await page.waitForTimeout(500);

    await test.step('Kebab actions отображаются в kebab-меню', async () => {
      await expect(droplist.locator('[data-test-id^="list__base-item_"]')).toHaveCount(2);
    });

    await test.step('Primary action не отображается в kebab-меню', async () => {
      await expect(droplist.getByText('Primary action', { exact: true })).not.toBeVisible();
    });
  });
});
