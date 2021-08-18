import uPlot from 'uplot';

import { boxPlotPlugin } from '../plugins/boxPlotPlugin';
import { columnHighlightPlugin } from '../plugins/columnHighlightPlugin';
import { legendAsTooltipPlugin } from '../plugins/legendAsTooltipPlugin';

export const boxPlotOptions: uPlot.Options = {
  title: 'Distribution of object predictions by bin',
  width: 800,
  height: 600,
  cursor: {
    drag: {
      x: false,
      y: false,
    },
  },
  plugins: [boxPlotPlugin(), columnHighlightPlugin(), legendAsTooltipPlugin()],
  series: [
    {
      label: 'bin',
    },
    {
      label: 'X1',
    },
    {
      label: 'Q1',
    },
    {
      label: 'Median',
    },
    {
      label: 'Q3',
    },
    {
      label: 'X2',
    },
  ],
  scales: {
    x: {
      distr: 2,
      time: false,
      range: (self, fromMin, fromMax) => [fromMin - 1, fromMax + 1],
    },
    y: {
      time: false,
      auto: true,
    },
  },
  axes: [
    {
      label: 'Bin Number',
      labelSize: 30,
      stroke: '#808080',
      grid: {
        stroke: 'rgba(128, 128, 128, 0.15)',
        width: 1 / devicePixelRatio,
      },
    },
    {
      label: 'Prediction',
      labelSize: 30,
      stroke: '#808080',
      grid: {
        stroke: 'rgba(128, 128, 128, 0.15)',
        width: 1 / devicePixelRatio,
      },
    },
  ],
};
