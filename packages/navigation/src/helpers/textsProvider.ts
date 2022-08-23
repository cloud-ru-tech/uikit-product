import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  HeaderBalanceTooltipBalance = 'header-balance-tooltip-balance',
  HeaderBalanceTooltipLimit = 'header-balance-tooltip-limit',
  HeaderBalanceTooltipRecharge = 'header-balance-tooltip-recharge',

  HeaderProjectSelectorCreateProject = 'header-project-selector-create-project',
  HeaderProjectSelectorCreateWorkspace = 'header-project-selector-create-workspace',

  SidebarBackToPlatforms = 'sidebar-back-to-platforms-button',
  SidebarBackButton = 'sidebar-back-button',
  SidebarCloseSearch = 'sidebar-close-search',
  SidebarItemNew = 'sidebar-item-new',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Баланс',
    [Texts.HeaderBalanceTooltipLimit]: 'Лимит',
    [Texts.HeaderBalanceTooltipRecharge]: 'Пополнить баланс',

    [Texts.HeaderProjectSelectorCreateProject]: 'Создать проект',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Создать workspace',

    [Texts.SidebarBackToPlatforms]: 'ко всем платформам',
    [Texts.SidebarBackButton]: 'назад',
    [Texts.SidebarCloseSearch]: 'закрыть поиск',
    [Texts.SidebarItemNew]: 'новый',
  },
  [LanguageCodeType.enGB]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Balance',
    [Texts.HeaderBalanceTooltipLimit]: 'Limit',
    [Texts.HeaderBalanceTooltipRecharge]: 'Recharge the balance',

    [Texts.HeaderProjectSelectorCreateProject]: 'Create project',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Create workspace',

    [Texts.SidebarBackToPlatforms]: 'to all platforms',
    [Texts.SidebarBackButton]: 'to level back',
    [Texts.SidebarCloseSearch]: 'close search',
    [Texts.SidebarItemNew]: 'new',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'navigation');
