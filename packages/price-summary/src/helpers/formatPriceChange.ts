import { formatNumber } from '@cloud-ru/ft-formatters';

import { PriceChangeDetails } from '../types';
import { formatCurrency } from './formatters';

export function getSign(value: number) {
  if (value > 0) {
    return '+';
  }

  if (value < 0) {
    return '-';
  }

  return '';
}

export function formatPriceChange(value: PriceChangeDetails) {
  const sign = getSign(value.value);
  const amount = `${sign}${formatCurrency(Math.abs(value.value))}`;

  if (value.percentage === undefined) {
    return amount;
  }

  return `${amount} (${sign}${formatNumber(Math.abs(value.percentage))}%)`;
}
