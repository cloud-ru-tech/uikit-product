import { ReactNode } from 'react';

import { XAxisPosition } from './constants';

export type HeatMapChartAxisOptions = {
  label?: string;
  ticks?: string[];
};

export type HeatMapChartLegendOptions = {
  show?: boolean;
};

export type HeatMapChartAxesOptions = {
  xAxis?: HeatMapChartAxisOptions & { position?: XAxisPosition };
  yAxis?: HeatMapChartAxisOptions;
};

export type HeatMapChartOptions = {
  title?: string;
  height?: number;
  formatter?: (value: number) => string;
  axes?: HeatMapChartAxesOptions;
  domain: [number, number];
  cellRender?: (x: number, y: number, value: number) => ReactNode;
  legend?: HeatMapChartLegendOptions;
  styles?: Partial<HeatMapChartStyles>;
};

export type HeatMapChartProps = {
  data: number[][];
  options: HeatMapChartOptions;
  className?: string;
};

export type HeatMapChartStyles = {
  xLabelsStyle: (index: number) => Record<string, string | number>;
  yLabelsStyle: (index: number) => Record<string, string | number>;
  cellStyle: (x: number, y: number, ratio: number) => Record<string, string | number>;
};
