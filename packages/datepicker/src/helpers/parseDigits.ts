export const parseDigits = (string: string): string => (string.match(/\d+/g) || []).join('');
