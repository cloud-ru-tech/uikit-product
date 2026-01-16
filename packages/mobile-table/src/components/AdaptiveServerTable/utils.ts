import debounce from 'lodash.debounce';

import { SEARCH_DELAY } from './constants';

type OnSearchDebouncedType = (newValue: string, onChange: (newValue: string) => void) => void;

export const onSearchDebounced: OnSearchDebouncedType = debounce(
  (newValue: string, onChange: (newValue: string) => void) => {
    onChange(newValue);
  },
  SEARCH_DELAY,
);
