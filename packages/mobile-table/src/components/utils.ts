import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/react-table';
import debounce from 'lodash.debounce';

import { SEARCH_DELAY } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank: RankingInfo = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

type OnSearchDebouncedType = (newValue: string, onChange: (newValue: string) => void) => void;

export const onSearchDebounced: OnSearchDebouncedType = debounce(
  (newValue: string, onChange: (newValue: string) => void) => {
    onChange(newValue);
  },
  SEARCH_DELAY,
);
