import { ReactNode } from 'react';

type TextLike = string | number;

type LegendType = {
  label: TextLike;
  value: TextLike;
};

export type DataType = {
  label: TextLike;
  value: number;
};
export type ColorizedDataType = {
  label: TextLike;
  value: number;
  color: string;
};

export type PieChartProps = {
  data: DataType[];
  options: {
    title: string;
    width?: number;
    height?: number;
    legendTitle?: string;
  };
  aggregatedLegend?: {
    data: LegendType[];
    title: string;
  };
};

export type LabelRenderProps<DataType> = {
  dataEntry: DataType;
  dataIndex: number;
};

export type LabelRenderFunction<DataType> = (labelRenderProps: LabelRenderProps<DataType>) => ReactNode;
