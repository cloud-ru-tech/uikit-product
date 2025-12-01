import { expect, test } from '../../../playwright/fixtures';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const serviceIcons = getIconsDataTestIds('svgs/service-icons');

test.describe('Icons: Service Icons', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({ name: 'service', group: 'icons', category: 'console' });
  });

  test('Rendered', async ({ getByTestId }) => {
    for (const icon of serviceIcons) {
      await expect(getByTestId(icon)).toBeVisible();
    }
  });
});
