import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { BreadcrumbItem, StateItem } from './types';

export const getWidth = (el?: Element | null): number =>
  el ? Math.ceil(parseFloat(window.getComputedStyle(el).width)) : 0;

export const getDiffWidth = (elFrom?: Element | null, elOut?: Element | null): number =>
  Math.ceil(
    ((elFrom && parseFloat(window.getComputedStyle(elFrom).width)) || 0) -
      ((elOut && parseFloat(window.getComputedStyle(elOut).width)) || 0),
  );

export const isEllipsisActive = (element: HTMLElement): boolean => getWidth(element) < element.scrollWidth;

export const getSubstr = (str: string, maxlength: number): string =>
  str.length > maxlength + 3 ? `${str.substring(0, maxlength)}...` : str;

export const toStateItems = (items: BreadcrumbItem[]): StateItem[] =>
  items.map(
    (item, index) =>
      ({
        ...item,
        visible: true,
        key: item.key || index.toString(),
      }) as StateItem,
  );

export const measureText = (child: HTMLDivElement, text: string | ReactElement): { width: number; height: number } => {
  const style = window?.getComputedStyle(child);
  const gap = parseFloat(style.gap);

  const div = document.createElement('div');

  child.appendChild(div);

  div.style.font = 'inherit';
  div.style.position = 'absolute';
  div.style.left = '-1000px';
  div.style.top = '-1000px';

  if (typeof text === 'string') {
    div.innerHTML = text;
  } else {
    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(text, div);
  }

  const lResult = {
    width: getWidth(div) + gap,
    height: div.clientHeight,
  };

  child.removeChild(div);

  return lResult;
};
