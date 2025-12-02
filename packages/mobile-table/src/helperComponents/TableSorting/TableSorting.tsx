import { SortingState, Table } from '@tanstack/react-table';
import { useState } from 'react';

import { ArrowDownSVG, ArrowUpSVG, SortSVG } from '@sbercloud/uikit-product-icons';
import { MobileDroplist } from '@sbercloud/uikit-product-mobile-dropdown';
import { ButtonFunction } from '@snack-uikit/button';
import { ColumnDefinition } from '@snack-uikit/table';

import { useTableSorting } from './useTableSorting';

export type TableSortingProps<TData extends object> = {
  table: Table<TData>;
  sorting?: SortingState;
  columnDefinitions: ColumnDefinition<TData>[];
  enabledColumns?: string[];
  areColumnsSettingsEnabled?: boolean;
};

export function TableSorting<TData extends object>({
  table,
  sorting,
  columnDefinitions,
  enabledColumns,
  areColumnsSettingsEnabled = false,
}: TableSortingProps<TData>) {
  const [open, setOpen] = useState(false);

  const { items, pinBottom, selection, currentSort, selectedSortId, handleClearSort } = useTableSorting({
    table,
    sorting,
    columnDefinitions,
    enabledColumns,
    areColumnsSettingsEnabled,
  });

  const handleClear = () => {
    handleClearSort();
    setOpen(false);
  };

  const clearItem = pinBottom?.[0] ? [{ ...pinBottom[0], onClick: handleClear }] : undefined;

  let SortIcon = SortSVG;
  if (currentSort) {
    SortIcon = currentSort.desc ? ArrowDownSVG : ArrowUpSVG;
  }

  return (
    <MobileDroplist
      items={items}
      selection={selection}
      virtualized={items.length > 10}
      pinBottom={clearItem}
      open={open}
      onOpenChange={setOpen}
    >
      <ButtonFunction size='m' icon={<SortIcon />} appearance={selectedSortId ? 'primary' : 'neutral'} />
    </MobileDroplist>
  );
}
