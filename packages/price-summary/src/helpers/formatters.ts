import { formatNumber } from '@cloud-ru/ft-formatters';

import { DiscountItem } from '../types';

export function formatCurrencyValue(value: number) {
  return formatNumber(value.toFixed(2), {
    precision: 2,
  });
}

export function formatCurrency(value: number) {
  return formatNumber(value.toFixed(2), {
    precision: 2,
    type: formatNumber.types.Currency,
  });
}

export function formatQuantity(value: string | number) {
  return typeof value === 'string' ? value : '×' + value;
}

export function formatDiscountValue(discount: DiscountItem) {
  if (discount.valueFormat === 'percent' && discount.percent !== undefined) {
    return `−${formatNumber(Math.abs(discount.percent))}%`;
  }

  return formatCurrency(-Math.abs(discount.value));
}
