import { truncateString } from '@cloud-ru/ft-formatters';
import cn from 'classnames';
import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Scroll } from '@snack-uikit/scroll';
import { Typography } from '@snack-uikit/typography';

import { CHART_SERIES_COLORS, SERIES_COLORS, SeriesColor } from '../../constants/colors';
import { Legend } from './Legend';
import { Pie } from './Pie';
import styles from './styles.module.scss';
import { DataType, LabelRenderFunction, LegendType, PieChartProps } from './types';

export function PieChart({
  options: { width, height, title, legendTitle, typographySize = 'l' },
  data,
  aggregatedLegend,
  onPieSegmentClick,
  onLegendItemClick,
  className,
  ...rest
}: WithSupportProps<PieChartProps>) {
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const colorizedData: DataType[] = useMemo(
    () =>
      data.map((x, index) => {
        const colorsKey = Object.values<SeriesColor>(SERIES_COLORS);
        const chartColor = CHART_SERIES_COLORS[colorsKey[index % colorsKey.length]];
        return {
          ...x,
          color: x.color || chartColor,
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
        <text
          className={styles.svgText}
          x={0}
          y={-4}
          data-hovered={hovered === dataIndex || undefined}
          key={`${dataIndex}_label`}
        >
          {truncateString(String(dataEntry.label), 15)}
        </text>
        <text
          className={styles.svgText}
          x={0}
          y={4}
          data-hovered={hovered === dataIndex || undefined}
          data-bolder='true'
          key={`${dataIndex}_value`}
        >
          {dataEntry.value}
        </text>
      </>
    ),
    [hovered],
  );

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(className, styles.wrapper)}
      style={{ '--width': width ? `${width}px` : undefined, '--height': height ? `${height}px` : undefined }}
    >
      <Typography purpose={'title'} family={'sans'} size={typographySize} className={styles.title}>
        {title}
      </Typography>

      <div className={styles.contentWrapper}>
        <div className={styles.legendWrapper}>
          <Scroll size={'s'}>
            <Legend
              data={colorizedData}
              legendTitle={legendTitle}
              onItemClick={onColorizedLegendItemClick}
              typographySize={typographySize}
            />
          </Scroll>
        </div>

        <div className={styles.pieWrapper}>
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
        </div>

        {aggregatedLegend && (
          <div className={styles.legendWrapper}>
            <Scroll size={'s'}>
              <Legend
                data={aggregatedLegend.data}
                legendTitle={aggregatedLegend.title}
                onItemClick={onAggregatedItemClick}
                typographySize={typographySize}
              />
            </Scroll>
          </div>
        )}
      </div>
    </div>
  );
}
