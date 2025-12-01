import { expect, test } from '../../../../playwright/fixtures';
import { getSelectors } from './selectors';

export function basic() {
  test('drawer menu > should add and remove favourite', async ({ page }) => {
    const { selectors, getDrawerMenuItem, getFavouriteButton, getDrawerMenuFavouriteItem } = getSelectors(page);

    await selectors.drawerMenuButton.click();
    await getDrawerMenuItem('vms').hover();
    await getFavouriteButton('vms').click();
    await expect(getDrawerMenuFavouriteItem('vms')).toBeVisible();

    await getDrawerMenuFavouriteItem('vms').hover();
    await getDrawerMenuFavouriteItem('vms').click();

    await expect(getDrawerMenuFavouriteItem('vms')).not.toBeVisible();
  });
}
