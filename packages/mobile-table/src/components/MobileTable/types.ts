import { FiltersState, MobileChipChoiceRowProps } from '@sbercloud/uikit-product-mobile-chips';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { TableProps } from '@snack-uikit/table';

export type MobileTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>> = Pick<
  TableProps<TData, TFilters>,
  | 'data'
  | 'columnDefinitions'
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
> &
  WithSupportProps<{
    headlineId?: string;
    headerBackground?: 'default' | '1-level' | '2-level';
    /** Фильтры */
    columnFilters?: MobileChipChoiceRowProps<TFilters> & {
      initialOpen?: boolean;
    };
  }>;
