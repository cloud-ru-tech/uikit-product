import { formatNumber } from '@sbercloud/ft-formatters';

export function formatCurrency(value: number) {
  return formatNumber(value, { type: formatNumber.types.Currency, precision: Number.isInteger(value) ? undefined : 2 });
}

export function formatQuantity(value: string | number) {
  return typeof value === 'string' ? value : 'x' + value;
}
