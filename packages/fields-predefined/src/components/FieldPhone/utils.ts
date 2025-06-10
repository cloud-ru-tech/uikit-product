export const uniqueSet = <T, K extends keyof T>(arr: T[], key: K): Set<T[K]> => new Set(arr.map(obj => obj[key]));

/* Приходит +79878887879/+7987****875, на основании mask возвращается +7 987-888-78-79/+7 987-***-*8-75 */
export const formatPhoneNumber = <T extends { caption: string; mask: string }>(
  phone: string,
  countries: readonly T[],
): string => {
  const digits = phone.replace(/[^\d*]/g, '');

  const country = countries.find(item => digits.startsWith(item.caption.replace('+', '')));

  if (!country) {
    return phone;
  }

  const countryCode = country.caption.replace('+', '');
  const restNumber = digits.slice(countryCode.length);

  let formatted = '';
  let index = 0;
  for (const char of country.mask) {
    if (char === 'X') {
      formatted += restNumber.charAt(index) || '';
      index++;
    } else {
      formatted += char;
    }
  }

  return `${country.caption} ${formatted}`;
};
