import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react';

import { AdaptiveServerTable } from '@cloud-ru/uikit-product-mobile-table';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { useLayoutEffect, useValueControl } from '@snack-uikit/utils';

import { DEFAULT_ENTITY_LIST_DATA, PAGINATION_ROWS_COUNT_OPTIONS } from './constants';
import { EntitiesTableHandle, EntitiesTableProps, FiltersState } from './types';
import { useEntitiesTable } from './useEntitiesTable';

function EntitiesTableComponent<T extends object, P extends FiltersState>(
  props: WithLayoutType<EntitiesTableProps<T, P>>,
  ref: Ref<EntitiesTableHandle<T>>,
) {
  const {
    id,
    queryFn,
    queryProps,
    onQuerySuccess,
    onPaginationOrDataChange,
    columnDefinitions,
    defaultSearch,
    defaultOffset,
    defaultLimit,
    defaultSort,
    searchPlaceholder,
    columnFilters,
    layoutType,
    ...rest
  } = props;

  const { offset, limit, search, sorting, onChangePage, onSearchChange, onReset, onSortChange, paginationParams } =
    useEntitiesTable({
      defaultSearch,
      defaultOffset,
      defaultLimit,
      defaultSort,
    });

  const [filtersValue, setFiltersValue] = useValueControl<FiltersState | undefined>({
    value: columnFilters?.value,
    defaultValue: columnFilters?.defaultValue as FiltersState | undefined,
    onChange: columnFilters?.onChange as ((value: FiltersState | undefined) => void) | undefined,
  });

  const params = {
    params: paginationParams,
    ...queryProps,
    ...filtersValue,
  } as unknown as P;
  const { data = DEFAULT_ENTITY_LIST_DATA, refetch, isLoading, isFetching, isError, isSuccess } = queryFn(params);

  useEffect(() => {
    if (data.total && !data.data.length && offset >= limit) {
      onChangePage(offset - limit, limit);
    }
  }, [onChangePage, data.total, data.data.length, offset, limit]);

  useLayoutEffect(() => {
    onPaginationOrDataChange?.(data.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangePage, data.total, data.data.length, offset, limit]);

  useEffect(() => {
    if (isSuccess) {
      onQuerySuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useImperativeHandle(
    ref,
    (): EntitiesTableHandle<T> => ({
      getParams() {
        return paginationParams;
      },
      getData() {
        return data.data;
      },
      refetchData() {
        refetch();
      },
      resetState() {
        onReset();
      },
    }),
  );

  return (
    <AdaptiveServerTable<T, P>
      layoutType={layoutType}
      columnDefinitions={columnDefinitions}
      items={data.data}
      loading={isLoading && isFetching}
      dataError={isError}
      onRefresh={refetch}
      search={{
        state: search,
        onChange: onSearchChange,
        loading: isLoading && isFetching,
        placeholder: searchPlaceholder,
      }}
      onChangePage={onChangePage}
      sorting={{
        state: sorting,
        onChange: onSortChange,
      }}
      offset={offset}
      limit={limit}
      total={data.total}
      savedState={{
        id,
        resize: true,
      }}
      columnsSettings={{
        enableDrag: true,
        enableSettingsMenu: true,
      }}
      pagination={{
        options: PAGINATION_ROWS_COUNT_OPTIONS,
      }}
      outline
      columnFilters={
        columnFilters
          ? {
              ...columnFilters,
              value: filtersValue as P | undefined,
              onChange: setFiltersValue as ((value: P) => void) | undefined,
            }
          : undefined
      }
      {...rest}
    />
  );
}

export const EntitiesTable = forwardRef(EntitiesTableComponent) as <T extends object, P extends FiltersState>(
  props: WithLayoutType<EntitiesTableProps<T, P> & { ref?: Ref<EntitiesTableHandle<T>> }>,
) => ReturnType<typeof EntitiesTableComponent>;
