export const isVisible = (elem?: HTMLElement | null): boolean =>
  Boolean(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
