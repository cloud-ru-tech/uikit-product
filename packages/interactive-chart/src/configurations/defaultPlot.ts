import { wheelZoomPlugin } from '../helpers/wheelZoomPlugin';

export const defaultPlotOptions: uPlot.Options = {
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
      stroke: '#808080',
      grid: {
        stroke: 'rgba(128, 128, 128, 0.15)',
        width: 1 / devicePixelRatio,
      },
    },
    {
      show: true,
      label: 'y',
      labelSize: 30,
      stroke: '#808080',
      grid: {
        stroke: 'rgba(128, 128, 128, 0.15)',
        width: 1 / devicePixelRatio,
      },
    },
  ],
};
