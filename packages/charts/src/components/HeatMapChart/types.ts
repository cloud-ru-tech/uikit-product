export type HeatMapChartAxisOptions = {
  label?: string;
  ticks?: string[];
};

export type HeatMapChartAxesOptions = {
  xAxis?: HeatMapChartAxisOptions;
  yAxis?: HeatMapChartAxisOptions;
};

export type HeatMapChartOptions = {
  title?: string;
  height?: number;
  formatter?: (value: number) => string;
  axes?: HeatMapChartAxesOptions;
  domain: [number, number];
};

export type HeatMapChartProps = {
  data: number[][];
  options: HeatMapChartOptions;
};

export type HeatMapChartStyles = {
  xLabelsStyle: (index: number) => Record<string, string | number>;
  yLabelsStyle: (index: number) => Record<string, string | number>;
  cellStyle: (x: number, y: number, ratio: number) => Record<string, string | number>;
};
