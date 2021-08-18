import { Series } from 'uplot';

import { CHART_COLORS, Colors } from '../../../constants/colors';
import { DrawStyles, LineInterpolations } from '../constants';
import { getPathRenderer } from '../helpers/pathRenderer';

type Layer = Partial<Series>;

export function createLayer(
  label: string,
  color: Colors,
  drawStyle: DrawStyles,
  lineInterpolation?: LineInterpolations,
): Layer {
  return { label, ...CHART_COLORS[color], width: 2, paths: getPathRenderer(drawStyle, lineInterpolation) };
}

createLayer.colors = Colors;
createLayer.drawStyles = DrawStyles;
createLayer.lineInterpolations = LineInterpolations;
