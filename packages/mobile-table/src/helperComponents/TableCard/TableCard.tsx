import { flexRender, Row, Table } from '@tanstack/react-table';

import { ROW_ACTIONS_COLUMN_ID } from '../../constants';
import styles from './styles.module.scss';

type TableCardProps<TData extends object> = {
  headlineId?: string;
  row: Row<TData>;
  table: Table<TData>;
};

export function TableCard<TData extends object>({ headlineId, table, row }: TableCardProps<TData>) {
  const headerGroups = table.getHeaderGroups();

  const headerCell = row._getAllCellsByColumnId()[headlineId ?? ''];
  const headerColumn = table.getFlatHeaders().find(header => header.id === headlineId);

  const actionsCell = row._getAllCellsByColumnId()[ROW_ACTIONS_COLUMN_ID];
  const actionsColumn = table.getFlatHeaders().find(header => header.id === ROW_ACTIONS_COLUMN_ID);

  return (
    <div className={styles.card}>
      {actionsCell && actionsColumn && (
        <div className={styles.button}>{flexRender(actionsColumn.column.columnDef.cell, actionsCell.getContext())}</div>
      )}

      {headerCell && headerColumn && (
        <div className={styles.headline}>{flexRender(headerColumn.column.columnDef.cell, headerCell.getContext())}</div>
      )}

      <div className={styles.body}>
        {headerGroups.map(group =>
          group.headers.map((header, index) => {
            if ([headlineId, ROW_ACTIONS_COLUMN_ID].includes(header.id)) {
              return null;
            }

            const column = header.column.columnDef;
            const cell = row._getAllCellsByColumnId()[header.column.id];

            return (
              <div className={styles.cardRow} key={header.id || index}>
                <div className={styles.cardRowHeader}>{flexRender(column.header, header.getContext())}</div>
                <div className={styles.cardRowContent}>{flexRender(column.cell, cell.getContext())}</div>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
