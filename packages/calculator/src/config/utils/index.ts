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
