import { FiltersState } from '@sbercloud/uikit-product-mobile-chips';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import {
  CellContext,
  ColumnDefinition,
  Table as DesktopTable,
  Table,
  TableProps as DesktopTableProps,
} from '@snack-uikit/table';

import { MobileTable, MobileTableProps } from '../MobileTable';

type TableProps<TData extends object, TFilters extends FiltersState> = DesktopTableProps<TData, TFilters> &
  MobileTableProps<TData, TFilters>;

export function AdaptiveTable<TState extends object, TFilters extends FiltersState>({
  layoutType,
  ...props
}: WithLayoutType<TableProps<TState, TFilters>>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileTable headerBackground='1-level' {...props} /> : <Table {...props} />;
}

export const useAdaptiveGetRowActionsColumnDef = ({ layoutType }: WithLayoutType) => {
  const isMobile = layoutType === 'mobile';

  return (
    isMobile ? MobileTable.getRowActionsColumnDef : DesktopTable.getRowActionsColumnDef
  ) as typeof DesktopTable.getRowActionsColumnDef;
};

export type { ColumnDefinition, TableProps, CellContext };
