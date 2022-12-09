import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  HeaderBalanceTooltipBalance = 'header-balance-tooltip-balance',
  HeaderBalanceTooltipLimit = 'header-balance-tooltip-limit',
  HeaderBalanceTooltipRecharge = 'header-balance-tooltip-recharge',

  HeaderProjectSelectorCreateProject = 'header-project-selector-create-project',
  HeaderProjectSelectorCreateWorkspace = 'header-project-selector-create-workspace',
  HeaderProjectSelectorEditOption = 'header-project-selector-edit-option',

  NoDataFound = 'no-data-found',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Баланс',
    [Texts.HeaderBalanceTooltipLimit]: 'Лимит',
    [Texts.HeaderBalanceTooltipRecharge]: 'Пополнить баланс',

    [Texts.HeaderProjectSelectorCreateProject]: 'Создать проект',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Создать workspace',
    [Texts.HeaderProjectSelectorEditOption]: 'Редактировать',

    [Texts.NoDataFound]: 'Ничего не найдено',
  },
  [LanguageCodeType.enGB]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Balance',
    [Texts.HeaderBalanceTooltipLimit]: 'Limit',
    [Texts.HeaderBalanceTooltipRecharge]: 'Recharge the balance',

    [Texts.HeaderProjectSelectorCreateProject]: 'Create project',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Create workspace',
    [Texts.HeaderProjectSelectorEditOption]: 'Edit',

    [Texts.NoDataFound]: 'Nothing found',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'navigation');
