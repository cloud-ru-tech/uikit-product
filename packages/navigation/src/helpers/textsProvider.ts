import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  HeaderBalanceTooltipBalance = 'header-balance-tooltip-balance',
  HeaderBalanceTooltipLimit = 'header-balance-tooltip-limit',
  HeaderBalanceTooltipRecharge = 'header-balance-tooltip-recharge',

  HeaderProjectSelectorCreateProject = 'header-project-selector-create-project',
  HeaderProjectSelectorCreateWorkspace = 'header-project-selector-create-workspace',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Баланс',
    [Texts.HeaderBalanceTooltipLimit]: 'Лимит',
    [Texts.HeaderBalanceTooltipRecharge]: 'Пополнить баланс',

    [Texts.HeaderProjectSelectorCreateProject]: 'Создать проект',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Создать workspace',
  },
  [LanguageCodeType.enGB]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Balance',
    [Texts.HeaderBalanceTooltipLimit]: 'Limit',
    [Texts.HeaderBalanceTooltipRecharge]: 'Recharge the balance',

    [Texts.HeaderProjectSelectorCreateProject]: 'Create project',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Create workspace',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'navigation');
