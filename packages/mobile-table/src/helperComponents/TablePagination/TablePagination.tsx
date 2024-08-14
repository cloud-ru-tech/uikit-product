import { Table } from '@tanstack/react-table';
import { useCallback } from 'react';

import { Pagination } from '@snack-uikit/pagination';

import styles from './styles.module.scss';

export type TablePaginationProps<TData> = {
  table: Table<TData>;
};

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const handlePaginationOnChange = useCallback(
    (pageIndex: number) => {
      table.setPageIndex(pageIndex - 1);
    },
    [table],
  );

  const tablePaginationState = table.getState().pagination;

  if (table.getPageCount() <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      {table.getPageCount() > 1 && (
        <Pagination
          maxLength={6}
          total={table.getPageCount()}
          page={tablePaginationState.pageIndex + 1}
          onChange={handlePaginationOnChange}
          size='s'
        />
      )}
    </div>
  );
}
