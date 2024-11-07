import { ValueOf } from '@snack-uikit/utils';

import { DRAW_STYLES, LINE_INTERPOLATIONS, PLOT_TYPES } from './constants';

export type PlotType = ValueOf<typeof PLOT_TYPES>;
export type LineInterpolation = ValueOf<typeof LINE_INTERPOLATIONS>;
export type DrawStyle = ValueOf<typeof DRAW_STYLES>;
