import { forwardRef, useState } from 'react';

import { SearchSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { ButtonElevated } from '@snack-uikit/button';
import { List } from '@snack-uikit/list';
import { Search } from '@snack-uikit/search';
import { Typography } from '@snack-uikit/typography';

import { SearchSettingsButton } from '../SearchSettingsButton';
import { SearchProps } from '../types';
import { SEARCH_TRANSITION_TIMEOUT } from './constants';
import { useSearchAnimation } from './hooks';
import styles from './styles.module.scss';

export const SearchMobile = forwardRef<HTMLDivElement, SearchProps>(
  ({ searchValue, searchFn, searchFunctions, onChangeSearchFn, onSearchValueChange }, ref) => {
    const { t } = useLocale('Header');

    const [areSearchSettingsVisible, setAreSearchSettingsVisible] = useState<boolean>(false);

    const {
      searchRef: newSearchRef,
      animationState,
      toggleSearchActive,
      isSearchActive,
      searchInputTabIndex,
    } = useSearchAnimation(searchValue.length > 0);

    return (
      <div className={styles.searchItem} ref={ref}>
        <div
          className={styles.searchWrap}
          style={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            '--sc-header-animation-enter': SEARCH_TRANSITION_TIMEOUT.enter,
            '--sc-header-animation-exit': SEARCH_TRANSITION_TIMEOUT.exit,
          }}
        >
          <Typography.SansTitleM>{t('services')}</Typography.SansTitleM>

          <div
            className={styles.searchMobile}
            data-transition-status={animationState.status}
            data-is-mounted={animationState.isMounted || undefined}
          >
            <Search
              size='m'
              placeholder={t('searchByServices')}
              value={searchValue}
              onChange={onSearchValueChange}
              data-test-id='header__drawer-menu__search'
              ref={newSearchRef}
              tabIndex={searchInputTabIndex}
              postfix={<SearchSettingsButton onClick={() => setAreSearchSettingsVisible(true)} />}
            />

            <MobileModalCustom
              open={areSearchSettingsVisible}
              onClose={() => setAreSearchSettingsVisible(false)}
              closeOnPopstate
              closeButtonEnabled
            >
              <MobileModalCustom.Header title={t('searchSettingsMobileModalHeader')} />
              <div className={styles.searchModalBody}>
                <List
                  className={styles.searchSettingsMobileOptions}
                  items={searchFunctions.map(item => ({
                    id: item.id,
                    content: {
                      option: item.label,
                    },
                  }))}
                  size='m'
                  selection={{
                    mode: 'single',
                    value: searchFn,
                    onChange: value => {
                      onChangeSearchFn(value);
                      setAreSearchSettingsVisible(false);
                    },
                  }}
                />
              </div>
            </MobileModalCustom>
          </div>

          <ButtonElevated
            size='m'
            className={styles.searchButton}
            icon={<SearchSVG />}
            onClick={toggleSearchActive}
            data-test-id='header__drawer-menu__close-search-icon'
            data-search-active={isSearchActive || undefined}
          />
        </div>
      </div>
    );
  },
);
