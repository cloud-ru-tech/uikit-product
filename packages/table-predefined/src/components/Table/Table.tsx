import { useMemo } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import {
  ColumnDefinition,
  PaginationState,
  RowClickHandler,
  RowSelectionOptions,
  RowSelectionState,
  SortingState,
  Table as TableSnack,
  TableEmptyStateProps,
  TableProps as TableSnackProps,
  ToolbarProps,
} from '@snack-uikit/table';

import { textProvider, Texts } from './constants';
import { getEmptyStates } from './utils';

export { type TableSnackProps as TableProps };

export function Table<TData extends object>({
  search: searchProp,
  pagination: paginationProp,
  ...rest
}: TableSnackProps<TData>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const emptyStates = useMemo(() => getEmptyStates(languageCode), [languageCode]);
  const search: TableSnackProps<TData>['search'] = useMemo(
    () => ({
      ...searchProp,
      placeholder: searchProp?.placeholder ?? textProvider(languageCode, Texts.SearchPlaceholder),
    }),
    [languageCode, searchProp],
  );

  const pagination: TableSnackProps<TData>['pagination'] = useMemo(
    () => ({
      ...paginationProp,
      optionsLabel: paginationProp?.optionsLabel ?? textProvider(languageCode, Texts.PaginationOptionsLabel),
    }),
    [languageCode, paginationProp],
  );

  return <TableSnack {...emptyStates} search={search} pagination={pagination} {...rest} />;
}

Table.getRowActionsColumnDef = TableSnack.getRowActionsColumnDef;
Table.getStatusColumnDef = TableSnack.getStatusColumnDef;

export {
  type PaginationState,
  type SortingState,
  type ColumnDefinition,
  type RowSelectionState,
  type RowClickHandler,
  type RowSelectionOptions,
  type TableEmptyStateProps,
  type ToolbarProps,
};
