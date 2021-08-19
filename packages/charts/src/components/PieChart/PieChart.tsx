import { ReactText, useCallback, useMemo, useState } from 'react';
import { PieChart as Pie } from 'react-minimal-pie-chart';

import { WithSupportProps, extractSupportProps, truncateString } from '@sbercloud/uikit-utils';

import { CHART_COLORS, Colors } from '../../constants/colors';
import { Legend } from './Legend';
import * as S from './styled';

export type PieChartProps = {
  data: Array<{ label: ReactText; value: number }>;
  options: {
    title: string;
    width?: number;
    height?: number;
    legendTitle?: string;
  };
  aggregatedLegend?: {
    data: Array<{ label: ReactText; value: ReactText }>;
    title: string;
  };
};

export function PieChart({
  options: { width, height, title, legendTitle },
  data,
  aggregatedLegend,
  ...rest
}: WithSupportProps<PieChartProps>) {
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const colorizedData = useMemo(
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
  const onMouseOverCallback = useCallback((_, index) => setHovered(index), []);
  const onMouseOutCallback = useCallback(() => setHovered(undefined), []);
  const segmentShiftHandler = useCallback(index => (index === hovered ? 1 : 0.5), [hovered]);
  const labelRenderer = useCallback(
    ({ dataEntry, dataIndex }) => (
      <>
        <S.SvgText x={50} y={48} data-hovered={hovered === dataIndex || undefined} key={`${dataIndex}_label`}>
          {truncateString(dataEntry.label, 15)}
        </S.SvgText>
        <S.SvgText
          x={50}
          y={55}
          data-hovered={hovered === dataIndex || undefined}
          data-bolder
          key={`${dataIndex}_value`}
        >
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
            animationDuration={1000}
            animate
            lineWidth={50}
            radius={45}
            label={labelRenderer}
            data={colorizedData}
            segmentsStyle={segmentStyles}
            segmentsShift={segmentShiftHandler}
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
