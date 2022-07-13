import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { GROUPING_START } from './constants';

export type HeaderBalanceTooltipCurrencyProps = {
  value: number;
};

export function HeaderBalanceTooltipCurrency({ value }: HeaderBalanceTooltipCurrencyProps) {
  return (
    <>
      {value.toLocaleString(LanguageCodeType.ruRU, {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        useGrouping: value >= GROUPING_START,
      })}
    </>
  );
}
