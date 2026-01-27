import { Header, SortingState, Table } from '@tanstack/react-table';
import { ReactNode, useCallback, useMemo } from 'react';

import { ArrowDownSVG, ArrowUpSVG, UpdateSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { MobileDroplistProps, SelectionSingleState } from '@cloud-ru/uikit-product-mobile-dropdown';
import { ColumnDefinition } from '@snack-uikit/table';

import styles from './styles.module.scss';
import { createColumnDefMap, getHeaderLabel, groupHeadersByPinned } from './utils';

type UseTableSortingReturn = {
  items: MobileDroplistProps['items'];
  pinBottom: MobileDroplistProps['items'];
  selection?: SelectionSingleState;
  currentSort: { id: string; label: string; desc: boolean } | null;
  selectedSortId?: string;
  handleClearSort(): void;
};

export function useTableSorting<TData extends object>({
  table,
  sorting: sortingProp,
  columnDefinitions,
  enabledColumns,
  areColumnsSettingsEnabled = false,
}: {
  table: Table<TData>;
  sorting?: SortingState;
  columnDefinitions: ColumnDefinition<TData>[];
  enabledColumns?: string[];
  areColumnsSettingsEnabled?: boolean;
}): UseTableSortingReturn {
  const { t } = useLocale('Table');
  const sorting = sortingProp ?? table.getState().sorting;

  const columnDefMap = useMemo(() => createColumnDefMap(columnDefinitions), [columnDefinitions]);

  const hiddenColumnsBySettings = useMemo(() => {
    if (!areColumnsSettingsEnabled) return new Set<string>();

    const hidden = new Set<string>();
    columnDefMap.forEach((colDef, columnId) => {
      const colDefWithSettings = colDef as ColumnDefinition<TData> & {
        columnSettings?: { mode?: 'hidden' | string };
      };
      if (colDefWithSettings.columnSettings?.mode === 'hidden') {
        hidden.add(columnId);
      }
    });
    return hidden;
  }, [areColumnsSettingsEnabled, columnDefMap]);

  const sortableHeaders = useMemo(() => {
    let headers = table
      .getFlatHeaders()
      .filter(header => header.column.getCanSort() && header.id !== 'select' && header.id !== 'actions');

    if (areColumnsSettingsEnabled && enabledColumns) {
      headers = headers.filter(header => hiddenColumnsBySettings.has(header.id) || enabledColumns.includes(header.id));
    }

    return headers;
  }, [table, areColumnsSettingsEnabled, enabledColumns, hiddenColumnsBySettings]);

  const currentSort = useMemo(() => {
    if (sorting.length === 0) return null;
    const firstSort = sorting[0];

    if (areColumnsSettingsEnabled && enabledColumns) {
      const isHiddenColumn = hiddenColumnsBySettings.has(firstSort.id);
      const isEnabledColumn = enabledColumns.includes(firstSort.id);
      if (!isHiddenColumn && !isEnabledColumn) {
        return null;
      }
    }

    const header = table.getFlatHeaders().find(h => h.id === firstSort.id);
    if (!header) return null;

    const headerLabel = getHeaderLabel(header);

    return {
      id: firstSort.id,
      label: headerLabel || firstSort.id,
      desc: firstSort.desc,
    };
  }, [sorting, table, areColumnsSettingsEnabled, enabledColumns, hiddenColumnsBySettings]);

  const handleColumnSortToggle = useCallback(
    (columnId: string) => {
      const currentSorting = table.getState().sorting;
      const currentColumnSort = currentSorting.find(s => s.id === columnId);

      let newSorting: SortingState;
      if (!currentColumnSort) {
        newSorting = [{ id: columnId, desc: false }];
      } else if (!currentColumnSort.desc) {
        newSorting = [{ id: columnId, desc: true }];
      } else {
        newSorting = [];
      }

      table.setSorting(newSorting);
    },
    [table],
  );

  const handleClearSort = useCallback(() => {
    table.setSorting([]);
  }, [table]);

  const selectedSortId = useMemo(() => {
    if (sorting.length === 0) return undefined;
    const firstSort = sorting[0];

    if (areColumnsSettingsEnabled && enabledColumns) {
      const isHiddenColumn = hiddenColumnsBySettings.has(firstSort.id);
      const isEnabledColumn = enabledColumns.includes(firstSort.id);
      if (!isHiddenColumn && !isEnabledColumn) {
        return undefined;
      }
    }

    return `sort-${firstSort.id}`;
  }, [sorting, areColumnsSettingsEnabled, enabledColumns, hiddenColumnsBySettings]);

  const createSortItem = useCallback(
    (header: Header<TData, unknown>) => {
      const columnId = header.id;
      const currentColumnSort = sorting.find(s => s.id === columnId);
      const isAsc = currentColumnSort && !currentColumnSort.desc;
      const isDesc = currentColumnSort && currentColumnSort.desc;

      const headerLabel = getHeaderLabel(header) || columnId;

      let SortIcon: ReactNode = undefined;
      if (isAsc) {
        SortIcon = <ArrowUpSVG />;
      } else if (isDesc) {
        SortIcon = <ArrowDownSVG />;
      }

      return {
        id: `sort-${columnId}`,
        content: {
          option: headerLabel,
        },
        afterContent: SortIcon,
        onClick: () => handleColumnSortToggle(columnId),
      };
    },
    [sorting, handleColumnSortToggle],
  );

  const groupSortableHeadersByPinned = useCallback(
    () => groupHeadersByPinned(sortableHeaders, columnDefMap),
    [sortableHeaders, columnDefMap],
  );

  const { items, pinBottom } = useMemo(() => {
    const { leftHeaders, unpinnedHeaders, rightHeaders } = groupSortableHeadersByPinned();

    const groups: MobileDroplistProps['items'] = [];

    if (leftHeaders.length > 0) {
      groups.push({
        type: 'group',
        divider: false,
        items: leftHeaders.map(createSortItem),
      });
    }

    if (unpinnedHeaders.length > 0) {
      groups.push({
        type: 'group',
        divider: leftHeaders.length > 0 || rightHeaders.length > 0,
        items: unpinnedHeaders.map(createSortItem),
      });
    }

    if (rightHeaders.length > 0) {
      groups.push({
        type: 'group',
        divider: leftHeaders.length > 0 || unpinnedHeaders.length > 0,
        items: rightHeaders.map(createSortItem),
      });
    }

    const clearItem: MobileDroplistProps['items'] = [
      {
        id: 'snack-internal-clear-id',
        content: {
          option: t('clearSort'),
        },
        afterContent: <UpdateSVG />,
        onClick: handleClearSort,
        disabled: sorting.length === 0,
        className: styles.clearSortItem,
      },
    ];

    const mainGroup: MobileDroplistProps['items'][0] = {
      type: 'group',
      label: t('sort'),
      items: groups,
      mode: 'primary',
    };

    return {
      items: [mainGroup],
      pinBottom: clearItem,
    };
  }, [groupSortableHeadersByPinned, createSortItem, sorting, handleClearSort, t]);

  const handleSelectionChange = useCallback(
    (selectedId: string | number) => {
      const id = String(selectedId);
      if (id === 'sort-clear') {
        return;
      }
      const match = id.match(/^sort-(.+)$/);
      if (match) {
        const [, columnId] = match;
        handleColumnSortToggle(columnId);
      }
    },
    [handleColumnSortToggle],
  );

  const selection = useMemo((): SelectionSingleState | undefined => {
    if (!selectedSortId) return undefined;
    return {
      mode: 'single',
      value: selectedSortId,
      onChange: handleSelectionChange,
    };
  }, [selectedSortId, handleSelectionChange]);

  return {
    items,
    pinBottom,
    selection,
    currentSort,
    selectedSortId,
    handleClearSort,
  };
}
