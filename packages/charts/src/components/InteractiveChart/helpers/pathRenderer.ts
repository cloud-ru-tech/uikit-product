// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import uPlot from 'uplot';

import { LINE_INTERPOLATIONS, DRAW_STYLES } from '../constants';
import { DrawStyle, LineInterpolation } from '../types';

const { linear, stepped, bars, spline } = uPlot.paths;

const _bars60_100 = bars({ size: [0.6, 100] });
const _bars100Left = bars({ size: [1], align: 1 });
const _bars100Right = bars({ size: [1], align: -1 });
const _stepBefore = stepped({ align: -1 });
const _stepAfter = stepped({ align: 1 });
const _linear = linear();
const _spline = spline();

export function getPathRenderer(drawStyle: DrawStyle, lineInterpolation?: LineInterpolation) {
  return function pathRenderer(self: uPlot, seriesIdx: number, idx0: number, idx1: number): uPlot.Series.Paths | null {
    const style = drawStyle;
    const interp = lineInterpolation;

    const renderer =
      style === DRAW_STYLES.Line
        ? interp === LINE_INTERPOLATIONS.Linear
          ? _linear
          : interp === LINE_INTERPOLATIONS.StepAfter
            ? _stepAfter
            : interp === LINE_INTERPOLATIONS.StepBefore
              ? _stepBefore
              : interp === LINE_INTERPOLATIONS.Spline
                ? _spline
                : null
        : style === DRAW_STYLES.Bars
          ? _bars60_100
          : style === DRAW_STYLES.BarsLeft
            ? _bars100Left
            : style === DRAW_STYLES.BarsRight
              ? _bars100Right
              : style === DRAW_STYLES.Points
                ? () => null
                : () => null;

    return renderer(self, seriesIdx, idx0, idx1);
  };
}
