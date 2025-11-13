import { themeVars } from '@snack-uikit/figma-tokens';
import { ValueOf } from '@snack-uikit/utils';

export const COLOR_CONTAINER_CLASSNAME = 'interactive-chart-wrapper';

export const SERIES_COLORS = {
  Green1: 'green1',
  Blue1: 'blue1',
  Violet1: 'violet1',
  Crimson1: 'crimson1',
  Green2: 'green2',
  Blue2: 'blue2',
  Violet2: 'violet2',
  Crimson2: 'crimson2',
  Green3: 'green3',
  Blue3: 'blue3',
  Violet3: 'violet3',
  Crimson3: 'crimson3',
  Green4: 'green4',
  Blue4: 'blue4',
  Violet4: 'violet4',
  Crimson4: 'crimson4',
};

export type SeriesColor = ValueOf<typeof SERIES_COLORS>;
export type SeriesColorMap = Record<SeriesColor, string>;

export const CHART_SERIES_COLORS: SeriesColorMap = {
  [SERIES_COLORS.Green1]: themeVars.sys.green.accentDefault,
  [SERIES_COLORS.Green2]: themeVars.sys.green.textLight,
  [SERIES_COLORS.Green3]: themeVars.sys.green.textDisabled,
  [SERIES_COLORS.Green4]: themeVars.sys.green.decorActivated,
  [SERIES_COLORS.Blue1]: themeVars.sys.blue.accentDefault,
  [SERIES_COLORS.Blue2]: themeVars.sys.blue.textLight,
  [SERIES_COLORS.Blue3]: themeVars.sys.blue.textDisabled,
  [SERIES_COLORS.Blue4]: themeVars.sys.blue.decorActivated,
  [SERIES_COLORS.Violet1]: themeVars.sys.violet.accentDefault,
  [SERIES_COLORS.Violet2]: themeVars.sys.violet.textLight,
  [SERIES_COLORS.Violet3]: themeVars.sys.violet.textDisabled,
  [SERIES_COLORS.Violet4]: themeVars.sys.violet.decorActivated,
  [SERIES_COLORS.Crimson1]: themeVars.sys.pink.accentDefault,
  [SERIES_COLORS.Crimson2]: themeVars.sys.pink.textLight,
  [SERIES_COLORS.Crimson3]: themeVars.sys.pink.textDisabled,
  [SERIES_COLORS.Crimson4]: themeVars.sys.pink.decorActivated,
};

export const OTHER_COLORS = {
  ShadowColor: 'shadowColor',
  LineColor: 'lineColor',
  TooltipBackgroundColor: 'tooltipBackgroundColor',
  TooltipColor: 'tooltipColor',
  ColumnHighlightColor: 'columnHighlightColor',
  AxisColor: 'axisColor',
  LabelColor: 'labelColor',
};

export type OtherColor = ValueOf<typeof OTHER_COLORS>;
export type OtherColorMap = Record<OtherColor, string>;

export const CHART_OTHER_COLORS: OtherColorMap = {
  [OTHER_COLORS.ShadowColor]: themeVars.sys.neutral.accentDefault,
  [OTHER_COLORS.LineColor]: themeVars.sys.neutral.onAccent,
  [OTHER_COLORS.TooltipBackgroundColor]: themeVars.sys.invertNeutral.background,
  [OTHER_COLORS.TooltipColor]: themeVars.sys.invertNeutral.textMain,
  [OTHER_COLORS.ColumnHighlightColor]: themeVars.sys.neutral.decorDefault,
  [OTHER_COLORS.AxisColor]: themeVars.sys.neutral.decorDefault,
  [OTHER_COLORS.LabelColor]: themeVars.sys.neutral.textSupport,
};

export type ColorMap = SeriesColorMap & OtherColorMap;
