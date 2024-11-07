export const PLOT_TYPES = {
  BoxPlot: 'boxPlot',
  Default: 'default',
} as const;

export const LINE_INTERPOLATIONS = {
  Linear: 'linear',
  StepAfter: 'stepAfter',
  StepBefore: 'stepBefore',
  Spline: 'spline',
} as const;

export const DRAW_STYLES = {
  Line: 'line',
  Bars: 'bars',
  Points: 'points',
  BarsLeft: 'barsLeft',
  BarsRight: 'barsRight',
} as const;
