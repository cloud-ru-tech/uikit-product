import { Colors } from './types';

const COLORS_ARRAY = Object.values(Colors);

const stringToHash = (str: string, length: number): number => {
  let hash = 0,
    chr;

  for (let i = 0; i < str.length; i += 1) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  return Math.abs(hash % length);
};

export const getColor = (str: string) => {
  const hash = stringToHash(str, COLORS_ARRAY.length);

  return COLORS_ARRAY[hash];
};
