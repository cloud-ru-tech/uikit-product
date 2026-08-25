import { FiltersState, MobileChipChoiceRowProps } from '@cloud-ru/uikit-product-mobile-chips';
import { WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ClientTableProps, InfiniteTableProps } from '@snack-uikit/table';

type MobileTablePropsKeys =
  | 'data'
  | 'columnDefinitions'
  | 'suppressHeader'
  | 'suppressPagination'
  | 'suppressToolbar'
  | 'suppressSearch'
  | 'search'
  | 'onRefresh'
  | 'moreActions'
  | 'className'
  | 'enableFuzzySearch'
  | 'loading'
  | 'dataError'
  | 'dataFiltered'
  | 'noDataState'
  | 'noResultsState'
  | 'errorDataState'
  | 'sorting'
  | 'pagination'
  | 'pageCount'
  | 'manualFiltering'
  | 'manualPagination'
  | 'manualSorting'
  | 'getRowId'
  | 'rowSelection'
  | 'bulkActions'
  | 'columnsSettings'
  | 'savedState'
  | 'autoResetPageIndex'
  | 'toolbarAfter'
  | 'toolbarCheckBoxMode'
  | 'infiniteLoading'
  | 'scrollRef';

type TablePropsForMobile<TData extends object, TFilters extends FiltersState> =
  | Pick<InfiniteTableProps<TData, TFilters>, MobileTablePropsKeys>
  | Pick<ClientTableProps<TData, TFilters>, MobileTablePropsKeys>;

export type MobileTableProps<
  TData extends object,
  TFilters extends FiltersState = Record<string, unknown>,
> = TablePropsForMobile<TData, TFilters> &
  WithSupportProps<{
    headlineId?: string;
    headerBackground?: 'default' | '1-level' | '2-level';
    /** Фильтры */
    columnFilters?: MobileChipChoiceRowProps<TFilters> & {
      initialOpen?: boolean;
    };
  }>;
