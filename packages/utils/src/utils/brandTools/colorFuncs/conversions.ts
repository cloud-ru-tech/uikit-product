// Source: https://drafts.csswg.org/css-color-4/conversions.js

import { LAB as LAB_T, LCH as LCH_T, RGB as RBG_T, XYZ as XYZ_T } from '../../../types/brandTools';
import { multiplyMatrices } from './multiply-matrices';

type Refs = [number, number, number];

// Sample code for color conversions
// Conversion can also be done using ICC profiles and a Color Management System
// For clarity, a library is used for matrix multiplication (multiply-matrices.js)

// standard white points, defined by 4-figure CIE x,y chromaticities
export const D50: Refs = [0.3457 / 0.3585, 1.0, (1.0 - 0.3457 - 0.3585) / 0.3585];
export const D65: Refs = [0.3127 / 0.329, 1.0, (1.0 - 0.3127 - 0.329) / 0.329];

// OKLab and OKLCH
// https://bottosson.github.io/posts/oklab/

// XYZ <-> LMS matrices recalculated for consistent reference white
// see https://github.com/w3c/csswg-drafts/issues/6642#issuecomment-943521484

export function XYZ_to_OKLab(XYZ: XYZ_T): LAB_T {
  // Given XYZ relative to D65, convert to OKLab
  const XYZtoLMS = [
    [0.8190224432164319, 0.3619062562801221, -0.12887378261216414],
    [0.0329836671980271, 0.9292868468965546, 0.03614466816999844],
    [0.048177199566046255, 0.26423952494422764, 0.6335478258136937],
  ];
  const LMStoOKLab = [
    [0.2104542553, 0.793617785, -0.0040720468],
    [1.9779984951, -2.428592205, 0.4505937099],
    [0.0259040371, 0.7827717662, -0.808675766],
  ];

  const LMS = multiplyMatrices(XYZtoLMS, XYZ);

  return multiplyMatrices(
    LMStoOKLab,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LMS.map(c => Math.cbrt(c)),
  ) as unknown as LAB_T;
  // L in range [0,1]. For use in CSS, multiply by 100 and add a percent
}

export function OKLab_to_XYZ(OKLab: LAB_T): XYZ_T {
  // Given OKLab, convert to XYZ relative to D65
  const LMStoXYZ = [
    [1.2268798733741557, -0.5578149965554813, 0.28139105017721583],
    [-0.04057576262431372, 1.1122868293970594, -0.07171106666151701],
    [-0.07637294974672142, -0.4214933239627914, 1.5869240244272418],
  ];
  const OKLabtoLMS = [
    // eslint-disable-next-line no-loss-of-precision
    [0.99999999845051981432, 0.39633779217376785678, 0.21580375806075880339],

    // eslint-disable-next-line no-loss-of-precision
    [1.0000000088817607767, -0.1055613423236563494, -0.063854174771705903402],

    // eslint-disable-next-line no-loss-of-precision
    [1.0000000546724109177, -0.089484182094965759684, -1.2914855378640917399],
  ];

  const LMSnl = multiplyMatrices(OKLabtoLMS, OKLab);
  return multiplyMatrices(
    LMStoXYZ,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    LMSnl.map(c => c ** 3),
  ) as unknown as XYZ_T;
}

export function OKLab_to_OKLCH(OKLab: LAB_T): LCH_T {
  const hue = (Math.atan2(OKLab[2], OKLab[1]) * 180) / Math.PI;
  return [
    OKLab[0], // L is still L
    Math.sqrt(OKLab[1] ** 2 + OKLab[2] ** 2), // Chroma
    hue >= 0 ? hue : hue + 360, // Hue, in degrees [0 to 360)
  ];
}

export function OKLCH_to_OKLab(OKLCH: LCH_T): LAB_T {
  return [
    OKLCH[0], // L is still L
    OKLCH[1] * Math.cos((OKLCH[2] * Math.PI) / 180), // a
    OKLCH[1] * Math.sin((OKLCH[2] * Math.PI) / 180), // b
  ];
}

export function lin_sRGB(RGB: RBG_T): RBG_T {
  // convert an array of sRGB values
  // where in-gamut values are in the range [0 - 1]
  // to linear light (un-companded) form.
  // https://en.wikipedia.org/wiki/SRGB
  // Extended transfer function:
  // for negative values,  linear portion is extended on reflection of axis,
  // then reflected power function is used.
  return RGB.map(function (val) {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs < 0.04045) {
      return val / 12.92;
    }

    return sign * Math.pow((abs + 0.055) / 1.055, 2.4);
  }) as RBG_T;
}

export function gam_sRGB(RGB: RBG_T): RBG_T {
  // convert an array of linear-light sRGB values in the range 0.0-1.0
  // to gamma corrected form
  // https://en.wikipedia.org/wiki/SRGB
  // Extended transfer function:
  // For negative values, linear portion extends on reflection
  // of axis, then uses reflected pow below that
  return RGB.map(function (val) {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    if (abs > 0.0031308) {
      return sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
    }

    return 12.92 * val;
  }) as RBG_T;
}

export function lin_sRGB_to_XYZ(rgb: RBG_T): XYZ_T {
  // convert an array of linear-light sRGB values to CIE XYZ
  // using sRGB's own white, D65 (no chromatic adaptation)

  const M = [
    [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
    [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
    [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
  ];
  return multiplyMatrices(M, rgb) as unknown as XYZ_T;
}

export function XYZ_to_lin_sRGB(XYZ: XYZ_T): RBG_T {
  // convert XYZ to linear-light sRGB

  const M = [
    [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
    [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
    [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
  ];

  return multiplyMatrices(M, XYZ) as unknown as RBG_T;
}
