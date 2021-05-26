import { DEFAULT_BORDER_SIZE, DEFAULT_SIZE, Sizes } from './constants';

export const getSize = (size: string | number): number => {
  if (typeof size === 'number') {
    return size;
  }
  return (size && DEFAULT_SIZE[size]) || DEFAULT_SIZE[Sizes.Medium];
};

export const getBorderSize = (size: string | number, borderSize: number | undefined): number => {
  if (borderSize) {
    return borderSize;
  }

  return (size && DEFAULT_BORDER_SIZE[size]) || DEFAULT_BORDER_SIZE[Sizes.Medium];
};
