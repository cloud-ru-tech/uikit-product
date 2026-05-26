import { Page } from '@playwright/test';

import { dataTestIdSelector } from '../../../../playwright/utils';
import { HEADER_TEST_ID } from './constants';

export type GetSelectorsOptions = {
  isMobile?: boolean;
};

export function getSelectors(page: Page, options: GetSelectorsOptions = {}) {
  // Mobile: scope к drawer. Desktop: контент drawer в portal — локаторы на `page` (как до рефакторинга).
  const drawer = options.isMobile ? page.locator(dataTestIdSelector('header__drawer-menu-mobile')) : page;

  const drawerSearch = drawer.locator(dataTestIdSelector('header__drawer-menu__search'));

  const drawerSearchSettingsFuzzyOption = options.isMobile
    ? page.locator(dataTestIdSelector('list__base-item_fuzzy'))
    : page.locator(dataTestIdSelector('header__drawer-menu__search-option-fuzzy'));

  const drawerSearchSettingsPreciseOption = options.isMobile
    ? page.locator(dataTestIdSelector('list__base-item_precise'))
    : page.locator(dataTestIdSelector('header__drawer-menu__search-option-precise'));

  const selectors = {
    header: page.locator(dataTestIdSelector(HEADER_TEST_ID)),

    breadcrumbs: page.locator(dataTestIdSelector('header__breadcrumbs')),

    logo: page.locator(dataTestIdSelector('header__logo')),

    userMenuButton: page.locator(dataTestIdSelector('header__user-menu__button')),

    drawerCloseButton: page.locator(dataTestIdSelector('drawer__close-button')),

    userMenuManageProfile: page.locator(dataTestIdSelector('header__user-menu__manage-profile')),
    userMenuAddOrganization: page.locator(dataTestIdSelector('header__user-menu__add-organization')),
    userMenuSwitchTheme: page.locator(dataTestIdSelector('header__user-menu__theme-mode')),
    userMenuLogout: page.locator(dataTestIdSelector('header__user-menu__logout')),

    headerDrawerMenuSelect: page.locator(dataTestIdSelector('header__drawer-menu__select-platform')),
    selectPlatformValue: page.locator(dataTestIdSelector('header__drawer-menu__select-platform__name')),

    drawer,
    drawerSearch,
    drawerSearchInput: drawerSearch.locator('input'),
    drawerSearchClearButton: drawerSearch.locator(dataTestIdSelector('button-clear-value')),
    drawerSearchSettingsButton: drawerSearch.locator(dataTestIdSelector('header__drawer-menu__search-config-button')),
    drawerSearchSettingsFuzzyOption,
    drawerSearchSettingsPreciseOption,
    mobileSearchTriggerButton: drawer.locator(dataTestIdSelector('header__drawer-menu__close-search-icon')),
    drawerMenuButton: page.locator(dataTestIdSelector('header__drawer-menu-button')),
    drawerCardsList: drawer.locator(dataTestIdSelector('header__drawer-menu__group-cards-list')),
    drawerMenuNoItemsResults: drawer.locator(dataTestIdSelector('header__drawer-menu__no-data')),
    drawerMenuNoFoundResults: drawer.locator(dataTestIdSelector('header__drawer-menu__no-data-found')),
  };

  return {
    selectors,
    getSelectProjectOptionActions: (id: string) =>
      page.locator(dataTestIdSelector(`header__select-group__item-${id}__droplist-trigger`)),
    getSelectProjectOptionDroplist: (id: string) =>
      page.locator(dataTestIdSelector(`header__select-group__item-${id}__droplist`)),
    getSelectPlatformOption: (id: string) =>
      page.locator(dataTestIdSelector(`header__select-group-platform__item-${id}`)),
    getSelectPlatformOptionLabel: (id: string) =>
      page
        .locator(dataTestIdSelector(`header__select-group-platform__item-${id}`))
        .locator(dataTestIdSelector('list__base-item-option')),
    getDrawerMenuCard: (id: string) => drawer.locator(dataTestIdSelector(`header__drawer-menu__group-card-${id}`)),
    getDrawerMenuItem: (id: string) => drawer.locator(dataTestIdSelector(`header__drawer-menu__link-${id}`)),
    getDrawerMenuItemInGroup: (groupId: string, itemId: string) =>
      drawer
        .locator(dataTestIdSelector(`header__drawer-menu__group-card-${groupId}`))
        .locator(dataTestIdSelector(`header__drawer-menu__link-${itemId}`)),
    getDrawerMenuFavouriteItem: (id: string) =>
      drawer
        .locator(dataTestIdSelector('header__drawer-menu__group-card-favorite'))
        .locator(dataTestIdSelector(`header__drawer-menu__link-${id}`)),
    getFavouriteButton: (id: string) =>
      drawer
        .locator(dataTestIdSelector(`header__drawer-menu__link-${id}`))
        .locator(dataTestIdSelector('card-service-light__favorite-native-input')),
    getDrawerMenuSearchResultGroupByText: (text: string) =>
      drawer.locator('[data-test-id^="header__drawer-menu__group-card-"]').filter({ hasText: text }),
    getDrawerMenuSearchResultLinkInGroup: (groupLabel: string, linkLabel: string) =>
      drawer
        .locator('[data-test-id^="header__drawer-menu__group-card-"]')
        .filter({ hasText: groupLabel })
        .locator('[data-test-id^="header__drawer-menu__link-"]')
        .filter({ hasText: linkLabel }),
    getSortItem: (id: string) => page.locator(dataTestIdSelector(`list__base-item_${id}`)),
  };
}
