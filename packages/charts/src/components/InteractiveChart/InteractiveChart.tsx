import 'uplot/dist/uPlot.min.css';

import './styles.module.scss';

import cn from 'classnames';
import merge from 'lodash.merge';
import { CSSProperties, useMemo } from 'react';
import uPlot from 'uplot';
import UPlotReact from 'uplot-react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import {
  CHART_OTHER_COLORS,
  CHART_SERIES_COLORS,
  COLOR_CONTAINER_CLASSNAME,
  SeriesColorMap,
} from '../../constants/colors';
import { getBoxPlotOptions, getDefaultPlotOptions } from './configurations';
import { PLOT_TYPES } from './constants';
import { useComputedColors } from './hooks/useComputedColors';
import { PlotType } from './types';

export type InteractiveChartProps = {
  data: uPlot.AlignedData;
  options?: Partial<uPlot.Options>;
  type?: PlotType;
  className?: string;
};

function chooseBaseOptions({
  type,
  computedColors,
}: {
  type: PlotType;
  computedColors: SeriesColorMap;
}): uPlot.Options {
  switch (type) {
    case PLOT_TYPES.BoxPlot:
      return getBoxPlotOptions({ computedColors });
    case PLOT_TYPES.Default:
    default:
      return getDefaultPlotOptions({ computedColors });
  }
}

export function InteractiveChart({
  data,
  options,
  type = PLOT_TYPES.Default,
  className,
  ...rest
}: WithSupportProps<InteractiveChartProps>) {
  const style = useMemo(
    () =>
      Object.entries({ ...CHART_SERIES_COLORS, ...CHART_OTHER_COLORS }).reduce((styles, [key, value]) => {
        styles[`--${key}`] = value;
        return styles;
      }, {} as CSSProperties),
    [],
  );

  const computedColors = useComputedColors();

  const resultOptions = useMemo(
    () => merge({}, chooseBaseOptions({ type, computedColors }), options),
    [computedColors, options, type],
  );

  return (
    <div {...extractSupportProps(rest)} className={cn(COLOR_CONTAINER_CLASSNAME, className)} style={style}>
      <UPlotReact options={resultOptions} data={data} />
    </div>
  );
}
