import { nanoid } from 'nanoid';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { CRUMB_MAX_LENGTH } from './constants';
import { BreadcrumbItem, StateItem } from './types';

export const getWidth = (el?: Element | null): number =>
  el ? Math.ceil(parseFloat(window.getComputedStyle(el).width)) : 0;

export const getDiffWidth = (elFrom?: Element | null, elOut?: Element | null): number =>
  Math.ceil(
    ((elFrom && parseFloat(window.getComputedStyle(elFrom).width)) || 0) -
      ((elOut && parseFloat(window.getComputedStyle(elOut).width)) || 0),
  );

export const isEllipsisActive = (element: HTMLElement): boolean => getWidth(element) < element.scrollWidth;

export const getSubstr = (str: string): string =>
  str.length > CRUMB_MAX_LENGTH + 3 ? `${str.substring(0, CRUMB_MAX_LENGTH)}...` : str;

export const setUniqueKey = (items: BreadcrumbItem[]): StateItem[] =>
  items.map(item => ({ ...item, visible: true, key: item.key || nanoid() } as StateItem));

export const getUniqueKey = (items: (BreadcrumbItem | StateItem)[]): string => {
  const windowWidth = window.innerWidth;
  if (!items || !items.length) return `${nanoid()}.${windowWidth}`;
  return items.reduce((acc, item) => item.key + acc, `.${windowWidth}`);
};

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
    ReactDOM.render(text, div);
  }

  const lResult = {
    width: getWidth(div) + gap,
    height: div.clientHeight,
  };

  child.removeChild(div);

  return lResult;
};
