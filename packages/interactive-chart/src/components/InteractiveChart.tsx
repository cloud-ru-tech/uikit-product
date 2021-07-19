import 'uplot/dist/uPlot.min.css';

import merge from 'lodash.merge';
import { useMemo } from 'react';
import uPlot from 'uplot';
import UPlotReact from 'uplot-react';

import { boxPlotOptions, defaultPlotOptions } from '../configurations';
import { PlotTypes } from '../constants/plotTypes';
import * as S from './styled';

export type InteractiveChartProps = {
  data: uPlot.AlignedData;
  options?: Partial<uPlot.Options>;
  type?: PlotTypes;
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

export function InteractiveChart({ data, options, type = PlotTypes.Default }: InteractiveChartProps) {
  const resultOptions = useMemo(() => merge({}, chooseBaseOptions(type), options), [options, type]);

  return (
    <S.Wrapper>
      <UPlotReact options={resultOptions} data={data} />
    </S.Wrapper>
  );
}

InteractiveChart.types = PlotTypes;
