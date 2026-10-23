const PASSPORT_LENGTH = 10;
const SERIES_LENGTH = 4;

export function normalizePassport(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, PASSPORT_LENGTH);
}

export function formatPassport(raw: string): string {
  const digits = normalizePassport(raw);

  return digits.length > SERIES_LENGTH ? `${digits.slice(0, SERIES_LENGTH)} ${digits.slice(SERIES_LENGTH)}` : digits;
}
