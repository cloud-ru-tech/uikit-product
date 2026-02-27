import { DARK_MAP, LIGHT_MAP } from '../../constants/brandTools';

export function generateThemeStyles(mapToneToHex: Record<string, string>, invert?: boolean) {
  const generateStyle = (theme: 'dark' | 'light') => {
    const ref = theme === 'dark' ? DARK_MAP : LIGHT_MAP;
    const invertRef = theme === 'dark' ? LIGHT_MAP : DARK_MAP;

    const styleToHex: Record<string, string> = {};

    Object.keys(ref).forEach(key => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      styleToHex[`--sys-primary-${key}`] = mapToneToHex[ref[key]];
    });

    if (invert) {
      styleToHex['--sys-primary-on-accent'] = mapToneToHex[invertRef['on-accent']];
    }

    return styleToHex;
  };

  return {
    light: generateStyle('light'),
    dark: generateStyle('dark'),
  };
}
