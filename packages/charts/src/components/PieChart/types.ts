import { ReactNode } from 'react';

export type TextLike = string | number;

export type LegendType = {
  label: TextLike;
  value: TextLike;
  id?: string;
};

export type DataType = {
  label: TextLike;
  value: number;
  id?: string;
  color?: string;
};

export type PieChartProps = {
  data: DataType[];
  options: {
    title: string;
    width?: number;
    height?: number;
    legendTitle?: string;
    typographySize?: 's' | 'm' | 'l';
  };
  onPieSegmentClick?: (data: DataType) => void;
  onLegendItemClick?: (data: LegendType) => void;
  aggregatedLegend?: {
    data: LegendType[];
    title: string;
    onAggregatedLegendItemClick?: (data: LegendType) => void;
  };
  className?: string;
};

export type LabelRenderProps<DataType> = {
  dataEntry: DataType;
  dataIndex: number;
};

export type LabelRenderFunction<DataType> = (labelRenderProps: LabelRenderProps<DataType>) => ReactNode;
