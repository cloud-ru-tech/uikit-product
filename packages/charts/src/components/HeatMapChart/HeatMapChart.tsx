import { scaleLinear } from 'd3-scale';
import { useCallback, useMemo } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

import { Divider } from '@sbercloud/uikit-react-divider';
import { Themes, useTheme } from '@sbercloud/uikit-utils';

import { getContrastColor, getStyles, getTickValues } from './helpers';
import {
  DEFAULT_CHART_HEIGHT,
  LEGEND_HEIGHT,
  TITLE_HEIGHT,
  X_AXIS_LABEL_HEIGHT,
  X_LABELS_HEIGHT,
} from './helpers/constants';
import * as S from './styled';
import { COLORS } from './themes';
import { HeatMapChartProps } from './types';

export function HeatMapChart({ data, options }: HeatMapChartProps) {
  const { title, height = DEFAULT_CHART_HEIGHT, axes = {}, formatter, domain } = options;
  const { xAxis, yAxis } = axes;

  const { theme } = useTheme();

  const colorRange: string[] = useMemo(() => {
    switch (theme) {
      case Themes.Purple:
        return [COLORS.RANGE_START_LIGHT, COLORS.RANGE_END_PURPLE_LIGHT];
      case Themes.PurpleDark:
        return [COLORS.RANGE_START_DARK, COLORS.RANGE_END_PURPLE_DARK];
      case Themes.Green:
        return [COLORS.RANGE_START_LIGHT, COLORS.RANGE_END_GREEN_LIGHT];
      case Themes.GreenDark:
        return [COLORS.RANGE_START_DARK, COLORS.RANGE_END_GREEN_DARK];
      default:
        return [COLORS.RANGE_START_LIGHT, COLORS.RANGE_END_PURPLE_LIGHT];
    }
  }, [theme]);

  const colorScale = useMemo(() => scaleLinear(colorRange).domain(domain), [colorRange, domain]);
  const commonStyles = useMemo(() => getStyles(colorScale, data), [colorScale, data]);
  const legendTicks = useMemo(() => getTickValues(domain), [domain]);

  const cellHeight = useMemo(() => {
    const titleHeight = title ? TITLE_HEIGHT : 0;
    const xLabelsHeight = xAxis?.ticks?.length ? X_LABELS_HEIGHT : 0;
    const xAxisLabelHeight = yAxis?.ticks ? X_AXIS_LABEL_HEIGHT : 0;
    const chartHeight = height - 48 - titleHeight - xLabelsHeight - xAxisLabelHeight - LEGEND_HEIGHT;

    return `${chartHeight / data.length}px`;
  }, [data, height, title, xAxis, yAxis]);

  const gradient = useMemo(() => {
    const parts = colorRange.map((color, i) => `${color} ${i * (100 / (colorRange.length - 1))}%`);
    return `linear-gradient(90deg, ${parts})`;
  }, [colorRange]);

  const formatValue = useCallback(
    (value: number) => (formatter && typeof formatter === 'function' ? formatter(value) : value),
    [formatter],
  );

  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      <S.GridWrapper displayAsGrid={!!yAxis?.label}>
        {yAxis?.label && <S.YAxisLabel>{yAxis.label}</S.YAxisLabel>}
        <HeatMapGrid
          data={data}
          xLabels={xAxis?.ticks}
          yLabels={yAxis?.ticks}
          xLabelsPos='bottom'
          yLabelsPos='left'
          cellRender={(x: number, y: number, value: number) => (
            <S.Cell title={String(value)} color={getContrastColor(colorScale(value))}>
              {formatValue(value)}
            </S.Cell>
          )}
          xLabelsStyle={commonStyles.xLabelsStyle}
          yLabelsStyle={commonStyles.yLabelsStyle}
          cellStyle={commonStyles.cellStyle}
          cellHeight={cellHeight}
        />
      </S.GridWrapper>
      {xAxis?.label && <S.XAxisLabel>{xAxis.label}</S.XAxisLabel>}
      <S.Legend>
        <Divider />
        <S.Gradient gradient={gradient} />
        <S.LegendTicksWrapper>
          {legendTicks.map((tick: string) => (
            <S.Tick key={tick}>{tick}</S.Tick>
          ))}
        </S.LegendTicksWrapper>
      </S.Legend>
    </S.Wrapper>
  );
}
