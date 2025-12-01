import { expect, test } from '../../../playwright/fixtures';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const LogoIconsLight = getIconsDataTestIds('svgs/color/logos', fileName =>
  fileName.endsWith('Light.svg') ? fileName.replace('.svg', '') : '',
);

test.describe('Icons: Logo', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({ name: 'logo', group: 'icons', category: 'console' });
  });

  test('Rendered', async ({ getByTestId }) => {
    for (const icon of LogoIconsLight) {
      await expect(getByTestId(icon)).toBeVisible();
    }
  });
});
