import { Page } from '@playwright/test';

import { dataTestIdSelector } from '../../../../playwright/utils';
import { HEADER_TEST_ID } from './constants';

export function getSelectors(page: Page) {
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

    drawerSearchInput: page.locator(dataTestIdSelector('header__drawer-menu__search')).locator('input'),
    drawerSearchClearButton: page
      .locator(dataTestIdSelector('header__drawer-menu__search'))
      .locator(dataTestIdSelector('button-clear-value')),
    drawerSearchSettingsButton: page
      .locator(dataTestIdSelector('header__drawer-menu__search'))
      .locator(dataTestIdSelector('header__drawer-menu__search-config-button')),
    drawerSearchSettingsFuzzyOption: page.locator(dataTestIdSelector('header__drawer-menu__search-option-fuzzy')),
    drawerSearchSettingsPreciseOption: page.locator(dataTestIdSelector('header__drawer-menu__search-option-precise')),
    mobileSearchTriggerButton: page.locator(dataTestIdSelector('header__drawer-menu__close-search-icon')),
    drawerMenuButton: page.locator(dataTestIdSelector('header__drawer-menu-button')),
    drawerCardsList: page.locator(dataTestIdSelector('header__drawer-menu__group-cards-list')),
    drawerMenuNoItemsResults: page.locator(dataTestIdSelector('header__drawer-menu__no-data')),
    drawerMenuNoFoundResults: page.locator(dataTestIdSelector('header__drawer-menu__no-data-found')),
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
    getDrawerMenuCard: (id: string) => page.locator(dataTestIdSelector(`header__drawer-menu__group-card-${id}`)),
    getDrawerMenuItem: (id: string) => page.locator(dataTestIdSelector(`header__drawer-menu__link-${id}`)),
    getDrawerMenuFavouriteItem: (id: string) =>
      page
        .locator(dataTestIdSelector('header__drawer-menu__group-card-favorite'))
        .locator(dataTestIdSelector(`header__drawer-menu__link-${id}`)),
    getFavouriteButton: (id: string) =>
      page
        .locator(dataTestIdSelector(`header__drawer-menu__link-${id}`))
        .locator(dataTestIdSelector('card-service-small__favorite-native-input')),
    getDrawerMenuSearchResultGroupByText: (text: string) =>
      page.locator('[data-test-id^="header__drawer-menu__group-card-"]').filter({ hasText: text }),
    getDrawerMenuSearchResultLinkByText: (text: string) =>
      page.locator('[data-test-id^="header__drawer-menu__link-"]').filter({ hasText: text }),
    getSortItem: (id: string) => page.locator(dataTestIdSelector(`list__base-item_${id}`)),
  };
}
