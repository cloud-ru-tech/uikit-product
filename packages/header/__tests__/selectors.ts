import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../testcafe/utils';
import { HEADER_TEST_ID } from './constants';

export const selectors = {
  header: Selector(dataTestIdSelector(HEADER_TEST_ID)),

  breadcrumbs: Selector(dataTestIdSelector('header__breadcrumbs')),

  logo: Selector(dataTestIdSelector('header__logo')),

  userMenuButton: Selector(dataTestIdSelector('header__user-menu__button')),

  drawerCloseButton: Selector(dataTestIdSelector('drawer__close-button')),

  userMenuManageProfile: Selector(dataTestIdSelector('header__user-menu__manage-profile')),
  userMenuAddOrganization: Selector(dataTestIdSelector('header__user-menu__add-organization')),
  userMenuSwitchTheme: Selector(dataTestIdSelector('header__user-menu__theme-mode')),
  userMenuLogout: Selector(dataTestIdSelector('header__user-menu__logout')),

  headerDrawerMenuSelect: Selector(dataTestIdSelector('header__drawer-menu__select-platform')),
  selectPlatformValue: Selector(dataTestIdSelector('header__drawer-menu__select-platform__name')),

  drawerSearchInput: Selector(dataTestIdSelector('header__drawer-menu__search')),
  drawerSearchClearButton: Selector(dataTestIdSelector('header__drawer-menu__search')).find(
    dataTestIdSelector('button-clear-value'),
  ),
  drawerSearchSettingsButton: Selector(dataTestIdSelector('header__drawer-menu__search')).find(
    dataTestIdSelector('header__drawer-menu__search-config-button'),
  ),
  drawerSearchSettingsFuzzyOption: Selector(dataTestIdSelector('header__drawer-menu__search-option-fuzzy')),
  drawerSearchSettingsPreciseOption: Selector(dataTestIdSelector('header__drawer-menu__search-option-precise')),
  mobileSearchTriggerButton: Selector(dataTestIdSelector('header__drawer-menu__close-search-icon')),
  drawerMenuButton: Selector(dataTestIdSelector('header__drawer-menu-button')),
  drawerCardsList: Selector(dataTestIdSelector('header__drawer-menu__group-cards-list')),
  drawerMenuNoItemsResults: Selector(dataTestIdSelector('header__drawer-menu__no-data')),
  drawerMenuNoFoundResults: Selector(dataTestIdSelector('header__drawer-menu__no-data-found')),
};

export function getSelectProjectOptionActions(id: string) {
  return Selector(dataTestIdSelector(`header__select-group__item-${id}__droplist-trigger`));
}

export function getSelectProjectOptionDroplist(id: string) {
  return Selector(dataTestIdSelector(`header__select-group__item-${id}__droplist`));
}

export function getSelectPlatformOption(id: string) {
  return Selector(dataTestIdSelector(`header__select-group-platform__item-${id}`));
}

export function getSelectPlatformOptionLabel(id: string) {
  return getSelectPlatformOption(id).find(dataTestIdSelector('list__base-item-option'));
}

export function getDrawerMenuCard(id: string) {
  return Selector(dataTestIdSelector(`header__drawer-menu__group-card-${id}`));
}

export function getDrawerMenuItem(id: string) {
  return Selector(dataTestIdSelector(`header__drawer-menu__link-${id}`));
}

export function getDrawerMenuFavouriteItem(id: string) {
  return getDrawerMenuCard('favorite').find(dataTestIdSelector(`header__drawer-menu__link-${id}`));
}

export function getFavouriteButton(id: string) {
  return getDrawerMenuItem(id).find(dataTestIdSelector(`card-service-small__favorite-native-input`));
}

export function getDrawerMenuSearchResultGroupByText(text: string) {
  return Selector('[data-test-id^="header__drawer-menu__group-card-"]').withText(text);
}

export function getDrawerMenuSearchResultLinkByText(text: string) {
  return Selector('[data-test-id^="header__drawer-menu__link-"]').withText(text);
}

export function getSortItem(id: string) {
  return Selector(dataTestIdSelector(`list__base-item_${id}`));
}
