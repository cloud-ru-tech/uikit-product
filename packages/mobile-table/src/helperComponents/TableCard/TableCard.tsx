import { flexRender, Row, Table } from '@tanstack/react-table';
import { useCallback } from 'react';

import { RowAppearance } from '@snack-uikit/table';
import { Checkbox, Radio } from '@snack-uikit/toggles';

import { ROW_ACTIONS_COLUMN_ID } from '../../constants';
import styles from './styles.module.scss';

type TableCardProps<TData extends object> = {
  headlineId?: string;
  row: Row<TData>;
  table: Table<TData>;
  selection: 'multiple' | 'single' | 'none';
  selectionAppearance?: RowAppearance;
};

export function TableCard<TData extends object>({
  headlineId,
  table,
  row,
  selection,
  selectionAppearance = RowAppearance.Disabled,
}: TableCardProps<TData>) {
  const headerGroups = table.getHeaderGroups();

  const headerCell = row._getAllCellsByColumnId()[headlineId ?? ''];
  const headerColumn = table.getFlatHeaders().find(header => header.id === headlineId);

  const actionsCell = row._getAllCellsByColumnId()[ROW_ACTIONS_COLUMN_ID];
  const actionsColumn = table.getFlatHeaders().find(header => header.id === ROW_ACTIONS_COLUMN_ID);

  const isSelected = row.getIsSelected();
  const canSelect = row.getCanSelect();
  const isDisabled = !canSelect;

  const handleSelection = useCallback(() => {
    if (isDisabled) return;
    if (selection === 'single') row.toggleSelected(true);
    if (selection === 'multiple') row.toggleSelected(!isSelected);
  }, [isDisabled, isSelected, row, selection]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.card}
      data-is-selected={isSelected ?? undefined}
      data-selection-mode={selection}
      onClick={handleSelection}
    >
      <div className={styles.content}>
        {headerCell && headerColumn && (
          <div className={styles.headline}>
            {flexRender(headerColumn.column.columnDef.cell, headerCell.getContext())}
          </div>
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

      {selection === 'single' &&
        (isDisabled && selectionAppearance === RowAppearance.HideToggler ? null : (
          <Radio size='m' className={styles.selectionController} checked={isSelected} disabled={isDisabled} />
        ))}
      {selection === 'multiple' &&
        (isDisabled && selectionAppearance === RowAppearance.HideToggler ? null : (
          <Checkbox size='m' className={styles.selectionController} checked={isSelected} disabled={isDisabled} />
        ))}
      {actionsCell && actionsColumn && (
        <div className={styles.button}>{flexRender(actionsColumn.column.columnDef.cell, actionsCell.getContext())}</div>
      )}
    </div>
  );
}
