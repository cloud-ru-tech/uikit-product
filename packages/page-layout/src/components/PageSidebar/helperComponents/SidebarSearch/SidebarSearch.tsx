import { useEffect, useRef } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { Search } from '@snack-uikit/search';

import { useSearchContext } from '../../contexts';
import styles from './styles.module.scss';

export function SidebarSearch() {
  const { searchValue, setSearchValue, searchOpened } = useSearchContext();

  const ref = useRef<HTMLInputElement>(null);

  const { t } = useLocale('PageLayout');

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
      placeholder={t('PageSidebar.searchByServices')}
      value={searchValue}
      onChange={setSearchValue}
    />
  );
}
