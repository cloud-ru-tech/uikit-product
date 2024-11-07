import Color from 'color';
import uPlot from 'uplot';

import { ColorMap, OTHER_COLORS } from '../../../constants/colors';
import { wheelZoomPlugin } from '../plugins/wheelZoomPlugin';

export const getDefaultPlotOptions = ({ computedColors }: { computedColors: ColorMap }): uPlot.Options => {
  const axisColor = new Color(computedColors[OTHER_COLORS.AxisColor]).alpha(0.8).rgb().string();
  const labelColor = computedColors[OTHER_COLORS.LabelColor];

  return {
    id: 'defaultPlot',
    title: 'Title',
    width: 800,
    height: 600,
    cursor: {
      drag: {
        x: true,
        y: true,
        dist: 10,
        uni: 10,
      },
    },
    plugins: [wheelZoomPlugin({ factor: 0.75 })],
    series: [
      {
        label: 'x',
      },
    ],
    scales: {
      x: {
        time: false,
        auto: true,
      },
      y: {
        time: false,
        auto: true,
      },
    },
    axes: [
      {
        show: true,
        label: 'x',
        labelSize: 30,
        stroke: labelColor,
        grid: {
          stroke: axisColor,
          width: 1 / devicePixelRatio,
        },
      },
      {
        show: true,
        label: 'y',
        labelSize: 30,
        stroke: labelColor,
        grid: {
          stroke: axisColor,
          width: 1 / devicePixelRatio,
        },
      },
    ],
  };
};
