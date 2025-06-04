import { test } from 'testcafe';

import { NotificationTabs, SortVariant } from './constants';
import {
  getDrawerMenuFavouriteItem,
  getDrawerMenuItem,
  getFavouriteButton,
  getNotificationTab,
  getSortItem,
  getSortOption,
  getUserMenuOrganizationOption,
  selectors,
} from './selectors';

export function basic(getPage: (props: Record<string, unknown>) => string) {
  test.page(
    getPage({
      showUserMenu: true,
      showUserMenuLogout: false,
    }),
  )('renders with minimal user menu & select', async t => {
    const { userMenuButton, userMenuLogout } = selectors;

    await t.click(userMenuButton);

    await t.expect(getUserMenuOrganizationOption('1').exists).ok('user menu -> organization is missing');
    await t.expect(userMenuLogout.exists).notOk('user menu -> logout is present');
  });

  test.page(
    getPage({
      showUserMenu: true,
      showCustomUserMenu: true,
    }),
  )('renders with custom user menu', async t => {
    const { userMenuButton, userMenuManageProfile, userMenuAddOrganization, userMenuLogout } = selectors;

    await t.click(userMenuButton);

    await t.expect(userMenuManageProfile.exists).notOk('user menu -> manage profile is missing');
    await t.expect(getUserMenuOrganizationOption('1').exists).notOk('user menu -> organization is missing');
    await t.expect(userMenuAddOrganization.exists).notOk('user menu -> add organization is missing');
    await t.expect(userMenuLogout.exists).notOk('user menu -> logout is missing');
  });

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

  test('Should change notification tabs', async t => {
    const { notificationButton } = selectors;

    await t.click(notificationButton);
    await t.click(getNotificationTab(NotificationTabs.Unread));

    await t.expect(getNotificationTab(NotificationTabs.Unread).getAttribute('data-checked')).eql('true');
    await t.expect(getNotificationTab(NotificationTabs.All).hasAttribute('data-checked')).eql(false);
    await t.expect(getNotificationTab(NotificationTabs.System).hasAttribute('data-checked')).eql(false);

    await t.pressKey('esc');

    await t.click(notificationButton);
    await t.expect(getNotificationTab(NotificationTabs.All).getAttribute('data-checked')).eql('true');
  });
}

export function sortTests(
  menuWithSortSelect: Selector,
  getPage: (props: Record<string, unknown>) => string,
  drawerMenuSelectProjectMobile?: Selector,
) {
  test(`${SortVariant.ByCatalogs} should be by default`, async t => {
    const { selectSort } = selectors;

    await t.click(menuWithSortSelect);

    if (drawerMenuSelectProjectMobile) {
      await t.click(drawerMenuSelectProjectMobile);
    }

    await t.click(selectSort);

    await t.expect(getSortOption(SortVariant.ByCatalogs).getAttribute('data-checked')).eql('true');
  });

  test('Should save sort', async t => {
    const { selectSort } = selectors;

    await t.click(menuWithSortSelect);

    if (drawerMenuSelectProjectMobile) {
      await t.click(drawerMenuSelectProjectMobile);
    }

    await t.click(selectSort);

    await t.click(getSortOption(SortVariant.AlphabeticalAsc));

    await t.pressKey('esc');
    await t.click(drawerMenuSelectProjectMobile || menuWithSortSelect);
    await t.click(selectSort);

    await t.expect(getSortOption(SortVariant.AlphabeticalAsc).getAttribute('data-checked')).eql('true');
  });

  test.page(
    getPage({
      projectsCatalogAmount: 1,
    }),
  )(`Should hide sort by catalog`, async t => {
    const { selectSort, selectSortMenu } = selectors;

    await t.click(menuWithSortSelect);

    if (drawerMenuSelectProjectMobile) {
      await t.click(drawerMenuSelectProjectMobile);
    }

    await t.click(selectSort);

    await t.expect(getSortItem('byCatalogs').exists).notOk('Sort by catalog is present');
    await t.expect(selectSortMenu.withText('Without grouping').exists).notOk('Group items is present');
    await t.expect(selectSortMenu.withText('With grouping').exists).notOk('Group items is present');
  });
}
