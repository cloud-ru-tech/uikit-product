import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { truncateString } from '@sbercloud/ft-formatters';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { CHART_COLORS, Colors } from '../../constants/colors';
import { Legend } from './Legend';
import { Pie } from './Pie';
import * as S from './styled';
import { ColorizedDataType, DataType, LabelRenderFunction, LegendType, PieChartProps } from './types';

export function PieChart({
  options: { width, height, title, legendTitle, typographySize = 'l' },
  data,
  aggregatedLegend,
  onPieSegmentClick,
  onLegendItemClick,
  ...rest
}: WithSupportProps<PieChartProps>) {
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const colorizedData: ColorizedDataType[] = useMemo(
    () =>
      data.map((x, index) => {
        const colorsKey = Object.values(Colors);
        const chartColor = CHART_COLORS[colorsKey[index % colorsKey.length]];
        return {
          ...x,
          color: chartColor.stroke,
        };
      }),
    [data],
  );

  const pieStyles = useMemo(() => ({ overflow: 'overlay' }), []);
  const segmentStyles = useMemo(() => ({ transition: 'all .3s', cursor: 'pointer' }), []);
  const onMouseOverCallback = useCallback((_: unknown, index: number) => setHovered(index), []);
  const onMouseOutCallback = useCallback(() => setHovered(undefined), []);
  const onMouseDownCallback = useCallback(
    (event: MouseEvent<SVGPathElement>, index: number) => {
      event.preventDefault();

      if (onPieSegmentClick) {
        onPieSegmentClick(data[index]);
      }
    },
    [data, onPieSegmentClick],
  );
  const onColorizedLegendItemClick = useMemo(() => {
    if (!onLegendItemClick) {
      return undefined;
    }

    return (event: MouseEvent<HTMLAnchorElement>, item: LegendType) => {
      event.preventDefault();
      onLegendItemClick(item);
    };
  }, [onLegendItemClick]);
  const onAggregatedItemClick = useMemo(() => {
    const handleClick = aggregatedLegend?.onAggregatedLegendItemClick;
    if (!handleClick) {
      return undefined;
    }

    return (event: MouseEvent<HTMLAnchorElement>, item: LegendType) => {
      event.preventDefault();
      handleClick(item);
    };
  }, [aggregatedLegend]);

  const labelRenderer = useCallback<LabelRenderFunction<DataType>>(
    ({ dataEntry, dataIndex }) => (
      <>
        <S.SvgText x={0} y={-4} data-hovered={hovered === dataIndex || undefined} key={`${dataIndex}_label`}>
          {truncateString(String(dataEntry.label), 15)}
        </S.SvgText>
        <S.SvgText x={0} y={4} data-hovered={hovered === dataIndex || undefined} data-bolder key={`${dataIndex}_value`}>
          {dataEntry.value}
        </S.SvgText>
      </>
    ),
    [hovered],
  );

  return (
    <S.Wrapper width={width} height={height} {...extractSupportProps(rest)}>
      <Typography purpose={'title'} family={'sans'} size={typographySize} className={S.titleClassname}>
        {title}
      </Typography>
      <S.ContentWrapper>
        <S.LegendWrapper>
          <Legend
            data={colorizedData}
            legendTitle={legendTitle}
            onItemClick={onColorizedLegendItemClick}
            typographySize={typographySize}
          />
        </S.LegendWrapper>
        <S.PieWrapper>
          <Pie
            style={pieStyles}
            radius={46}
            innerRadius={23}
            label={labelRenderer}
            data={colorizedData}
            segmentsStyle={segmentStyles}
            segmentsShift={0.015}
            hoveredIndex={hovered}
            onMouseOver={onMouseOverCallback}
            onMouseOut={onMouseOutCallback}
            onMouseDown={onMouseDownCallback}
          />
        </S.PieWrapper>
        {aggregatedLegend && (
          <S.LegendWrapper>
            <Legend
              data={aggregatedLegend.data}
              legendTitle={aggregatedLegend.title}
              onItemClick={onAggregatedItemClick}
              typographySize={typographySize}
            />
          </S.LegendWrapper>
        )}
      </S.ContentWrapper>
    </S.Wrapper>
  );
}
