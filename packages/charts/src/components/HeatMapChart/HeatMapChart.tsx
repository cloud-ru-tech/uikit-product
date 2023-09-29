import { scaleLinear } from 'd3-scale';
import { useCallback, useMemo } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

import { Divider } from '@sbercloud/uikit-product-divider';
import { extractSupportProps, Themes, useTheme, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { XAxisPosition } from './constants';
import { getContrastColor, getStyles, getTickValues } from './helpers';
import {
  DEFAULT_CHART_HEIGHT,
  LEGEND_HEIGHT,
  TICKS_SIZE,
  TITLE_HEIGHT,
  X_AXIS_LABEL_HEIGHT,
} from './helpers/constants';
import * as S from './styled';
import { COLORS } from './themes';
import { HeatMapChartProps } from './types';

export function HeatMapChart({ data, options, className, ...rest }: WithSupportProps<HeatMapChartProps>) {
  const { title, height = DEFAULT_CHART_HEIGHT, axes = {}, formatter, legend, domain, cellRender, styles } = options;
  const { xAxis, yAxis } = axes;
  const xAxisPosition = xAxis?.position || XAxisPosition.Bottom;
  const isLegendEnabled = legend?.show ?? true;

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
    const xLabelsHeight = xAxis?.ticks?.length ? TICKS_SIZE : 0;
    const xAxisLabelHeight = yAxis?.ticks ? X_AXIS_LABEL_HEIGHT : 0;
    const legendHeight = isLegendEnabled ? LEGEND_HEIGHT : 0;
    const chartHeight = height - 48 - titleHeight - xLabelsHeight - xAxisLabelHeight - legendHeight;

    return `${chartHeight / data.length}px`;
  }, [data, height, title, xAxis, yAxis, isLegendEnabled]);

  const gradient = useMemo(() => {
    const parts = colorRange.map((color, i) => `${color} ${i * (100 / (colorRange.length - 1))}%`);
    return `linear-gradient(90deg, ${parts})`;
  }, [colorRange]);

  const formatValue = useCallback(
    (value: number) => (formatter && typeof formatter === 'function' ? formatter(value) : value),
    [formatter],
  );

  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      {title && <S.Title>{title}</S.Title>}
      {xAxis?.label && xAxisPosition === XAxisPosition.Top && <S.XAxisLabel>{xAxis.label}</S.XAxisLabel>}
      <S.GridWrapper displayAsGrid={Boolean(yAxis?.label)}>
        {yAxis?.label && <S.YAxisLabel data-x-axis-position={xAxisPosition}>{yAxis.label}</S.YAxisLabel>}
        <HeatMapGrid
          data={data}
          xLabels={xAxis?.ticks}
          yLabels={yAxis?.ticks}
          xLabelsPos={xAxisPosition}
          yLabelsPos='left'
          cellRender={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cellRender as any) ||
            ((x: number, y: number, value: number) => (
              <S.Cell title={String(value)} color={getContrastColor(colorScale(value))}>
                {formatValue(value)}
              </S.Cell>
            ))
          }
          xLabelsStyle={styles?.xLabelsStyle || commonStyles.xLabelsStyle}
          yLabelsStyle={styles?.yLabelsStyle || commonStyles.yLabelsStyle}
          cellStyle={styles?.cellStyle || commonStyles.cellStyle}
          cellHeight={cellHeight}
        />
      </S.GridWrapper>
      {xAxis?.label && xAxisPosition === XAxisPosition.Bottom && <S.XAxisLabel>{xAxis.label}</S.XAxisLabel>}
      {isLegendEnabled && (
        <S.Legend>
          <Divider />
          <S.Gradient gradient={gradient} />
          <S.LegendTicksWrapper>
            {legendTicks.map((tick: string) => (
              <S.Tick key={tick}>{tick}</S.Tick>
            ))}
          </S.LegendTicksWrapper>
        </S.Legend>
      )}
    </S.Wrapper>
  );
}

HeatMapChart.xAxisPositions = XAxisPosition;
