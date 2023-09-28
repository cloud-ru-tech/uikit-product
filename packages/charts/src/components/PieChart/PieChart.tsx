import { useCallback, useMemo, useState } from 'react';

import { truncateString } from '@sbercloud/ft-formatters';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CHART_COLORS, Colors } from '../../constants/colors';
import { Legend } from './Legend';
import { Pie } from './Pie';
import * as S from './styled';
import { ColorizedDataType, DataType, LabelRenderFunction, PieChartProps } from './types';

export function PieChart({
  options: { width, height, title, legendTitle },
  data,
  aggregatedLegend,
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
  const onMouseOverCallback = useCallback((_: any, index: number) => setHovered(index), []);
  const onMouseOutCallback = useCallback(() => setHovered(undefined), []);
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
      <S.Title>{title}</S.Title>
      <S.ContentWrapper>
        <S.LegendWrapper>
          <Legend data={colorizedData} legendTitle={legendTitle} />
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
          />
        </S.PieWrapper>
        {aggregatedLegend && (
          <S.LegendWrapper>
            <Legend data={aggregatedLegend.data} legendTitle={aggregatedLegend.title} />
          </S.LegendWrapper>
        )}
      </S.ContentWrapper>
    </S.Wrapper>
  );
}
