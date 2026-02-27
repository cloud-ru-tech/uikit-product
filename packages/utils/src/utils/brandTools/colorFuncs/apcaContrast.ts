import { APCAcontrast, sRGBtoY } from 'apca-w3';
import chroma from 'chroma-js';

export const apcaContrast = (backgroundHex: string, textHex: string): number =>
  Math.round(Math.abs(Number(APCAcontrast(sRGBtoY(chroma(textHex).rgb()), sRGBtoY(chroma(backgroundHex).rgb())))));
