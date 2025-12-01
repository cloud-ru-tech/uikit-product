import { expect, test } from '../../../playwright/fixtures';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const interfaceSystemIcons = getIconsDataTestIds('svgs/inherit/interface-icons-system');

const size = 30;

test.describe('Icons: Interface System', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({
      name: 'interface-system',
      group: 'icons',
      category: 'console',
      story: 'system',
      props: { size },
    });
  });

  test('Rendered', async ({ getByTestId }) => {
    for (const icon of interfaceSystemIcons) {
      const iconElement = getByTestId(icon);
      await expect(iconElement).toBeVisible();
      await expect(iconElement).toHaveCSS('width', `${size}px`);
      await expect(iconElement).toHaveCSS('height', `${size}px`);
    }
  });
});
