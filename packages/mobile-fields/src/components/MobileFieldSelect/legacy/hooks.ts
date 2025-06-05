import FuzzySearch from 'fuzzy-search';
import get from 'lodash/get';
import { useCallback, useMemo } from 'react';

import { ItemProps, kindFlattenItems } from '@snack-uikit/list';

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 1;

const COMMON_FIELDS_TO_SEARCH = ['content.option', 'content.caption', 'content.description'];

/**
 * Поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label'
 */
export function useSearch(items: ItemProps[], enableFuzzySearch: boolean): (value: string) => ItemProps[] {
  const flattenItems = useMemo(() => {
    const { flattenItems } = kindFlattenItems({ items });

    return Object.values(flattenItems);
  }, [items]);

  return useCallback(
    (search: string) => {
      if (!enableFuzzySearch) {
        return flattenItems.filter(item =>
          COMMON_FIELDS_TO_SEARCH.some(key => {
            const value: string | undefined = get(item, key);
            return value?.toLowerCase().includes(search.toLowerCase());
          }),
        );
      }

      const searcher = new FuzzySearch(flattenItems, COMMON_FIELDS_TO_SEARCH, {});

      return search.length >= DEFAULT_MIN_SEARCH_INPUT_LENGTH ? searcher.search(search) : items;
    },
    [enableFuzzySearch, flattenItems, items],
  );
}
