import { FiltersState, TableSortingState } from './types';

export function getOrderingParams<T extends object, P extends FiltersState>(sortingState: TableSortingState<T, P>) {
  const sorting = sortingState?.[0];
  if (sorting) {
    return sorting.desc ? `-${sorting.id}` : `${sorting.id}`;
  }
}
