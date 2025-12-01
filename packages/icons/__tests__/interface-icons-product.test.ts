import { expect, test } from '../../../playwright/fixtures';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const interfaceProductIcons = getIconsDataTestIds('svgs/inherit/interface-icons-product');

const size = 30;

test.describe('Icons: Interface Product', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({
      name: 'interface-product',
      group: 'icons',
      category: 'console',
      story: 'product',
      props: { size },
    });
  });

  test('Rendered', async ({ getByTestId }) => {
    for (const icon of interfaceProductIcons) {
      const iconElement = getByTestId(icon);
      await expect(iconElement).toBeVisible();
      await expect(iconElement).toHaveCSS('width', `${size}px`);
      await expect(iconElement).toHaveCSS('height', `${size}px`);
    }
  });
});
