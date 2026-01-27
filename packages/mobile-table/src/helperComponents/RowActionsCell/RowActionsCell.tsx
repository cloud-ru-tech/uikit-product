import { CellContext, Row } from '@tanstack/react-table';
import { MouseEvent, MouseEventHandler, useCallback, useMemo, useState } from 'react';

import { MoreSVG } from '@cloud-ru/uikit-product-icons';
import { FiltersState } from '@cloud-ru/uikit-product-mobile-chips';
import { isBaseItemProps, MobileDroplist, MobileDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { ButtonFunction } from '@snack-uikit/button';

import { MobileTableProps } from '../../components';
import { ROW_ACTIONS_COLUMN_ID, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type RowActionsCellProps<TData> = {
  actions: MobileDroplistProps['items'];
  row: Row<TData>;
};

function RowActionsCell<TData>({ row, actions }: RowActionsCellProps<TData>) {
  const [dropListOpened, setDropListOpen] = useState(false);

  const patchItem = useCallback(
    (item: MobileDroplistProps['items'][0], cb: MouseEventHandler): MobileDroplistProps['items'][0] => {
      if (isBaseItemProps(item)) {
        return {
          ...item,
          onClick(e) {
            item.onClick?.(e);
            cb(e);
          },
        };
      }

      return { ...item, items: item.items.map(i => patchItem(i, cb)) };
    },
    [],
  );

  const disabled = !row.getCanSelect();

  const stopPropagationClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const patchedItems = useMemo(
    () => actions.map(item => patchItem(item, () => setDropListOpen(false))),
    [actions, patchItem, setDropListOpen],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={stopPropagationClick} className={styles.rowActionsCellWrap} data-open={dropListOpened || undefined}>
      {!disabled && Boolean(actions.length) && (
        <MobileDroplist
          open={dropListOpened}
          onOpenChange={setDropListOpen}
          data-test-id={TEST_IDS.rowActions.droplist}
          items={patchedItems}
        >
          <ButtonFunction icon={<MoreSVG size={24} />} data-test-id={TEST_IDS.rowActions.droplistTrigger} />
        </MobileDroplist>
      )}
    </div>
  );
}

export type ActionsGenerator<TData> = (cell: CellContext<TData, unknown>) => MobileDroplistProps['items'];

export type RowActionsColumnDefProps<TData> = {
  /** Действия для строки */
  actionsGenerator: ActionsGenerator<TData>;
  /** Закрепление колонки справа в таблице */
  pinned?: boolean;
};

/** Вспомогательная функция для создания ячейки с дополнительными действиями у строки */
export function getRowActionsColumnDef<TData extends object, TFilters extends FiltersState>({
  actionsGenerator,
}: RowActionsColumnDefProps<TData>): MobileTableProps<TData, TFilters>['columnDefinitions'][0] {
  return {
    id: ROW_ACTIONS_COLUMN_ID,
    meta: {
      skipOnExport: true,
    },
    cell: cell => <RowActionsCell row={cell.row} actions={actionsGenerator(cell)} />,
  };
}
