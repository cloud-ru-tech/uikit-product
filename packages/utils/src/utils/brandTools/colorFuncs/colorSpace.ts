import chroma from 'chroma-js';

import { LCH, RGB, TColor, TLchModel, XYZ } from '../../../types/brandTools';
import { oklch } from './colorModels';
import { gam_sRGB, lin_sRGB, lin_sRGB_to_XYZ, XYZ_to_lin_sRGB } from './conversions';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// XYZ conversions
const xyz2rgb = (xyz: XYZ) => gam_sRGB(XYZ_to_lin_sRGB(xyz));
const rgb2xyz = (rgb: RGB) => lin_sRGB_to_XYZ(lin_sRGB(rgb));

function isWithinGamut(rgb: RGB) {
  const ε = 0.000005;
  return rgb.reduce((a, b) => a && b >= 0 - ε && b <= 1 + ε, true);
}

/** Moves an lch color into sRGB or other gamut
 *  by holding the l and h steady,
 *  and adjusting the c via binary-search
 *  until the color is on the gamut boundary.
 *  Logic by [Chris Lilley](https://svgees.us/)
 */
function forceIntoGamut(lch: LCH, lch2rgb: (lch: LCH) => RGB): RGB {
  let rgb = lch2rgb(lch);
  if (isWithinGamut(rgb)) return rgb;

  // eslint-disable-next-line prefer-const
  let [l, c, h] = lch;
  let hiC = c;
  let loC = 0;
  const ε = 0.0001; // .0001 chosen fairly arbitrarily as "close enough"
  c /= 2;

  while (hiC - loC > ε) {
    rgb = lch2rgb([l, c, h]);
    if (isWithinGamut(rgb)) loC = c;
    else hiC = c;
    c = (hiC + loC) / 2;
  }

  return rgb;
}

/** Convert sRGB to hex
 *  @param rgb — channels within [0-1]
 */
function srgb2hex([r, g, b]: RGB) {
  const toHex = (x: number) =>
    Math.round(Math.min(255, Math.max(0, x * 255)))
      .toString(16)
      .padStart(2, '0');
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

export type TColorSpace = {
  ranges: TLchModel['ranges'];
  hex2color: (hex: string) => TColor | null;
  lch2color: (lch: LCH) => TColor;
};

function colorSpaceMaker(colorSpace: TLchModel): TColorSpace {
  const { lch2xyz, xyz2lch, ranges } = colorSpace;

  const lch2rgb = (lch: LCH) => xyz2rgb(lch2xyz(lch));
  const rgb2lch = (rgb: RGB) => xyz2lch(rgb2xyz(rgb));

  function lch2color(lch: LCH): TColor {
    const xyz = lch2xyz(lch);
    const srgb = xyz2rgb(xyz);
    const within_sRGB = isWithinGamut(srgb);
    const [r, g, b] = srgb.map(c => clamp(c * 255, 0, 255));
    const [l, c, h] = lch;

    return {
      l,
      c,
      h,
      r,
      g,
      b,
      get hex() {
        const rgb = within_sRGB ? srgb : forceIntoGamut(lch, lch2rgb);
        return srgb2hex(rgb);
      },
    };
  }

  function hex2color(hex: string): TColor | null {
    if (!chroma.valid(hex)) return null;
    const rgb = chroma(hex)
      .rgb()
      .map(c => c / 255) as RGB;
    if (!rgb) return null;
    const [l, c, h] = rgb2lch(rgb);
    const [r, g, b] = rgb.map(c => clamp(c * 255, 0, 255));

    return {
      l,
      c,
      h,
      r,
      g,
      b,
      hex: srgb2hex(rgb),
    };
  }

  return { ranges, hex2color, lch2color };
}

export const colorSpace = colorSpaceMaker(oklch);
