import { isEllipsisActive } from './isEllipsisActive';

const DELIMITER_LENGTH = 4;
const DELIMITER = '...';

export const truncateStringMiddle = (element: HTMLElement | null, text: string) => {
  if (element && isEllipsisActive(element)) {
    const baseWidth = element.scrollWidth / text.length;
    const half = Math.floor((Math.floor(element.offsetWidth / baseWidth) - DELIMITER_LENGTH) / 2);
    return `${text.slice(0, half)}${DELIMITER}${text.slice(text.length - half, text.length)}`;
  }

  return text;
};
