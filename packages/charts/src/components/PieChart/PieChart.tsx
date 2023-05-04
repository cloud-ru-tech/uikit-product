import { useCallback, useMemo, useState } from 'react';
import { PieChart as Pie } from 'react-minimal-pie-chart';
import { BaseDataEntry, LabelRenderFunction } from 'react-minimal-pie-chart/types/commonTypes';

import { truncateString } from '@sbercloud/ft-formatters';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CHART_COLORS, Colors } from '../../constants/colors';
import { Legend } from './Legend';
import * as S from './styled';

type TextLike = string | number;

type DataEntry = BaseDataEntry & {
  label: TextLike;
};

export type PieChartProps = {
  data: Array<{ label: TextLike; value: number }>;
  options: {
    title: string;
    width?: number;
    height?: number;
    legendTitle?: string;
  };
  aggregatedLegend?: {
    data: Array<{ label: TextLike; value: TextLike }>;
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
  const colorizedData: DataEntry[] = useMemo(
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
  const segmentShiftHandler = useCallback((index: number) => (index === hovered ? 1 : 0.5), [hovered]);
  const labelRenderer = useCallback<LabelRenderFunction<DataEntry>>(
    ({ dataEntry, dataIndex }) => (
      <>
        <S.SvgText x={50} y={48} data-hovered={hovered === dataIndex || undefined} key={`${dataIndex}_label`}>
          {truncateString(String(dataEntry.label), 15)}
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
