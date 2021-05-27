export const isVisible = (elem?: HTMLElement | null): boolean =>
  !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
