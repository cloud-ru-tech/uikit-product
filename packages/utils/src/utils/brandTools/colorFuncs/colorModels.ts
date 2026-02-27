import { LCH, TLchModel, XYZ } from '../../../types/brandTools';
import { OKLab_to_OKLCH, OKLab_to_XYZ, OKLCH_to_OKLab, XYZ_to_OKLab } from './conversions';

/**
 * Remaps L component to percents
 * L: [0-1] -> [0-100]
 * @param lch color
 */
function toDisplayOKLCH([l, c, h]: LCH): LCH {
  return [l * 100, c, h];
}

/**
 * Parses L component from percents
 * L: [0-100] -> [0-1]
 * @param lch color
 */
function fromDisplayOKLCH([l, c, h]: LCH): LCH {
  return [l / 100, c, h];
}

export const oklch: TLchModel = {
  // name: spaceName.oklch,
  lch2xyz: (lch: LCH): XYZ => OKLab_to_XYZ(OKLCH_to_OKLab(fromDisplayOKLCH(lch))),
  xyz2lch: (xyz: XYZ): LCH => toDisplayOKLCH(OKLab_to_OKLCH(XYZ_to_OKLab(xyz))),
  ranges: {
    l: { min: 0, max: 100, step: 0.5 },
    c: { min: 0, max: 0.33, step: 0.005 },
    h: { min: 0, max: 360, step: 0.5 },
  },
};
