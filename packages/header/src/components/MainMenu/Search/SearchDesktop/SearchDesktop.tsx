import { forwardRef, useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ChipToggle } from '@snack-uikit/chips';
import { Search } from '@snack-uikit/search';

import { SearchSettingsButton } from '../SearchSettingsButton';
import { SearchProps } from '../types';
import styles from './styles.module.scss';

export const SearchDesktop = forwardRef<HTMLDivElement, SearchProps>(
  ({ searchValue, searchFn, searchFunctions, onChangeSearchFn, onSearchValueChange }, ref) => {
    const { t } = useLocale('Header');

    const [areSearchSettingsVisible, setAreSearchSettingsVisible] = useState<boolean>(false);

    return (
      <div className={styles.searchItem} ref={ref}>
        <Search
          size='m'
          outline
          placeholder={t('searchByServices')}
          value={searchValue}
          onChange={onSearchValueChange}
          data-test-id='header__drawer-menu__search'
          className={styles.search}
          postfix={<SearchSettingsButton onClick={() => setAreSearchSettingsVisible(prevOpen => !prevOpen)} />}
        />
        {areSearchSettingsVisible && (
          <div className={styles.searchSettingsChips}>
            {searchFunctions.map(item => (
              <ChipToggle
                key={item.id}
                label={item.label}
                checked={searchFn === item.id}
                onChange={() => onChangeSearchFn(item.id)}
                data-test-id={`header__drawer-menu__search-option-${item.id}`}
                size='xs'
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
