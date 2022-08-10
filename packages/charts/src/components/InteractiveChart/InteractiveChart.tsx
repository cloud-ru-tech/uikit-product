import 'uplot/dist/uPlot.min.css';

import merge from 'lodash.merge';
import { useMemo } from 'react';
import uPlot from 'uplot';
import UPlotReact from 'uplot-react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { boxPlotOptions, defaultPlotOptions } from './configurations';
import { PlotTypes } from './constants';
import * as S from './styled';

export type InteractiveChartProps = {
  data: uPlot.AlignedData;
  options?: Partial<uPlot.Options>;
  type?: PlotTypes;
  className?: string;
};

function chooseBaseOptions(type: PlotTypes): uPlot.Options {
  switch (type) {
    case PlotTypes.BoxPlot:
      return boxPlotOptions;
    case PlotTypes.Default:
    default:
      return defaultPlotOptions;
  }
}

export function InteractiveChart({
  data,
  options,
  type = PlotTypes.Default,
  className,
  ...rest
}: WithSupportProps<InteractiveChartProps>) {
  const resultOptions = useMemo(() => merge({}, chooseBaseOptions(type), options), [options, type]);

  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      <UPlotReact options={resultOptions} data={data} />
    </S.Wrapper>
  );
}

InteractiveChart.types = PlotTypes;
