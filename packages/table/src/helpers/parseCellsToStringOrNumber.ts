export function parseCellsToStringOrNumber(arr: string[][]): (string | number)[][] {
  return arr.map(row => row.map(cell => (isNaN(Number(cell)) ? cell : Number(cell))));
}
