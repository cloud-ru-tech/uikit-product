export const prepareValueToFilter = (value: string | boolean | undefined) =>
  value ? String(value).trim().toLowerCase() : '';
