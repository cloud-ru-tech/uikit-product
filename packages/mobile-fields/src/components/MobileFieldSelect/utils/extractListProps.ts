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
  scrollToSelectedItem,
  scrollRef,
  scrollContainerRef,
  onScroll,
  untouchableScrollbars,
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
    scrollToSelectedItem,
    scrollRef,
    scrollContainerRef,
    onScroll,
    untouchableScrollbars,
    trigger: 'clickAndFocusVisible',
    placement: 'bottom',
    'data-test-id': 'field-select__list',
    scroll: true,
    marker: true,
  };
}
