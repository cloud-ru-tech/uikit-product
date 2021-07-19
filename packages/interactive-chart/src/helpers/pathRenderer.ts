// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import uPlot from 'uplot';

import { DrawStyles, LineInterpolations } from '../constants/layerStyles';
const { linear, stepped, bars, spline } = uPlot.paths;

const _bars60_100 = bars({ size: [0.6, 100] });
const _bars100Left = bars({ size: [1], align: 1 });
const _bars100Right = bars({ size: [1], align: -1 });
const _stepBefore = stepped({ align: -1 });
const _stepAfter = stepped({ align: 1 });
const _linear = linear();
const _spline = spline();

export function getPathRenderer(drawStyle: DrawStyles, lineInterpolation?: LineInterpolations) {
  return function pathRenderer(self: uPlot, seriesIdx: number, idx0: number, idx1: number): uPlot.Series.Paths | null {
    const style = drawStyle;
    const interp = lineInterpolation;

    const renderer =
      style === DrawStyles.Line
        ? interp === LineInterpolations.Linear
          ? _linear
          : interp === LineInterpolations.StepAfter
          ? _stepAfter
          : interp === LineInterpolations.StepBefore
          ? _stepBefore
          : interp === LineInterpolations.Spline
          ? _spline
          : null
        : style === DrawStyles.Bars
        ? _bars60_100
        : style === DrawStyles.BarsLeft
        ? _bars100Left
        : style === DrawStyles.BarsRight
        ? _bars100Right
        : style === DrawStyles.Points
        ? () => null
        : () => null;

    return renderer(self, seriesIdx, idx0, idx1);
  };
}
