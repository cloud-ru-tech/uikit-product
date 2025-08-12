import { FiltersState } from '@sbercloud/uikit-product-mobile-chips';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { CellContext, ColumnDefinition, Table as DesktopTable, Table, TableProps } from '@snack-uikit/table';

import { MobileTable, MobileTableProps } from '../MobileTable';

export type AdaptiveTableProps<TData extends object, TFilters extends FiltersState> = TableProps<TData, TFilters> &
  MobileTableProps<TData, TFilters>;

export function AdaptiveTable<TState extends object, TFilters extends FiltersState>({
  layoutType,
  ...props
}: WithLayoutType<AdaptiveTableProps<TState, TFilters>>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileTable headerBackground='1-level' {...props} /> : <Table {...props} />;
}

export const useAdaptiveGetRowActionsColumnDef = ({ layoutType }: WithLayoutType) => {
  const isMobile = layoutType === 'mobile';

  return (
    isMobile ? MobileTable.getRowActionsColumnDef : DesktopTable.getRowActionsColumnDef
  ) as typeof DesktopTable.getRowActionsColumnDef;
};

export type { TableProps, ColumnDefinition, CellContext };
