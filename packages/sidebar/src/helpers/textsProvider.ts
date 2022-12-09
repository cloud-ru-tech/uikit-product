import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  SidebarBackToPlatforms = 'sidebar-back-to-platforms-button',
  SidebarBackButton = 'sidebar-back-button',
  SidebarCloseSearch = 'sidebar-close-search',
  SidebarItemNew = 'sidebar-item-new',
  SidebarCollapseMenu = 'sidebar-collapse-menu',
  SidebarUncollapseMenu = 'sidebar-uncollapse-menu',

  SidebarStatusActive = 'sidebar-status-active',
  SidebarStatusSuspended = 'sidebar-status-suspended',

  NoDataFound = 'no-data-found',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.SidebarBackToPlatforms]: 'ко всем платформам',
    [Texts.SidebarBackButton]: 'назад',
    [Texts.SidebarCloseSearch]: 'закрыть поиск',
    [Texts.SidebarItemNew]: 'новый',
    [Texts.SidebarCollapseMenu]: 'Свернуть меню',
    [Texts.SidebarUncollapseMenu]: 'Развернуть меню',

    [Texts.SidebarStatusActive]: 'Активно',
    [Texts.SidebarStatusSuspended]: 'Приостановлено',

    [Texts.NoDataFound]: 'Ничего не найдено',
  },
  [LanguageCodeType.enGB]: {
    [Texts.SidebarBackToPlatforms]: 'to all platforms',
    [Texts.SidebarBackButton]: 'to level back',
    [Texts.SidebarCloseSearch]: 'close search',
    [Texts.SidebarItemNew]: 'new',
    [Texts.SidebarCollapseMenu]: 'Hide menu',
    [Texts.SidebarUncollapseMenu]: 'Show menu',

    [Texts.SidebarStatusActive]: 'Active',
    [Texts.SidebarStatusSuspended]: 'Suspended',

    [Texts.NoDataFound]: 'Nothing found',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'sidebar');
