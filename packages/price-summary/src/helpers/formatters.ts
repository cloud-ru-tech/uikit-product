import { formatNumber } from '@sbercloud/ft-formatters';
import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { PricePeriod } from '../types';
import { textProvider, Texts } from './texts-provider';

export function formatCurrency(value: number) {
  return formatNumber(value, { type: formatNumber.types.Currency, precision: Number.isInteger(value) ? undefined : 2 });
}

export function formatQuantity(value: string | number) {
  return typeof value === 'string' ? value : 'x' + value;
}

const PERIOD_MAP: Record<PricePeriod, string> = {
  [PricePeriod.Month]: Texts.PricePeriodMonth,
  [PricePeriod.Day]: Texts.PricePeriodDay,
  [PricePeriod.Hour]: Texts.PricePeriodHour,
  [PricePeriod.Minute]: Texts.PricePeriodMinute,
};

export function formatPeriod(languageCode: LanguageCodeType, period: PricePeriod) {
  return textProvider(languageCode, PERIOD_MAP[period] as Texts);
}
