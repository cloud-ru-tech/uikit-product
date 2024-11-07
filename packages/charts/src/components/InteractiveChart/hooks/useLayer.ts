import Color from 'color';
import { useMemo } from 'react';
import { Series } from 'uplot';

import { SeriesColor } from '../../../constants/colors';
import { getPathRenderer } from '../helpers/pathRenderer';
import { DrawStyle, LineInterpolation } from '../types';
import { useComputedColors } from './useComputedColors';

type Layer = Partial<Series>;
type UseLayerProps = {
  label: string;
  color: SeriesColor;
  drawStyle: DrawStyle;
  lineInterpolation?: LineInterpolation;
};

export function useLayer({ label, color, drawStyle, lineInterpolation }: UseLayerProps): Layer {
  const computedColors = useComputedColors();
  const stroke = computedColors[color];
  const fill = new Color(stroke).alpha(0.1).rgb().string();

  return useMemo(
    () => ({
      label,
      stroke,
      fill,
      width: 2,
      paths: getPathRenderer(drawStyle, lineInterpolation),
    }),
    [drawStyle, label, stroke, fill, lineInterpolation],
  );
}
