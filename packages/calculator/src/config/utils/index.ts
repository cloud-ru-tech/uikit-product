import { WorkingHoursSpecification } from '../../constants';

export const generateCpuItems = (items: number[]) => items.map(item => ({ value: String(item), label: `${item} Шт` }));
export const generateRamItems = (items: number[]) => items.map(item => ({ value: String(item), label: `${item} ГБ` }));
export function generateInstanceConfigItems(items: [number, number][], valuesPostfixes?: [string, string]) {
  const { 0: fisrtPostfix = 'vCPU', 1: secondPostfix = 'ГБ RAM' } = valuesPostfixes ?? [];

  return items.map(([cpu, ram]) => ({
    value: [cpu, ram].join(' '),
    label: `${cpu}${fisrtPostfix}, ${ram}${secondPostfix}`,
  }));
}
export function generateBaseItems(arr: (string | number)[], labelReplacerFn?: (value: string) => string) {
  return arr.map(item => ({
    value: String(item),
    label: labelReplacerFn ? labelReplacerFn(String(item)) : String(item),
  }));
}

export * from './disk';
export * from './eip';
export * from './obs';
export * from './notebooks';

export const getNumeralWord = (value: number, words: string[]) => {
  const newValue = Math.abs(value) % 100;
  const num = value % 10;

  if (newValue > 10 && newValue < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};

export const getMaxWorkingHoursAmount = (
  period: WorkingHoursSpecification,
  maxHours: {
    hour: number;
    day: number;
    month: number;
  },
) => {
  switch (period) {
    case WorkingHoursSpecification.Hour:
      return maxHours.hour;
    case WorkingHoursSpecification.Day:
      return maxHours.day;
    case WorkingHoursSpecification.Month:
      return maxHours.month;
    default:
      return 1;
  }
};
