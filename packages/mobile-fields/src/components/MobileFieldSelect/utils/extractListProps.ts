import { DroplistProps } from '@snack-uikit/list';

import { MobileFieldSelectProps } from '../types';

export function extractListProps({
  dataError,
  noDataState,
  noResultsState,
  errorDataState,
  dataFiltered,
  loading,
  footer,
  widthStrategy,
}: Partial<MobileFieldSelectProps>): Partial<DroplistProps> {
  return {
    dataError,
    noDataState,
    noResultsState,
    errorDataState,
    dataFiltered,
    loading,
    footer,
    widthStrategy,
    trigger: 'clickAndFocusVisible',
    placement: 'bottom',
    'data-test-id': 'field-select__list',
    scroll: true,
    marker: true,
  };
}
