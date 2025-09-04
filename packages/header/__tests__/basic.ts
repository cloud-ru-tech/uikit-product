import { test } from 'testcafe';

import { getDrawerMenuFavouriteItem, getDrawerMenuItem, getFavouriteButton, selectors } from './selectors';

export function basic() {
  test('drawer menu > should add and remove favourite', async t => {
    const { drawerMenuButton } = selectors;

    await t.click(drawerMenuButton);
    await t.hover(getDrawerMenuItem('vms'));
    await t.click(getFavouriteButton('vms'));
    await t.expect(getDrawerMenuFavouriteItem('vms').exists).ok('Favourite is missing');

    await t.hover(getDrawerMenuFavouriteItem('vms'));
    await t.click(getDrawerMenuFavouriteItem('vms'));

    await t.expect(getDrawerMenuFavouriteItem('vms').exists).notOk('Favourite is present');
  });
}
