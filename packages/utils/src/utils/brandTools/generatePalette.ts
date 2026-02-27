import { BASE_PALETTE, PRIMARY_BRAND_COLOR_KEY } from '../../constants/brandTools';
import { TColor } from '../../types/brandTools';
import { colorSpace } from './colorFuncs';

const { hex2color, lch2color } = colorSpace;

export function generatePalette(brandColor: string) {
  const palette: Record<string, string> = {
    ...BASE_PALETTE,
    [PRIMARY_BRAND_COLOR_KEY]: brandColor || BASE_PALETTE[PRIMARY_BRAND_COLOR_KEY],
  };

  const { h } = hex2color(brandColor) as TColor;

  Object.keys(palette).forEach(key => {
    const { l, c } = hex2color(palette[key]) as TColor;
    palette[key] = lch2color([l, c, h]).hex;
  });

  return palette;
}
