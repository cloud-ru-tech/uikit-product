import { useMemo, useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';

import { LinksGroup, SearchFunction, SearchProps } from '../types';
import { filterLinksGroupsFuzzy, filterLinksGroupsPrecise } from '../utils';

export function useSearch(): SearchProps {
  const [searchValue, onSearchValueChange] = useState<string>('');

  const { t } = useLocale('Header');

  const [searchFn, onChangeSearchFn] = useState<string>('fuzzy');

  const searchFunctions: SearchFunction[] = useMemo(
    () => [
      {
        id: 'fuzzy',
        label: t('searchSettingsFuzzyChipLabel'),
        handler: (searchValue: string, links: LinksGroup[]) => filterLinksGroupsFuzzy(searchValue, links),
      },
      {
        id: 'precise',
        label: t('searchSettingsPreciseChipLabel'),
        handler: (searchValue: string, links: LinksGroup[]) => filterLinksGroupsPrecise(searchValue, links),
      },
    ],
    [t],
  );

  return {
    searchValue,
    onSearchValueChange,
    searchFunctions,
    onChangeSearchFn,
    searchFn,
  };
}
