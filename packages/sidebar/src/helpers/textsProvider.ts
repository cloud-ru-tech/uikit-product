import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  BackToPlatforms = 'back-to-platforms-button',
  BackButton = 'back-button',
  CloseSearch = 'close-search',
  ItemNew = 'item-new',
  CollapseMenu = 'collapse-menu',
  UncollapseMenu = 'uncollapse-menu',

  StatusActive = 'status-active',
  StatusSuspended = 'status-suspended',

  NoDataFound = 'no-data-found',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.BackToPlatforms]: 'ко всем платформам',
    [Texts.BackButton]: 'назад',
    [Texts.CloseSearch]: 'закрыть поиск',
    [Texts.ItemNew]: 'новый',
    [Texts.CollapseMenu]: 'Свернуть меню',
    [Texts.UncollapseMenu]: 'Развернуть меню',

    [Texts.StatusActive]: 'Активно',
    [Texts.StatusSuspended]: 'Приостановлено',

    [Texts.NoDataFound]: 'Ничего не найдено',
  },
  [LanguageCodeType.enGB]: {
    [Texts.BackToPlatforms]: 'to all platforms',
    [Texts.BackButton]: 'to level back',
    [Texts.CloseSearch]: 'close search',
    [Texts.ItemNew]: 'new',
    [Texts.CollapseMenu]: 'Hide menu',
    [Texts.UncollapseMenu]: 'Show menu',

    [Texts.StatusActive]: 'Active',
    [Texts.StatusSuspended]: 'Suspended',

    [Texts.NoDataFound]: 'Nothing found',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'sidebar');
