import cn from 'classnames';
import { useMemo, useRef } from 'react';

import { UpdateSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { FiltersState, MobileChipChoiceRow } from '@sbercloud/uikit-product-mobile-chips';
import { ButtonFunction } from '@snack-uikit/button';
import { SearchPrivate } from '@snack-uikit/search-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { BulkActions, FilterButton, MoreActions, Separator } from '../../helperComponents';
import { BulkActionsCheckbox } from '../../helperComponents/BulkActionsCheckbox';
import { isBulkActionsProps } from './helpers';
import { useFilters } from './hooks';
import styles from './styles.module.scss';
import { CheckedToolbarProps, DefaultToolbarProps, FilterRow } from './types';

export type MobileToolbarProps<TState extends FiltersState = Record<string, unknown>> = WithSupportProps<
  DefaultToolbarProps | CheckedToolbarProps
> & {
  filterRow?: FilterRow<TState>;
};

export function MobileToolbar<TState extends FiltersState = Record<string, unknown>>({
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
  const hasVisibleRefresh = onRefresh && !moreActions?.length;
  const hasLeftSideElements = Boolean(needsBulkActions || hasVisibleRefresh);
  const resizingContainerRef = useRef<HTMLDivElement>(null);

  const { t } = useLocale('MobileToolbar');

  const moreActionsProps = useMemo(
    () =>
      onRefresh
        ? {
            pinTop: [{ content: { option: t('refresh') }, icon: <UpdateSVG />, onClick: onRefresh }],
            items: moreActions,
          }
        : { items: moreActions },
    [moreActions, onRefresh, t],
  );

  const hasMoreActions = Boolean(moreActionsProps.items?.length);

  const { filterButton, filterRow } = useFilters<TState>({ filterRow: filterRowProps });

  const hasBulkActionsOpened = Boolean(
    (rest.checked || rest.indeterminate) && rest.selectionMode === 'multiple' && rest.bulkActions?.length,
  );

  return (
    <div className={styles.containerWrapper} {...extractSupportProps(rest)}>
      <div
        className={styles.panel}
        data-bulk-actions-opened={hasBulkActionsOpened ?? undefined}
        data-outline={outline || undefined}
      >
        <div className={cn(styles.topRow, className)} ref={resizingContainerRef}>
          {hasLeftSideElements && (
            <div className={styles.beforeSearch}>
              {needsBulkActions && (
                <>
                  <BulkActionsCheckbox
                    onCheck={rest.onCheck}
                    checked={rest.checked}
                    indeterminate={rest.indeterminate}
                  />
                  <Separator />
                </>
              )}

              {hasVisibleRefresh && (
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

          {(hasMoreActions || after || filterButton) && (
            <div className={styles.flexRow} data-align-right={(!search && !hasLeftSideElements) || undefined}>
              {after && (
                <>
                  {(search || hasLeftSideElements) && <Separator />}

                  <div data-test-id={TEST_IDS.after} className={styles.actions}>
                    {after}
                  </div>
                </>
              )}

              {(hasMoreActions || filterButton) && <Separator />}

              {filterButton && <FilterButton {...filterButton} />}

              {hasMoreActions && <MoreActions {...moreActionsProps} />}
            </div>
          )}
        </div>
        {hasBulkActionsOpened && (
          <BulkActions
            actions={rest.bulkActions}
            onCheck={rest.onCheck}
            checked={rest.checked}
            indeterminate={rest.indeterminate}
            selectionMode={rest.selectionMode}
            selectedCount={rest.selectedCount}
            outline={outline}
          />
        )}
      </div>

      {filterRow && <MobileChipChoiceRow<TState> {...filterRow} size='s' data-test-id={TEST_IDS.filterRow} />}
    </div>
  );
}
