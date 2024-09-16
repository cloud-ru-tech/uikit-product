import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import {
  CellContext,
  ColumnDefinition,
  Table as DesktopTable,
  Table,
  TableProps as DesktopTableProps,
} from '@snack-uikit/table';

import { MobileTable, MobileTableProps } from '../MobileTable';

type TableProps<T extends object> = DesktopTableProps<T> & MobileTableProps<T>;

export function AdaptiveTable<T extends object>({ layoutType, ...props }: WithLayoutType<TableProps<T>>) {
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
