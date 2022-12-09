import { isEllipsisActive } from './isEllipsisActive';

export const truncateStringMiddle = (element: HTMLElement | null, text: string) => {
  if (element && isEllipsisActive(element)) {
    const baseWidth = element.scrollWidth / text.length;
    const half = Math.floor((Math.floor(element.offsetWidth / baseWidth) - 3) / 2);
    return `${text.slice(0, half)}...${text.slice(text.length - half, text.length)}`;
  }

  return text;
};
