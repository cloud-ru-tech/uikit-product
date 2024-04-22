import { ReactNode } from 'react';

import { InfoRowPropsBase } from '../InfoRow/InfoRow';

export type DataType = Record<string, unknown>;

type PropsWithAccessorKey<T extends DataType> = {
  accessorKey: keyof T;
  render?: never;
} & Omit<InfoRowPropsBase, 'content'>;

type PropsWithRender<T extends DataType> = {
  render: (data: T, noDataPlaceholder: string) => ReactNode;
  accessorKey?: never;
} & Omit<InfoRowPropsBase, 'content'>;

export type InfoGroupItem<T extends DataType> = PropsWithRender<T> | PropsWithAccessorKey<T>;

export type InfoGroupProps<T extends DataType> = {
  data: T | undefined;
  items: InfoGroupItem<T>[];
  className?: string;
  loading?: boolean;
};
