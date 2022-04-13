export const widthToCssWidth = (width: number | string) => {
  if (typeof width === 'number') {
    return `${width}px`;
  }

  return width;
};
