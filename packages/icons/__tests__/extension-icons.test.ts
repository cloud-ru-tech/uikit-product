import { expect, test } from '../../../playwright/fixtures';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const ExtensionIcons = getIconsDataTestIds('svgs/inherit/extension');

test.describe('Icons: Extension', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({ name: 'extension', group: 'icons', category: 'console' });
  });

  test('Rendered', async ({ getByTestId }) => {
    for (const icon of ExtensionIcons) {
      await expect(getByTestId(icon)).toBeVisible();
    }
  });
});
