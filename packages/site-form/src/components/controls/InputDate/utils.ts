export const toUtcIsoDate = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();

export const fromUtcIsoDate = (value: string) => {
  const date = new Date(value);

  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};
