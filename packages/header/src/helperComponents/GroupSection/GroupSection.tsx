import cn from 'classnames';
import { createRef, KeyboardEvent, RefObject, useCallback, useMemo } from 'react';

import { SearchSVG, VerticalMenuRightCloseSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { List, ListProps } from '@snack-uikit/list';
import { PromoTag } from '@snack-uikit/promo-tag';
import { SearchPrivate } from '@snack-uikit/search-private';
import { Tooltip } from '@snack-uikit/tooltip';
import { TruncateStringProps } from '@snack-uikit/truncate-string';

import { GroupSectionFooterButton, GroupSectionItemDroplist } from './components';
import { GroupSectionSkeletonItem } from './components/GroupSectionSkeletonItem';
import { useSearch } from './hooks';
import styles from './styles.module.scss';
import { Item, ItemsGroup } from './types';

export type GroupSectionProps = WithSupportProps<{
  className?: string;
  title?: string;
  searchable?: boolean;
  searchActive?: boolean;
  onSearchActiveChange?(value: boolean): void;
  searchDefaultFocused?: boolean;
  searchPlaceholder?: string;
  onSearchOpenChange?(open: boolean): void;
  loading?: boolean;

  groups: ItemsGroup<Item>[];
  truncateVariant?: TruncateStringProps['variant'];
  noDataState?: ListProps['noDataState'];
  selectedItem?: Item;
  onItemChange?(item: Item): void;

  addItem?: {
    label: string;
    handler?(): void;
    tooltip?: string;
    disabled?: boolean;
  };

  closeDropdown?(): void;

  navigateOutsideRef?: RefObject<HTMLDivElement>;
  navigateInsideRef?: RefObject<HTMLDivElement>;
  avatarAppearance?: AvatarProps['appearance'];

  mobile: boolean;
  virtualized?: boolean;
}>;

export function GroupSection({
  title,
  loading,
  searchable = false,
  searchActive,
  onSearchActiveChange,
  className,
  groups,
  selectedItem,
  onItemChange,
  addItem,
  navigateOutsideRef,
  closeDropdown,
  avatarAppearance,
  noDataState,
  truncateVariant,
  searchPlaceholder,
  mobile,
  virtualized,
  ...rest
}: GroupSectionProps) {
  const { t } = useLocale('Header');
  const itemRefs: Record<string, RefObject<HTMLElement>> = useMemo(() => ({}), []);
  const itemTestIdPrefix = rest['data-test-id'] || 'header__select-group';

  const {
    searchRef,
    searchValue,
    setSearchValue,
    handleActivateSearch,
    handleDeactivateSearch,
    filteredGroups,
    animationState,
    searchIconTabIndex,
    closeSearchIconTabIndex,
    searchInputTabIndex,
  } = useSearch({
    groups,
    searchable,
    active: searchActive,
    onActiveChange: onSearchActiveChange,
  });

  const navigateOutside = useCallback(
    (event: KeyboardEvent) => {
      if (navigateOutsideRef && event.key === 'ArrowUp') {
        navigateOutsideRef.current?.focus();
      }
    },
    [navigateOutsideRef],
  );

  const handleItemMouseDown = useCallback(
    ({ item }: { item: Item; groupId: string }) =>
      () => {
        onItemChange?.(item);

        if (searchValue.length > 0) {
          setSearchValue('');

          setTimeout(() => {
            const selectedItem = itemRefs[item.id]?.current;
            selectedItem?.scrollIntoView({ block: 'center' });
          }, 0);
        }
      },
    [itemRefs, onItemChange, searchValue.length, setSearchValue],
  );

  const getItemRef = useCallback(
    (id: string) => {
      if (!itemRefs[id]) {
        itemRefs[id] = createRef();
      }

      return itemRefs[id];
    },
    [itemRefs],
  );

  const items: ListProps['items'] = useMemo(
    () =>
      filteredGroups.map(group => ({
        label: filteredGroups.length > 1 ? group.heading : undefined,
        truncate: { variant: truncateVariant },
        mode: 'secondary',
        type: 'group',
        items: group.items.map(item => {
          const dataTestId = `${itemTestIdPrefix}__item-${item.id}`;

          return {
            content: {
              option: item.name,
              truncate: { variant: truncateVariant },
            },
            beforeContent: item.logo ?? (
              <Avatar appearance={avatarAppearance} size='xs' name={item.name} showTwoSymbols shape='square' />
            ),
            afterContent: (
              <>
                {item.new && <PromoTag text={t('organizationNewBadge')} appearance='green' />}

                {item.partner && <PromoTag text={t('partnerOrganizationBadge')} appearance='blue' />}

                {item?.tag}

                {item.actions && item.actions.length > 0 ? (
                  <GroupSectionItemDroplist
                    actions={item.actions}
                    dataTestId={dataTestId}
                    onItemClick={closeDropdown}
                  />
                ) : undefined}
              </>
            ),
            id: item.id,
            onKeyDown: navigateOutside,
            onMouseDown: handleItemMouseDown({ item, groupId: group.id }),
            'data-test-id': dataTestId,
            itemRef: getItemRef(item.id),
          };
        }),
      })),
    [
      avatarAppearance,
      closeDropdown,
      filteredGroups,
      getItemRef,
      handleItemMouseDown,
      itemTestIdPrefix,
      t,
      navigateOutside,
      truncateVariant,
    ],
  );

  return (
    <div className={cn(styles.section, className)} data-mobile={mobile || undefined} {...extractSupportProps(rest)}>
      {title && (
        <div className={styles.title}>
          <span className={styles.titleText}>{title}</span>

          {searchable && (
            <>
              <div
                className={styles.search}
                data-transition-status={animationState.status}
                data-is-mounted={animationState.isMounted || undefined}
              >
                <SearchPrivate
                  tabIndex={searchInputTabIndex}
                  size='m'
                  placeholder={searchPlaceholder ?? t('search')}
                  value={searchValue}
                  onChange={setSearchValue}
                  ref={searchRef}
                  data-test-id='header__select-group-section-search-input'
                />

                <Tooltip tip={t('searchCloseButton')} open={mobile ? false : undefined}>
                  <ButtonFunction
                    size='xs'
                    className={styles.searchButton}
                    icon={<VerticalMenuRightCloseSVG />}
                    onClick={handleDeactivateSearch}
                    tabIndex={closeSearchIconTabIndex}
                    data-test-id='header__select-group-section-close-search-icon'
                  />
                </Tooltip>
              </div>

              {!animationState.isMounted && (
                <Tooltip tip={t('searchOpenButton')} open={mobile ? false : undefined}>
                  <ButtonFunction
                    size='xs'
                    icon={<SearchSVG />}
                    className={styles.searchButton}
                    onClick={handleActivateSearch}
                    tabIndex={searchIconTabIndex}
                    data-test-id='header__select-group-section-search-icon'
                  />
                </Tooltip>
              )}
            </>
          )}
        </div>
      )}

      {loading ? (
        <GroupSectionSkeletonItem />
      ) : (
        <List
          className={cn({ [styles.list]: mobile })}
          virtualized={virtualized}
          scroll
          scrollToSelectedItem
          marker
          size='m'
          selection={selectedItem?.id ? { mode: 'single', value: selectedItem.id } : undefined}
          dataFiltered={searchValue.length > 0}
          noDataState={{
            description: t('noData'),
            ...noDataState,
          }}
          noResultsState={{
            description: t('noDataFound'),
          }}
          items={items}
          footer={addItem?.handler ? <GroupSectionFooterButton {...addItem} /> : undefined}
        />
      )}
    </div>
  );
}
