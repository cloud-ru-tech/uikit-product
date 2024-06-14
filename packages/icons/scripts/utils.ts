export const capitalize = (value: string): string => {
  const firstLetter = value[0].toUpperCase();
  return `${firstLetter}${value.slice(1)}`;
};

export const kebabCase = (value: string): string => value.replace(/[A-Z]/g, x => '-' + x.toLowerCase());

export const replaceColorsWithValue = (icon: string, value = 'black'): string =>
  icon
    .replace(/stroke="#([A-Fa-f\d]{6})"/gim, `stroke="${value}"`)
    .replace(/fill="#([A-Fa-f\d]{6})"/gim, `fill="${value}"`);

export const removeInvalidCharacters = (value: string): string => value.replace(/[^a-zA-Z0-9\s]+/gi, '');
