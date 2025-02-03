import cn from 'classnames';
import { useRef } from 'react';

import { UpdateSVG } from '@sbercloud/uikit-product-icons';
import { FiltersState, MobileChipChoiceRow } from '@sbercloud/uikit-product-mobile-chips';
import { ButtonFunction } from '@snack-uikit/button';
import { SearchPrivate } from '@snack-uikit/search-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { BulkActions, FilterButton, MoreActions, Separator } from '../../helperComponents';
import { extractBulkActionsProps, isBulkActionsProps } from './helpers';
import { useFilters } from './hooks';
import styles from './styles.module.scss';
import { CheckedToolbarProps, DefaultToolbarProps, FilterRow } from './types';

export type MobileToolbarProps<TState extends FiltersState> = WithSupportProps<
  DefaultToolbarProps | CheckedToolbarProps
> & {
  filterRow?: FilterRow<TState>;
};

export function MobileToolbar<TState extends FiltersState>({
  className,
  after,
  outline,
  moreActions,
  onRefresh,
  search,
  filterRow: filterRowProps,
  ...rest
}: MobileToolbarProps<TState>) {
  const needsBulkActions = isBulkActionsProps(rest);
  const hasLeftSideElements = Boolean(needsBulkActions || onRefresh);
  const resizingContainerRef = useRef<HTMLDivElement>(null);

  const { filterButton, filterRow } = useFilters<TState>({ filterRow: filterRowProps });

  return (
    <div className={styles.containerWrapper} {...extractSupportProps(rest)}>
      <div className={cn(styles.container, className)} data-outline={outline || undefined} ref={resizingContainerRef}>
        {hasLeftSideElements && (
          <div className={styles.beforeSearch}>
            {needsBulkActions && (
              <>
                <BulkActions {...extractBulkActionsProps(rest)} resizingContainerRef={resizingContainerRef} />
                <Separator />
              </>
            )}

            {onRefresh && (
              <>
                <ButtonFunction
                  icon={<UpdateSVG />}
                  size='m'
                  className={styles.updateButton}
                  onClick={onRefresh}
                  data-test-id={TEST_IDS.refreshButton}
                />
                <Separator />
              </>
            )}
          </div>
        )}

        {search && <SearchPrivate {...search} className={styles.search} size='m' data-test-id={TEST_IDS.search} />}

        {(moreActions || after || filterButton) && (
          <div className={styles.flexRow} data-align-right={(!search && !hasLeftSideElements) || undefined}>
            {after && (
              <>
                {(search || hasLeftSideElements) && <Separator />}

                <div data-test-id={TEST_IDS.after} className={styles.actions}>
                  {after}
                </div>
              </>
            )}

            {(moreActions || filterButton) && <Separator />}

            {filterButton && <FilterButton {...filterButton} />}

            {moreActions && <MoreActions moreActions={moreActions} />}
          </div>
        )}
      </div>

      {filterRow && <MobileChipChoiceRow<TState> {...filterRow} size='s' data-test-id={TEST_IDS.filterRow} />}
    </div>
  );
}
