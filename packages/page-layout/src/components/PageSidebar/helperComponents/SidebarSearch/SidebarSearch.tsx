import { useEffect, useRef } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Search } from '@snack-uikit/search';

import { useSearchContext } from '../../contexts';
import { textProvider, Texts } from '../../helpers/texts-provider';
import styles from './styles.module.scss';

export function SidebarSearch() {
  const { searchValue, setSearchValue, searchOpened } = useSearchContext();

  const ref = useRef<HTMLInputElement>(null);

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  useEffect(() => {
    if (searchOpened) {
      ref?.current?.focus();
    }
  }, [searchOpened]);

  if (!searchOpened) return null;

  return (
    <Search
      ref={ref}
      className={styles.searchItem}
      size='m'
      placeholder={textProvider(languageCode, Texts.SearchByServices)}
      value={searchValue}
      onChange={setSearchValue}
    />
  );
}
