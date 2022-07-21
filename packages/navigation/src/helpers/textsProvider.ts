import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-product-utils';

export enum Texts {
  HeaderBalanceTooltipBalance = 'header-balance-tooltip-balance',
  HeaderBalanceTooltipLimit = 'header-balance-tooltip-limit',
  HeaderBalanceTooltipRecharge = 'header-balance-tooltip-recharge',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Баланс',
    [Texts.HeaderBalanceTooltipLimit]: 'Лимит',
    [Texts.HeaderBalanceTooltipRecharge]: 'Пополнить баланс',
  },
  [LanguageCodeType.enGB]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Balance',
    [Texts.HeaderBalanceTooltipLimit]: 'Limit',
    [Texts.HeaderBalanceTooltipRecharge]: 'Recharge the balance',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'navigation');
