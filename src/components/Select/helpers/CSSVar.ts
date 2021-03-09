export default (str: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(str);
