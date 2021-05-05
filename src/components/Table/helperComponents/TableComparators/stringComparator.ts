export const stringComparator = (strA: string, strB: string): number =>
  strA && strB ? strA.localeCompare(strB) : -1;
