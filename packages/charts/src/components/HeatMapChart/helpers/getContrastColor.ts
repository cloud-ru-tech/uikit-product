export const getContrastColor = (rgb: string): string => {
  // https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
  const bgColor = rgb.split(/\(([^)]+)\)/)[1].replace(/ /g, '');
  const [r, g, b] = bgColor.split(',');
  const yiq = (Math.round(parseInt(r) * 299) + Math.round(parseInt(g) * 587) + Math.round(parseInt(b) * 114)) / 1000;

  // TODO chart-color ? sys-neutral-accent-default : sys-neutral-on-accent
  // return yiq >= 128 ? themeVars.sys.neutral.accentDefault : themeVars.sys.neutral.onAccent;
  return yiq >= 128 ? '#787b8a' : '#ffffff';
};
