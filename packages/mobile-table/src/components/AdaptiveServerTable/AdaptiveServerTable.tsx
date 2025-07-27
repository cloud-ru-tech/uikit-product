import { useCallback, useEffect, useMemo, useState } from 'react';

import { FiltersState } from '@sbercloud/uikit-product-mobile-chips';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import {
  PaginationState,
  ServerTable as DesktopTable,
  ServerTableProps as DesktopServerTableProps,
} from '@snack-uikit/table';

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION_LIMIT } from '../constants';
import { useStateControl } from '../hooks';
import { MobileTable, MobileTableProps } from '../MobileTable';
import { onSearchDebounced } from '../utils';

type ServerTableProps<TData extends object, TFilters extends FiltersState> = Omit<
  DesktopServerTableProps<TData, TFilters>,
  'columnsSettings'
> &
  Omit<MobileTableProps<TData, TFilters>, 'data'> & {
    columnsSettings?: DesktopServerTableProps<TData, TFilters>['columnsSettings'];
  };

export function AdaptiveServerTable<TData extends object, TFilters extends FiltersState>({
  layoutType,
  ...props
}: WithLayoutType<ServerTableProps<TData, TFilters>>) {
  const isMobile = layoutType === 'mobile';

  const {
    onChangePage,
    search: searchProp,
    pagination,
    items,
    total = DEFAULT_PAGINATION_LIMIT,
    limit = DEFAULT_PAGINATION_LIMIT,
    offset = 0,
    ...rest
  } = props;

  const { state: search, onStateChange: setSearch } = useStateControl<string>(searchProp, '');

  const [tempSearch, setTempSearch] = useState(search || '');

  useEffect(() => {
    if (searchProp?.state !== tempSearch) {
      setTempSearch(searchProp?.state ?? '');
    }
    // Needs update only when prop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProp?.state]);

  const handleSearch = useCallback(
    (newValue: string) => {
      setTempSearch(newValue);
      onSearchDebounced(newValue.trim(), setSearch);
    },

    [setSearch],
  );

  const handlePageChange = useCallback(
    ({ pageSize, pageIndex }: PaginationState) => onChangePage(pageIndex * pageSize, pageSize),
    [onChangePage],
  );

  const pageIndex = useMemo(() => Math.floor(offset / limit), [limit, offset]);
  const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total]);

  return isMobile ? (
    <MobileTable
      {...rest}
      headerBackground='1-level'
      data={items || []}
      pageCount={pageCount}
      pagination={{
        ...pagination,
        state: {
          pageIndex,
          pageSize: DEFAULT_PAGE_SIZE,
        },
        onChange: handlePageChange,
      }}
      search={{
        state: tempSearch,
        onChange: handleSearch,
        loading: searchProp?.loading,
        placeholder: searchProp?.placeholder,
      }}
      manualPagination
      manualFiltering
      manualSorting
    />
  ) : (
    <DesktopTable {...props} />
  );
}

export type { ServerTableProps, FiltersState };
