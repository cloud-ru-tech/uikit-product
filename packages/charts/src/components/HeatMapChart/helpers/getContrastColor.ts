import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

export const getContrastColor = (rgb: string): string => {
  // https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
  const bgColor = rgb.split(/\(([^)]+)\)/)[1].replace(/ /g, '');
  const [r, g, b] = bgColor.split(',');
  const yiq = (Math.round(parseInt(r) * 299) + Math.round(parseInt(g) * 587) + Math.round(parseInt(b) * 114)) / 1000;

  return yiq >= 128 ? EXPORT_VARS.BLUE_GREY[60] : '#FFF';
};
