import { ABBREVIATION_LENGTH } from './constants';
import { Variants } from './types';

const SPACE = ' ';

export const getAbbreviation = (str = '', variant: Variants): string => {
  let trimStr = str.trim();

  if (!trimStr) {
    return '';
  }

  trimStr = trimStr.replace(/[^a-zа-яё\s]/gi, '').trim();

  if (!trimStr) {
    trimStr = str.replace(/[^\d]/gi, '');
  }

  if (variant === Variants.Other) {
    return trimStr.charAt(0).toUpperCase();
  }

  if (trimStr && trimStr.length >= ABBREVIATION_LENGTH) {
    const arrayStrings = trimStr.split(SPACE);

    if (arrayStrings.length > 1) {
      const firstLetter = arrayStrings[0].charAt(0);
      const secondLetter = arrayStrings[arrayStrings.length - 1]?.charAt(0);

      return `${firstLetter}${secondLetter}`.toUpperCase();
    }

    return trimStr.slice(0, 2).toUpperCase();
  }

  return trimStr.toUpperCase();
};
