export type XYZ = [number, number, number];
export type LAB = [number, number, number];
export type LCH = [number, number, number];
export type RGB = [number, number, number];

export type Channel = 'l' | 'c' | 'h';

export type TColor = {
  l: number;
  c: number;
  h: number;
  r: number;
  g: number;
  b: number;
  hex: string;
};

export type TLchModel = {
  ranges: {
    l: { min: number; max: number; step: number };
    c: { min: number; max: number; step: number };
    h: { min: number; max: number; step: number };
  };
  xyz2lch: (xyz: XYZ) => LCH;
  lch2xyz: (lch: LCH) => XYZ;
};
