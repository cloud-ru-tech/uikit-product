export const generateCpuItems = (items: number[]) => items.map(item => ({ value: String(item), label: `${item} Шт` }));
export const generateRamItems = (items: number[]) => items.map(item => ({ value: String(item), label: `${item} ГБ` }));
export function generateInstanceConfigItems(items: [number, number][]) {
  return items.map(([cpu, ram]) => ({
    value: [cpu, ram].join(' '),
    label: `${cpu}vCPU, ${ram}ГБ RAM`,
  }));
}
export function generateBaseItems(arr: (string | number)[]) {
  return arr.map(item => ({ value: String(item), label: String(item) }));
}

export * from './disk';
export * from './eip';
export * from './obs';
